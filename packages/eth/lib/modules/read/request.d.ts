import { Command } from '../../constants';
export interface RequestArguments {
    method: Command;
    params?: {} | string;
}
export interface Account {
    address: string;
    label: string;
}
export declare function request(args: RequestArguments): Promise<Account>;
export declare function requestBsc(args: RequestArguments): Promise<Account>;
export declare function requestHeco(args: RequestArguments): Promise<Account>;
//# sourceMappingURL=request.d.ts.map