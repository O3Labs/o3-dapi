interface BalanceRequest {
    address: string;
    asset?: string;
}
interface BalanceResults {
    [address: string]: Balances;
}
interface Balances {
    [asset: string]: string;
}
export declare function getBalance(data: BalanceRequest | BalanceRequest[], network?: string): Promise<BalanceResults>;
export {};
//# sourceMappingURL=getBalance.d.ts.map