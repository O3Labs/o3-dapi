declare const global: any;
declare const window: any
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import { request, RequestArguments, Account, requestHeco, requestBsc } from './modules/read/request';
import { EventName, Command, ChainType } from './constants';
import { initMessaging } from './messaging';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { disconnect } from './modules/disconnect';
import o3dapi from 'o3-dapi-core';

class ETH {

  static blockchain = ChainType.ETH;
  private clientPlugin;

  request = request;
  disconnect = disconnect;

  addEventListener = addEventListener;
  removeEventListener = removeEventListener;

  Constants = {
    EventName,
    Command
  };

  constructor(sendMessageMethod, addEventListenerMethod, blockchain = ChainType.ETH) {
    initMessaging(sendMessageMethod, addEventListenerMethod, blockchain);
  }

  setClientPlugin(plugin) {
    this.clientPlugin = plugin;
  }
}
class BSC {

  static blockchain = ChainType.BSC;
  private clientPlugin;

  request = requestBsc;
  disconnect = disconnect;

  addEventListener = addEventListener;
  removeEventListener = removeEventListener;

  Constants = {
    EventName,
    Command
  };

  constructor(sendMessageMethod, addEventListenerMethod, blockchain = ChainType.BSC) {
    initMessaging(sendMessageMethod, addEventListenerMethod, blockchain);
  }

  setClientPlugin(plugin) {
    this.clientPlugin = plugin;
  }
}
class HECO {

  static blockchain = ChainType.HECO;
  private clientPlugin;

  request = requestHeco;
  disconnect = disconnect;

  addEventListener = addEventListener;
  removeEventListener = removeEventListener;

  Constants = {
    EventName,
    Command
  };

  constructor(sendMessageMethod, addEventListenerMethod, blockchain = ChainType.HECO) {
    initMessaging(sendMessageMethod, addEventListenerMethod, blockchain);
  }

  setClientPlugin(plugin) {
    this.clientPlugin = plugin;
  }
}
o3dapi.initPlugins([ETH]);
o3dapi.initPlugins([BSC]);
o3dapi.initPlugins([HECO]);
export default o3dapi;

export type request = (data: RequestArguments, blockchain: ChainType) => Promise<Account>;
export type disconnect = () => Promise<boolean>;
export type addEventListener = (event: EventName, callback: Function) => void;
export type removeEventListener = (event: EventName) => void;
