declare const global: any;
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import { getProvider, Provider } from './modules/read/getProvider';
import { getNetworks, GetNetworksOutput } from './modules/read/getNetworks';
import { getAccount, Account } from './modules/read/getAccount';
import { getPublicKey, PublicKeyOutput } from './modules/read/getPublicKey';
import { getBalance, GetBalanceArgs, BalanceResults } from './modules/read/getBalance';
import { getStorage, GetStorageArgs, GetStorageOutput } from './modules/read/getStorage';
import { invokeRead, InvokeReadArgs } from './modules/read/invokeRead';
import { verifyMessage, VerifyMessageInput, VerifyMessageOutput } from './modules/read/verifyMessage';

import { send, SendArgs, SendOutput } from './modules/write/send';
import { invoke, InvokeArgs, InvokeOutput } from './modules/write/invoke';
import { signMessage, SignMessageInput, Signature } from './modules/write/signMessage';

import { disconnect } from './modules/disconnect';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { ArgumentDataType, EventName, BLOCKCHAIN } from './constants';
import { initMessaging } from './messaging';

class O3dapiNeo {

  static blockchain = BLOCKCHAIN;

  isAvailable = Boolean(safeWindow._o3dapi.isAvailable);

  getProvider = getProvider;
  getNetworks = getNetworks;
  getAccount = getAccount;
  getPublicKey = getPublicKey;
  getBalance = getBalance;
  getStorage = getStorage;
  invokeRead = invokeRead;
  verifyMessage = verifyMessage;

  send = send;
  invoke = invoke;
  signMessage = signMessage;

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
export type getPublicKey = () => Promise<PublicKeyOutput>;
export type getBalance = (data: GetBalanceArgs) => Promise<BalanceResults>;
export type getStorage = (data: GetStorageArgs) => Promise<GetStorageOutput>;
export type invokeRead = (data: InvokeReadArgs) => Promise<any>;
export type verifyMessage = (data: VerifyMessageInput) => Promise<VerifyMessageOutput>;

export type send = (data: SendArgs) => Promise<SendOutput>;
export type invoke = (data: InvokeArgs) => Promise<InvokeOutput>;
export type signMessage = (data: SignMessageInput) => Promise<Signature>;

export type disconnect = () => Promise<boolean>;
export type addEventListener = (event: EventName, callback: Function) => void;
export type removeEventListener = (event: EventName) => void;
