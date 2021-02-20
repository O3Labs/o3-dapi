declare const window: any;
declare const global: any;
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import { EventName, Command } from '../constants';
import { sendMessage } from '../messaging';

interface Listeners {
  [eventName: string]: Function[];
}

const listeners: Listeners = {};

export function addEventListener(event: EventName, callback: Function): void {
  const currentListeners = listeners[event] || [];
  currentListeners.push(callback);
  listeners[event] = currentListeners;

  const isReady = safeWindow._o3dapi.isReady;

  if (event === EventName.READY && isReady) {
    const readyListeners = listeners[EventName.READY];
    readyListeners && readyListeners.forEach(callback => callback(isReady));
  }

  if (event === EventName.BLOCK_HEIGHT_CHANGED) {
    sendMessage({
      command: Command.RegisterBlockHeightListener,
    });
  }
}

export function removeEventListener(event: EventName): void {
  listeners[event] = [];
}

export function onEvent(event: EventName, data?: any) {
  const currentListeners = listeners[event];
  currentListeners && currentListeners.forEach(callback => callback(data));
}
