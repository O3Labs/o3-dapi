import { Plugin } from './types';

import {
  sendMessage,
  addEventsListener,
} from './messages';

import { initSocket } from './socket';

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
  initSocket()
  .catch(() => {});
}

o3dapiCore.openO3 = () => window.location.replace('o3network://deep');

export default o3dapiCore;
