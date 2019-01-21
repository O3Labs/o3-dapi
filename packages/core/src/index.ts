import { Plugin } from './types';

import {
  sendMessage,
  addEventsListener,
} from './messages';

import { initSocket } from './socket';
initSocket();

const o3dapiCore: any = {};

o3dapiCore.initPlugins = (plugins: Plugin[]) => {
  plugins.forEach(plugin => {
    o3dapiCore[plugin.blockchain] = new plugin(sendMessage, addEventsListener);
  });
};

o3dapiCore.isAvailable = Boolean((window as any)._o3dapi.isAvailable);

export default o3dapiCore;
