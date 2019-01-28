import openSocket from 'socket.io-client';
import { receiveMessage } from './messages';

let socket;
let isConnected;

export function initSocket() {
  socket = openSocket('https://dapi.o3.app:63333');

  socket.on('connect', res => {
    isConnected = true;
  });

  socket.on('event', res => {
    receiveMessage(res);
  });

  socket.on('disconnect', res => {
    isConnected = false;
  });

  setTimeout(() => {
    socket.emit('ping');
  }, 1000);
}

export function isSocketConnected() {
  return isConnected;
}

export function sendSocketMessage(message) {
  socket.emit('event', message);
}
