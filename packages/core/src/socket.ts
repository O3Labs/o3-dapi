import openSocket from 'socket.io-client';
import { receiveMessage } from './messages';

let socket;
let isConnected;

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
      receiveMessage(res);
    });

    socket.on('disconnect', res => {
      isConnected = false;
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
  socket.emit('event', message);
}
