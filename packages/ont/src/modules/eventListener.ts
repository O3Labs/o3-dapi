declare const window: any;
declare const global: any;
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import { EventName } from '../constants';

interface Listeners {
  [eventName: string]: Function[];
}

const listeners: Listeners = {};

export function addEventListener(event: EventName, callback: Function) {
  const currentListeners = listeners[event] || [];
  currentListeners.push(callback);
  listeners[event] = currentListeners;

  const isReady = safeWindow._o3dapi.isReady;

  if (event === EventName.READY && isReady) {
    const readyListeners = listeners[EventName.READY];
    readyListeners && readyListeners.forEach(callback => callback(isReady));
  }
}

export function removeEventListener(event: EventName) {
  listeners[event] = [];
}

export function onEvent(event: EventName, data?: any) {
  const currentListeners = listeners[event];
  currentListeners && currentListeners.forEach(callback => callback(data));
}
