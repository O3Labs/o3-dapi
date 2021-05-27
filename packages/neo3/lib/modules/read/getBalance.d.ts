interface BalanceRequest {
    address: string;
    contracts?: string[];
}
export interface GetBalanceArgs {
    params: BalanceRequest | BalanceRequest[];
    network?: string;
}
export interface BalanceResults {
    [address: string]: Balance[];
}
interface Balance {
    contract: string;
    symbol: string;
    amount: string;
}
export declare function getBalance(data: GetBalanceArgs): Promise<BalanceResults>;
export {};
//# sourceMappingURL=getBalance.d.ts.map