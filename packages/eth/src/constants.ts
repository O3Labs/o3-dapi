export const VERSION = 'v1';
export const CHAINID = "0x1";
export const NETWORK = "1";

export enum ChainType {
  ETH = 'ETH',
  BSC = 'BSC',
  HECO = 'HECO',
}

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
  ethChainId = 'eth_chainId',
  ethGetBalance= 'eth_getBalance',
  netVersion = 'net_version',
  ethRequestAccounts = 'eth_requestAccounts',
  ethAccounts = 'eth_accounts',
  ethBlockNumber = 'eth_blockNumber',
  ethCall = 'eth_call',
  ethEstimateGas = 'eth_estimateGas',
  ethGasPrice = 'eth_gasPrice',
  ethSendTransaction = 'eth_sendTransaction',
  ethSendRawTransaction = 'eth_sendRawTransaction',
  ethGetTransactionReceipt = 'eth_getTransactionReceipt',
  disconnect = 'disconnect',
  RegisterBlockHeightListener = 'RegisterBlockHeightListener',
}

export enum EventName {
  READY = 'READY',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  NETWORK_CHANGED = 'NETWORK_CHANGED',
  ETH_BLOCK_HEIGHT_CHANGED = 'ETH_BLOCK_HEIGHT_CHANGED',
}

// ACCOUNT_CHANGED = 'ACCOUNT_CHANGED',
// TRANSACTION_CONFIRMED = 'TRANSACTION_CONFIRMED',
