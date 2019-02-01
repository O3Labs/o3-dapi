import openSocket from 'socket.io-client';
import { receiveMessage } from './messages';
import MessageEncryption from './messageEncryption';

let socket;
let isConnected;
let messageEncryption;

export function initSocket(isHTTPS = true): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = isHTTPS ?
      'https://dapi.o3.app:60003' :
      'http://127.0.0.1:60003';
    socket = openSocket(url);

    socket.on('connect', res => {
      isConnected = true;
      resolve();
    });

    socket.on('event', res => {
      if (res && res.eventName === 'READY' && !messageEncryption && res.key) {
        messageEncryption = new MessageEncryption();
        messageEncryption.setSharedKey(res.key);
        socket.emit('register', messageEncryption.getPublicKey());
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
        .then(() => resolve())
        .catch(() => { reject(); });
      } else {
        reject();
      }
    });

    setTimeout(() => {
      socket.emit('ping');
    }, 1000);
  });
}

export function isSocketConnected() {
  return isConnected;
}

export function sendSocketMessage(message) {
  const encryptedMessage = messageEncryption.encrypt(message);
  socket.emit('event', encryptedMessage);
}
