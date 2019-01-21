import openSocket from 'socket.io-client';

export function initSocket() {
  const socket = openSocket('http://127.0.0.1:50005');

  socket.on('connect', res => {
    debugger;
  });
}
