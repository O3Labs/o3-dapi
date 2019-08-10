import { Plugin } from './types';

import {
  sendMessage,
  addEventsListener,
  onReady,
  setReactNativeOverrides,
} from './messages';

import {
  setEncryptionOverride,
} from './messageEncryption';

import { getSocket } from './socket';

import * as utils from './utils';

const o3dapiCore: any = {};
const isBrowser = typeof window !== 'undefined';

o3dapiCore.initPlugins = (plugins: Plugin[]) => {
  plugins.forEach(plugin => {
    o3dapiCore[plugin.blockchain] = new plugin(sendMessage, addEventsListener);
  });
};

if (isBrowser) {
  o3dapiCore.isAvailable = Boolean((window as any)._o3dapi.isAvailable);
}

if (!o3dapiCore.isAvailable) {
  getSocket().catch(err => {});
}

o3dapiCore.openO3 = () => window.location.replace('o3network://deep');

o3dapiCore.utils = utils;

o3dapiCore.onReady = onReady;

o3dapiCore.setReactNativeOverrides = setReactNativeOverrides;

o3dapiCore.setNodeJSOverrides = ({crypto}) => {
  setEncryptionOverride(crypto);
};

export default o3dapiCore;
