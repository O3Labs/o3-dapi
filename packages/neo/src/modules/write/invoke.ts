import { sendMessage } from '../../messaging';
import { ArgumentDataType, Command } from '../../constants';

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
  [asset: string]: number; // 'NEO'|'GAS'
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

export function invoke(data: InvokeArgs): Promise<InvokeOutput> {
  return sendMessage({
    command: Command.invoke,
    data,
  });
}
