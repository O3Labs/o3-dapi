export interface SendArgs {
    fromAddress: string;
    toAddress: string;
    asset: string;
    amount: string;
    remark?: string;
    fee?: string;
    network?: string;
    broadcastOverride?: boolean;
}
export interface SendOutput {
    txid: string;
    nodeUrl: string;
}
//# sourceMappingURL=send.d.ts.map