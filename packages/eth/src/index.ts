declare const global: any;
declare const window: any
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import { request, RequestArguments, Account } from './modules/read/request';
import { BLOCKCHAIN } from './constants';
import { initMessaging } from './messaging';
class O3DapiEth {

  static blockchain = BLOCKCHAIN;

  private clientPlugin;

  request = request;

  constructor(sendMessageMethod, addEventListenerMethod) {
    initMessaging(sendMessageMethod, addEventListenerMethod);
  }

  setClientPlugin(plugin) {
    this.clientPlugin = plugin;
  }
}
export default O3DapiEth;

export type request = (data: RequestArguments) => Promise<Account>;

