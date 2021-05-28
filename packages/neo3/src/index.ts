declare const global: any;
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import { getProvider, Provider } from './modules/read/getProvider';
import { getNetworks, GetNetworksOutput } from './modules/read/getNetworks';
import { getAccount, Account } from './modules/read/getAccount';
import { getPublicKey, PublicKeyOutput } from './modules/read/getPublicKey';
import {
  getBalance,
  GetBalanceArgs,
  BalanceResults,
} from './modules/read/getBalance';
import {
  getStorage,
  GetStorageArgs,
  GetStorageOutput,
} from './modules/read/getStorage';
import { invokeRead, InvokeReadArgs } from './modules/read/invokeRead';
import { invokeReadMulti, InvokeReadMultiArgs } from './modules/read/invokeReadMulti';
import {
  verifyMessage,
  VerifyMessageInput,
  VerifyMessageOutput,
} from './modules/read/verifyMessage';
import {
  getBlock,
  BlockDetails,
  GetBlockInputArgs,
} from './modules/read/getBlock';
import {
  getBlockHeight,
  GetBlockHeightInputArgs,
} from './modules/read/getBlockHeight';
import {
  getTransaction,
  TransactionInputArgs,
  TransactionDetails,
} from './modules/read/getTransaction';
import {
  getApplicationLog,
  ApplicationLog,
} from './modules/read/getApplicationLog';

import { send, SendArgs, SendOutput } from './modules/write/send';
import { invoke, InvokeArgs, InvokeOutput } from './modules/write/invoke';
import { invokeMulti, InvokeMultiArgs } from './modules/write/invokeMulti';
import { deploy, DeployArgs, DeployOutput } from './modules/write/deploy';
import {
  signMessage,
  SignMessageInput,
  Signature,
} from './modules/write/signMessage';

import { disconnect } from './modules/disconnect';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { ArgumentDataType, EventName, BLOCKCHAIN } from './constants';
import { initMessaging } from './messaging';
import { methodSelector } from './modules/utils';

class O3dapiNeo3 {
  static blockchain = BLOCKCHAIN;

  isAvailable = Boolean(safeWindow._o3dapi.isAvailable);

  getProvider = getProvider;
  getNetworks = getNetworks;
  getAccount = getAccount;
  getPublicKey = getPublicKey;

  getBalance: getBalance = methodSelector(this, 'getBalance', getBalance);
  getStorage: getStorage = methodSelector(this, 'getStorage', getStorage);
  invokeRead: invokeRead = methodSelector(this, 'invokeRead', invokeRead);
  invokeReadMulti: invokeReadMulti = methodSelector(this, 'invokeReadMulti', invokeReadMulti);
  verifyMessage: verifyMessage = methodSelector(
    this,
    'verifyMessage',
    verifyMessage,
    false
  );
  getBlock: getBlock = methodSelector(this, 'getBlock', getBlock);
  getBlockHeight: getBlockHeight = methodSelector(
    this,
    'getBlockHeight',
    getBlockHeight
  );
  getTransaction: getTransaction = methodSelector(
    this,
    'getTransaction',
    getTransaction
  );
  getApplicationLog: getApplicationLog = methodSelector(
    this,
    'getApplicationLog',
    getApplicationLog
  );

  send = send;
  invoke = invoke;
  invokeMulti = invokeMulti;
  deploy = deploy;
  signMessage = signMessage;

  addEventListener = addEventListener;
  removeEventListener = removeEventListener;

  disconnect = disconnect;

  Constants = {
    EventName,
    ArgumentDataType,
  };

  private clientPlugin;

  constructor(sendMessageMethod, addEventListenerMethod) {
    initMessaging(sendMessageMethod, addEventListenerMethod);
  }

  setClientPlugin(plugin) {
    this.clientPlugin = plugin;
  }
}

export default O3dapiNeo3;
export type getProvider = () => Promise<Provider>;
export type getNetworks = () => Promise<GetNetworksOutput>;
export type getAccount = () => Promise<Account>;
export type getPublicKey = () => Promise<PublicKeyOutput>;
export type getBalance = (data: GetBalanceArgs) => Promise<BalanceResults>;
export type getStorage = (data: GetStorageArgs) => Promise<GetStorageOutput>;
export type invokeRead = (data: InvokeReadArgs) => Promise<any>;
export type invokeReadMulti = (data: InvokeReadMultiArgs) => Promise<any>;
export type verifyMessage = (
  data: VerifyMessageInput
) => Promise<VerifyMessageOutput>;
export type getBlock = (data: GetBlockInputArgs) => Promise<BlockDetails>;
export type getBlockHeight = (data: GetBlockHeightInputArgs) => Promise<any>;
export type getTransaction = (
  data: TransactionInputArgs
) => Promise<TransactionDetails>;
export type getApplicationLog = (
  data: TransactionInputArgs
) => Promise<ApplicationLog>;

export type send = (data: SendArgs) => Promise<SendOutput>;
export type invoke = (data: InvokeArgs) => Promise<InvokeOutput>;
export type invokeMulti = (data: InvokeMultiArgs) => Promise<InvokeOutput>;
export type deploy = (data: DeployArgs) => Promise<DeployOutput>;
export type signMessage = (data: SignMessageInput) => Promise<Signature>;

export type disconnect = () => Promise<boolean>;
export type addEventListener = (event: EventName, callback: Function) => void;
export type removeEventListener = (event: EventName) => void;
