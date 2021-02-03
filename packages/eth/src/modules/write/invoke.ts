import { sendMessage } from '../../messaging';
import { ArgumentDataType, Command } from '../../constants';

export interface InvokeArgs {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  fee?: string;
  network?: string;
  attachedAssets?: AttachedAssets;
  assetIntentOverrides?: AssetIntentOverrides;
  triggerContractVerification?: boolean;
  broadcastOverride?: boolean;
  txHashAttributes?: TxHashAttribute[];
  remark?: string;
}

interface Argument {
  type: ArgumentDataType;
  value: any;
}

interface TxHashAttribute extends Argument {
  txAttrUsage: 'Hash1'|'Hash2'|'Hash3'|'Hash4'|'Hash5'|'Hash6'|'Hash7'|'Hash8'|'Hash9'|'Hash10'|'Hash11'|'Hash12'|'Hash13'|'Hash14'|'Hash15';
}

interface AttachedAssets {
  [asset: string]: string; // 'NEO'|'GAS'
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
  address: string;
  value: string;
}

export interface InvokeOutput {
  txid: string;
  nodeUrl: string;
}
