import { ArgumentDataType } from '../../constants';
export interface InvokeArgs {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    fee?: string;
    broadcastOverride?: boolean;
}
interface Argument {
    type: ArgumentDataType;
    value: any;
}
export interface InvokeOutput {
    txid: string;
    nodeUrl: string;
}
export declare function invoke(data: InvokeArgs): Promise<InvokeOutput>;
export {};
//# sourceMappingURL=invoke.d.ts.map