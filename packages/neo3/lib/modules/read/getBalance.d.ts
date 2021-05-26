interface BalanceRequest {
    address: string;
    assets?: string[];
    fetchUTXO?: boolean;
}
export interface GetBalanceArgs {
    params: BalanceRequest | BalanceRequest[];
    network?: string;
}
export interface BalanceResults {
    [address: string]: Balance[];
}
interface Balance {
    assetID: string;
    symbol: string;
    amount: string;
}
export declare function getBalance(data: GetBalanceArgs): Promise<BalanceResults>;
export {};
//# sourceMappingURL=getBalance.d.ts.map