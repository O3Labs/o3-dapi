interface BalanceRequest {
    address: string;
    assets?: string[];
    fetchUTXO?: boolean;
}
interface GetBalanceArgs {
    params: BalanceRequest | BalanceRequest[];
    network?: string;
}
interface BalanceResults {
    [address: string]: Balance[];
}
interface Balance {
    scriptHash: string;
    symbol: string;
    amount: string;
}
export declare function getBalance(data: GetBalanceArgs): Promise<BalanceResults>;
export {};
//# sourceMappingURL=getBalance.d.ts.map