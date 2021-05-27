import { ArgumentDataType } from '../../constants';
export interface InvokeReadArgs {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    signers?: Signer[];
    network?: string;
}
interface Signer {
    account: string;
    scopes: string;
    allowedcontracts?: string[];
    allowedgroups?: string[];
}
interface Argument {
    type: ArgumentDataType;
    value: any;
}
export declare function invokeRead(data: InvokeReadArgs[]): Promise<any>;
export {};
//# sourceMappingURL=invokeReadMulti.d.ts.map