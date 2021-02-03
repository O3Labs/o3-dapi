export const BLOCKCHAIN = 'ETH';
export const VERSION = 'v1';
export const CHAINID = "0x1";
export const NETWORK = "1";

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
  ethAccounts = 'eth_accounts',
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

// export enum Network {
//   MainNet = 'MainNet',
//   TestNet = 'TestNet',
// }
