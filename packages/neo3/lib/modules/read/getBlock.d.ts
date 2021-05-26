export interface BlockDetails {
    hash: string;
    size: number;
    version: number;
    previousblockhash: string;
    merkleroot: string;
    time: number;
    index: number;
    nonce: string;
    nextconsensus: string;
    script: ScriptDetails;
    tx: BlockTransactionDetails[];
    confirmations: number;
    nextblockhash: string;
}
interface BlockTransactionDetails {
    txid: string;
    size: number;
    type: string;
    version: number;
    attributes: any[];
    vin: any[];
    vout: any[];
    sys_fee: string;
    net_fee: string;
    scripts: any[];
    nonce: number;
}
interface ScriptDetails {
    invocation: string;
    verification: string;
}
export interface GetBlockInputArgs {
    network?: string;
    blockHeight: number;
}
export declare function getBlock(data: GetBlockInputArgs): Promise<BlockDetails>;
export {};
//# sourceMappingURL=getBlock.d.ts.map