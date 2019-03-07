declare const require: any;
const isBrowser = typeof window !== 'undefined';
import openSocket from 'socket.io-client';
const io = require('socket.io-client-node');
import { receiveMessage } from './messages';
import MessageEncryption, { AES128GCM } from './messageEncryption';

const socketIo = isBrowser ? openSocket : io;

let socket;
let isConnected;
let messageEncryption;

export function initSocket(isHTTPS = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = isHTTPS ?
      'https://dapi.o3.app:60003' :
      'http://127.0.0.1:60003';

    const socketConfig = {};
    if (!isBrowser) {
      socketConfig['rejectUnauthorized'] = false;
    }
    socket = socketIo(url, socketConfig);

    socket.on('connect', res => {
      isConnected = true;
    });

    socket.on('event', res => {
      if (res && res.eventName === 'READY' && !messageEncryption && res.key) {
        resolve();
        messageEncryption = new MessageEncryption();
        messageEncryption.setSharedKey(res.key);
        let registerMessage = messageEncryption.getPublicKey();
        if (res.algorithm === AES128GCM) {
          messageEncryption.setCipherAlgorithOverride(AES128GCM);
          registerMessage = {
            key: messageEncryption.getPublicKey(),
            algorithm: AES128GCM,
          };
        }
        socket.emit('register', registerMessage);
        receiveMessage(res);
      } else {
        const data = messageEncryption.decrypt(res);
        if (!data.error) {
          receiveMessage(data.message);
        } else {
          receiveMessage({
            ...data.message,
            error: {
              type: 'MESSAGE_ENCRYPTION_ERROR',
              data: data.error,
            },
          });
        }
      }
    });

    socket.on('disconnect', res => {
      isConnected = false;
      messageEncryption = null;
    });

    socket.on('connect_error', err => {
      socket.close();
      if (isHTTPS) {
        initSocket(false)
        .catch(() => { reject(); });
      } else {
        reject();
      }
    });
  });
}

export function isSocketConnected() {
  return isConnected;
}

export function sendSocketMessage(message) {
  const encryptedMessage = messageEncryption.encrypt(message);
  socket.emit('event', encryptedMessage);
}
