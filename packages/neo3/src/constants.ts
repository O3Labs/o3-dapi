export const BLOCKCHAIN = 'NEO3';
export const VERSION = 'v1';

export enum ArgumentDataType {
  STRING = 'String',
  BOOLEAN = 'Boolean',
  HASH160 = 'Hash160',
  HASH256 = 'Hash256',
  INTEGER = 'Integer',
  BYTEARRAY = 'ByteArray',
  ARRAY = 'Array',
  ADDRESS = 'Address',
}

export enum Command {
  isReady = 'isReady',
  getProvider = 'getProvider',
  getNetworks = 'getNetworks',
  getAccount = 'getAccount',
  pickAddress = 'pickAddress',
  getPublicKey = 'getPublicKey',
  getBalance = 'getBalance',
  getStorage = 'getStorage',
  invokeRead = 'invokeRead',
  invokeReadMulti = 'invokeReadMulti',
  getBlock = 'getBlock',
  getBlockHeight = 'getBlockHeight',
  getTransaction = 'getTransaction',
  getApplicationLog = 'getApplicationLog',

  send = 'send',
  invoke = 'invoke',
  invokeMulti = 'invokeMulti',
  event = 'event',
  disconnect = 'disconnect',
  signMessage = 'signMessage',
  verifyMessage = 'verifyMessage',
  deploy = 'deploy',

  RegisterBlockHeightListener = 'RegisterBlockHeightListener',
}

export enum EventName {
  READY = 'READY',
  ACCOUNT_CHANGED = 'ACCOUNT_CHANGED',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  NETWORK_CHANGED = 'NETWORK_CHANGED',
  BLOCK_HEIGHT_CHANGED = 'BLOCK_HEIGHT_CHANGED',
  TRANSACTION_CONFIRMED = 'TRANSACTION_CONFIRMED',
}

export enum Network {
  MainNet = 'MainNet',
  TestNet = 'TestNet',
}
