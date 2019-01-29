export const BLOCKCHAIN = 'ONT';
export const VERSION = 'v1';

export enum Command {

  // ASSET
  getAccount = 'getAccount',
  getPublicKey = 'getPublicKey',
  send = 'send',

  // IDENTITY
  getIdentity = 'getIdentity',
  getDDO = 'getDDO',
  addAttributes = 'addAttributes',
  removeAttribute = 'removeAttribute',

  // MESSAGE
  signMessageHash = 'signMessageHash',
  verifyMessageHash = 'verifyMessageHash',
  signMessage = 'signMessage',
  verifyMessage = 'verifyMessage',

  // NETWORK
  getNodeCount = 'getNodeCount',
  getBlockHeight = 'getBlockHeight',
  getMerkleProof = 'getMerkleProof',
  getStorage = 'getStorage',
  getAllowance = 'getAllowance',
  getBlock = 'getBlock',
  getTransaction = 'getTransaction',
  getNetworks = 'getNetworks',
  getBalance = 'getBalance',
  getUnboundOng = 'getUnboundOng',
  getContract = 'getContract',
  getSmartCodeEvent = 'getSmartCodeEvent',
  getBlockHeightByTxHash = 'getBlockHeightByTxHash',
  getBlockHash = 'getBlockHash',
  getBlockTxsByHeight = 'getBlockTxsByHeight',
  getGasPrice = 'getGasPrice',
  getGrantOng = 'getGrantOng',
  getMempoolTxCount = 'getMempoolTxCount',
  getMempoolTxState = 'getMempoolTxState',
  getVersion = 'getVersion',

  // PROVIDER
  getProvider = 'getProvider',

  // SMART CONTRACT
  invoke = 'invoke',
  invokeRead = 'invokeRead',
  deploy = 'deploy',

  disconnect = 'disconnect',
}

export enum EventName {
  READY = 'READY',
  ACCOUNT_CHANGED = 'ACCOUNT_CHANGED',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export type Asset = 'ONT' | 'ONG' | string;

export enum TransactionType {
  BookKeeper = 2,
  Claim = 3,
  Deploy = 208,
  Invoke = 209,
  Enrollment = 4,
  Vote = 5,
}

export interface TxSignature {
  PubKeys: string[];
  M: number;
  SigData: string[];
}

export interface Transaction {
  Version: number;
  Nonce: number;
  GasPrice: number;
  GasLimit: number;
  Payer: string;
  TxType: TransactionType;
  Payload: any;
  Attributes: any[];
  Sigs: TxSignature[];
  Hash: string;
  Height: number;
}
