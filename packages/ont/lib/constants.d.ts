export declare const BLOCKCHAIN = "ONT";
export declare const VERSION = "v1";
export declare enum Command {
    getAccount = "getAccount",
    getPublicKey = "getPublicKey",
    send = "send",
    getIdentity = "getIdentity",
    getDDO = "getDDO",
    addAttributes = "addAttributes",
    removeAttribute = "removeAttribute",
    signMessageHash = "signMessageHash",
    verifyMessageHash = "verifyMessageHash",
    signMessage = "signMessage",
    verifyMessage = "verifyMessage",
    getNodeCount = "getNodeCount",
    getBlockHeight = "getBlockHeight",
    getMerkleProof = "getMerkleProof",
    getStorage = "getStorage",
    getAllowance = "getAllowance",
    getBlock = "getBlock",
    getTransaction = "getTransaction",
    getNetworks = "getNetworks",
    getBalance = "getBalance",
    getUnboundOng = "getUnboundOng",
    getContract = "getContract",
    getSmartCodeEvent = "getSmartCodeEvent",
    getBlockHeightByTxHash = "getBlockHeightByTxHash",
    getBlockHash = "getBlockHash",
    getBlockTxsByHeight = "getBlockTxsByHeight",
    getGasPrice = "getGasPrice",
    getGrantOng = "getGrantOng",
    getMempoolTxCount = "getMempoolTxCount",
    getMempoolTxState = "getMempoolTxState",
    getVersion = "getVersion",
    getProvider = "getProvider",
    invoke = "invoke",
    invokeRead = "invokeRead",
    deploy = "deploy",
    disconnect = "disconnect"
}
export declare enum EventName {
    READY = "READY",
    ACCOUNT_CHANGED = "ACCOUNT_CHANGED",
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    NETWORK_CHANGED = "NETWORK_CHANGED"
}
export declare type Asset = 'ONT' | 'ONG' | string;
export declare enum TransactionType {
    BookKeeper = 2,
    Claim = 3,
    Deploy = 208,
    Invoke = 209,
    Enrollment = 4,
    Vote = 5
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
//# sourceMappingURL=constants.d.ts.map