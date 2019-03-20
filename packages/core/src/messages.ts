declare const window: any;
declare const global: any;
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
const NO_PROVIDER = { type: 'NO_PROVIDER', description: 'O3 dapi provider not found.'};
const REQUEST_TIMEOUT = { type: 'REQUEST_TIMEOUT', description: 'Provider is taking longer that timeout specified to complete request.'};

const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;

safeWindow._o3dapi = safeWindow._o3dapi ? safeWindow._o3dapi : {};
_o3dapi.receiveMessage = receiveMessage;

export function receiveMessage(message: IncomingMessage) {
  try {
    if (typeof message === 'string') {
      message = JSON.parse(message);
    }
    const {
      platform,
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
        safeWindow._o3dapi.isReady = data;
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

export function addEventsListener({blockchain, callback}: AddEventsListenerArgs) {
  eventsListeners[blockchain] = callback;
}

let socketInitPromise;
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

    const messageHandler = isBrowser && get(window, 'window._o3dapi.messageHandler');

    const webkitPostMessage = isBrowser && get(window, 'window.webkit.messageHandlers.sendMessageHandler.postMessage');

    const isIOS = Boolean(webkitPostMessage) && typeof webkitPostMessage === 'function';

    if (isSocketConnected()) {
      sendSocketMessage(message);
    } else if (messageHandler) {
      try {
        window._o3dapi.messageHandler(JSON.stringify(message));
      } catch (err) {
        console.log('android error', err);
        reject(NO_PROVIDER);
      }
    } else if (isIOS) {
      try {
        window.webkit.messageHandlers.sendMessageHandler.postMessage(message);
      } catch (err) {
        console.log('ios error', err);
        reject(NO_PROVIDER);
      }
    } else {
      socketInitPromise = socketInitPromise || initSocket();

      socketInitPromise
      .then(() => {
        socketInitPromise = null;
        sendSocketMessage(message);
        messageQueue[messageId] = {
          resolve,
          reject,
          timeout: timeout && setTimeout(() => {
            delete messageQueue[messageId];
            reject(REQUEST_TIMEOUT);
          }, timeout),
        };
      })
      .catch(err => {
        socketInitPromise = null;
        reject(NO_PROVIDER);
      });
    }

    if (messageHandler || webkitPostMessage || isSocketConnected()) {
      messageQueue[messageId] = {
        resolve,
        reject,
        timeout: timeout && setTimeout(() => {
          delete messageQueue[messageId];
          reject(REQUEST_TIMEOUT);
        }, timeout),
      };
    }
  });
}
