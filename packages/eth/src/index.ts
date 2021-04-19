declare const global: any;
declare const window: any
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import { request, RequestArguments, Account, requestHeco, requestBsc } from './modules/read/request';
import { EventName, Command, ChainType } from './constants';
import { initMessaging } from './messaging';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { disconnect } from './modules/disconnect';

export class ETH {

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
export class BSC {

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
export class HECO {

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
const o3DapiETH = {};
o3DapiETH['ETH'] = ETH;
o3DapiETH['BSC'] = BSC;
o3DapiETH['HECO'] = HECO;
export default o3DapiETH;

export type request = (data: RequestArguments, blockchain: ChainType) => Promise<Account>;
export type disconnect = () => Promise<boolean>;
export type addEventListener = (event: EventName, callback: Function) => void;
export type removeEventListener = (event: EventName) => void;
