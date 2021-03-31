export declare const VERSION = "v1";
export declare const CHAINID = "0x1";
export declare const NETWORK = "1";
export declare enum ChainType {
    ETH = "ETH",
    BSC = "BSC",
    HECO = "HECO"
}
export declare enum ArgumentDataType {
    STRING = "String",
    BOOLEAN = "Boolean",
    HASH160 = "Hash160",
    HASH256 = "Hash256",
    INTEGER = "Integer",
    BYTEARRAY = "ByteArray",
    ARRAY = "Array",
    ADDRESS = "Address"
}
export declare enum Command {
    ethChainId = "eth_chainId",
    netVersion = "net_version",
    ethRequestAccounts = "eth_requestAccounts",
    ethAccounts = "eth_accounts",
    ethBlockNumber = "eth_blockNumber",
    ethCall = "eth_call",
    ethEstimateGas = "eth_estimateGas",
    ethGasPrice = "eth_gasPrice",
    ethSendTransaction = "eth_sendTransaction",
    ethSendRawTransaction = "eth_sendRawTransaction",
    ethGetTransactionReceipt = "eth_getTransactionReceipt",
    disconnect = "disconnect",
    RegisterBlockHeightListener = "RegisterBlockHeightListener"
}
export declare enum EventName {
    READY = "READY",
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    NETWORK_CHANGED = "NETWORK_CHANGED",
    ETH_BLOCK_HEIGHT_CHANGED = "ETH_BLOCK_HEIGHT_CHANGED"
}
//# sourceMappingURL=constants.d.ts.map