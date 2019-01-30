import { ArgumentDataType } from '../../constants';
export interface InvokeArgs {
    scriptHash: string;
    operation: string;
    args?: Argument[];
    fee?: string;
    network: string;
    attachedAssets?: AttachedAssets[];
    assetIntentOverrides?: AssetIntentOverrides;
    triggerContractVerification?: boolean;
}
interface Argument {
    type: ArgumentDataType;
    value: any;
}
interface AttachedAssets {
    [asset: string]: number;
}
interface AssetIntentOverrides {
    inputs: AssetInput[];
    outputs: AssetOutput[];
}
interface AssetInput {
    txid: string;
    index: number;
}
interface AssetOutput {
    asset: string;
    address: number;
    value: string;
}
export interface InvokeOutput {
    txid: string;
    nodeUrl: string;
}
export declare function invoke(data: InvokeArgs): Promise<InvokeOutput>;
export {};
//# sourceMappingURL=invoke.d.ts.map