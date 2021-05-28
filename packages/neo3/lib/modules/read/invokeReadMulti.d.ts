import { ArgumentDataType } from '../../constants';
export interface InvokeReadMultiArgs {
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
export declare function invokeReadMulti(data: InvokeReadMultiArgs[]): Promise<any>;
export {};
//# sourceMappingURL=invokeReadMulti.d.ts.map