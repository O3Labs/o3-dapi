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

export function removeEventListener(event: EventName): void {
  listeners[event] = [];
}

export function onEvent(event: EventName, data?: any) {
  const currentListeners = listeners[event];
  currentListeners && currentListeners.forEach(callback => callback(data));
}
