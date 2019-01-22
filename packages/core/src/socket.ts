import openSocket from 'socket.io-client';
import { receiveMessage } from './messages';

let socket;

export function initSocket() {
  socket = openSocket('http://127.0.0.1:50005');

  socket.on('connect', res => {
    console.warn('CONNECTION!!!!!!!', res);
  });

  socket.on('event', res => {
    console.warn('EVENT!!!!!!!', res);
    receiveMessage(res);
  });

  socket.on('disconnect', res => {
    console.error('DISCONNECTION!!!!!!!', res);
    socket = null;
  });

  setTimeout(() => {
    socket.emit('ping');
  }, 1000);
}

export function isSocketConnected() {
  return Boolean(socket);
}

export function sendSocketMessage(message) {
  socket.emit('event', message);
}
