import { getProvider, Provider } from './modules/read/getProvider';
import { getNetworks, GetNetworksOutput } from './modules/read/getNetworks';
import { getAccount, Account } from './modules/read/getAccount';
import { getBalance, GetBalanceArgs, BalanceResults } from './modules/read/getBalance';
import { getStorage, GetStorageArgs, GetStorageOutput } from './modules/read/getStorage';
import { invokeRead, InvokeReadArgs } from './modules/read/invokeRead';
import { send, SendArgs, SendOutput } from './modules/write/send';
import { invoke, InvokeArgs, InvokeOutput } from './modules/write/invoke';
import { disconnect } from './modules/disconnect';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { ArgumentDataType, EventName, BLOCKCHAIN } from './constants';
import { initMessaging } from './messaging';

class O3dapiNeo {

  static blockchain = BLOCKCHAIN;

  isAvailable = Boolean((window as any)._o3dapi.isAvailable);

  getProvider = getProvider;
  getNetworks = getNetworks;
  getAccount = getAccount;
  getBalance = getBalance;
  getStorage = getStorage;
  invokeRead = invokeRead;

  send = send;
  invoke = invoke;

  addEventListener = addEventListener;
  removeEventListener = removeEventListener;

  disconnect = disconnect;

  Constants = {
    EventName,
    ArgumentDataType,
  };

  constructor(sendMessageMethod, addEventListenerMethod) {
    initMessaging(sendMessageMethod, addEventListenerMethod);
  }
}

export default O3dapiNeo;
export type getProvider = () => Promise<Provider>;
export type getNetworks = () => Promise<GetNetworksOutput>;
export type getAccount = () => Promise<Account>;
export type getBalance = (data: GetBalanceArgs) => Promise<BalanceResults>;
export type getStorage = (data: GetStorageArgs) => Promise<GetStorageOutput>;
export type invokeRead = (data: InvokeReadArgs) => Promise<any>;
export type send = (data: SendArgs) => Promise<SendOutput>;
export type invoke = (data: InvokeArgs) => Promise<InvokeOutput>;
export type disconnect = () => Promise<boolean>;
export type addEventListener = (event: EventName, callback: Function) => void;
export type removeEventListener = (event: EventName) => void;
