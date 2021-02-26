declare const global: any;
declare const window: any
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import { request, RequestArguments, Account } from './modules/read/request';
import { BLOCKCHAIN, EventName, Command } from './constants';
import { initMessaging } from './messaging';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { disconnect } from './modules/disconnect';

class O3DapiEth {

  static blockchain = BLOCKCHAIN;
  private clientPlugin;

  request = request;
  disconnect = disconnect;

  addEventListener = addEventListener;
  removeEventListener = removeEventListener;

  Constants = {
    EventName,
    Command
  };

  constructor(sendMessageMethod, addEventListenerMethod) {
    initMessaging(sendMessageMethod, addEventListenerMethod);
  }

  setClientPlugin(plugin) {
    this.clientPlugin = plugin;
  }
}
export default O3DapiEth;

export type request = (data: RequestArguments) => Promise<Account>;
export type disconnect = () => Promise<boolean>;
export type addEventListener = (event: EventName, callback: Function) => void;
export type removeEventListener = (event: EventName) => void;
