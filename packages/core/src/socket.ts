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
    });

    socket.on('event', (res, mac?: string) => {
      if (res && res.eventName === 'READY' && !messageEncryption && res.key) {
        resolve();
        messageEncryption = new MessageEncryption();
        messageEncryption.setSharedKey(res.key);
        socket.emit('register', messageEncryption.getPublicKey());
        receiveMessage(res);
      } else {
        const data = messageEncryption.decrypt(res, mac);
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
  const [encryptedMessage, mac] = messageEncryption.encrypt(message);
  socket.emit('event', encryptedMessage, mac);
}
