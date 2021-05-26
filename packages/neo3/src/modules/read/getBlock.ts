import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface BlockDetails {
  hash: string; // Block hash
  size: number; // Block size (bytes)
  version: number; // The version number of the block execution
  previousblockhash: string; // Previous block Hash
  merkleroot: string; // Merkel root
  time: number; // Block generation timestamp
  index: number; // Block index (height)
  nonce: string; // Block pseudo-random number
  nextconsensus: string; // Next master biller
  script: ScriptDetails; // Block call signature authentication information
  tx: BlockTransactionDetails[]; // Block containing trading group
  confirmations: number; // Confirmation number (number of blocks after this block)
  nextblockhash: string; // Next block hash
}

interface BlockTransactionDetails {
  txid: string;
  size: number;
  type: string;
  version: number;
  attributes: any[];
  vin: any[];
  vout: any[];
  sys_fee: string;
  net_fee: string;
  scripts: any[];
  nonce: number;
}

interface ScriptDetails {
  invocation: string;
  verification: string;
}

export interface GetBlockInputArgs {
  network?: string;
  blockHeight: number;
}

export function getBlock(data: GetBlockInputArgs): Promise<BlockDetails> {
  return sendMessage({
    command: Command.getBlock,
    data,
  });
}
