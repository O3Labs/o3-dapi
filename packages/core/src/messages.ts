declare const window: any;
declare const _o3dapi: any;
import { get } from 'lodash-es';
import {
  EventHandler,
  Message,
  IncomingMessage,
  AddEventsListenerArgs,
  SendMessageArgs,
} from './types';
import { isSocketConnected, sendSocketMessage, initSocket } from './socket';

const PLATFORM = 'o3-dapi';
const messageQueue = {};
const eventsListeners: {[blockchain: string]: EventHandler} = {};

window._o3dapi = window._o3dapi ? window._o3dapi : {};

export function receiveMessage(message: IncomingMessage) {
  try {
    if (typeof message === 'string') {
      message = JSON.parse(message);
    }
    const {
      platform,
      blockchain,
      command,
      messageId,
      data,
      error,
      eventName,
    } = message;

    if (platform !== PLATFORM) {
      return;
    }

    if (command === 'event') {
      if (eventName === 'READY') {
        window._o3dapi.isReady = data;
      }
      Object.keys(eventsListeners)
      .map(key => eventsListeners[key]) // Object.values
      .forEach(handler => handler(eventName, data));
      return;
    }

    const messageResolver = messageQueue[messageId];
    if (messageResolver) {
      const { resolve, timeout, reject } = messageResolver;
      timeout && clearTimeout(timeout);
      error ? reject(error) : resolve(data);
    }
  } catch (err) {}
}

_o3dapi.receiveMessage = receiveMessage;

export function addEventsListener({blockchain, callback}: AddEventsListenerArgs) {
  eventsListeners[blockchain] = callback;
}

export function sendMessage({
  blockchain,
  version,
  command,
  data,
  network,
  timeout,
}: SendMessageArgs): Promise<any> {
  const messageId = blockchain + version + command + (Date.now() + Math.random()).toString();
  const message: Message = {
    platform: PLATFORM,
    messageId,
    blockchain,
    version,
    command,
    data,
    network,
  };

  return new Promise((resolve, reject) => {

    const messageHandler = get(window, 'window._o3dapi.messageHandler');

    const webkitPostMessage = get(window, 'window.webkit.messageHandlers.sendMessageHandler.postMessage');

    const isIOS = Boolean(webkitPostMessage) && typeof webkitPostMessage === 'function';

    if (isSocketConnected()) {
      sendSocketMessage(message);
    } else if (messageHandler) {
      try {
        window._o3dapi.messageHandler(JSON.stringify(message));
      } catch (err) {
        reject(`O3 dapi provider not found.`);
      }
    } else if (isIOS) {
      try {
        window.webkit.messageHandlers.sendMessageHandler.postMessage(message);
      } catch (err) {
        reject(`O3 dapi provider not found.`);
      }
    } else {
      initSocket()
      .then(() => {
        sendSocketMessage(message);
        messageQueue[messageId] = {
          resolve,
          reject,
          timeout: timeout && setTimeout(() => {
            delete messageQueue[messageId];
            reject('Request timeout.');
          }, timeout),
        };
      })
      .catch(() => {
        reject(`O3 dapi provider not found.`);
      });
    }

    if (messageHandler || webkitPostMessage || isSocketConnected()) {
      messageQueue[messageId] = {
        resolve,
        reject,
        timeout: timeout && setTimeout(() => {
          delete messageQueue[messageId];
          reject('Request timeout.');
        }, timeout),
      };
    }
  });
}
