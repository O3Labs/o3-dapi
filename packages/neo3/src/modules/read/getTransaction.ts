import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface TransactionInputArgs {
  network?: string;
  txid: string;
}

interface TransactionAttribute {
  usage: string;
  data: string;
}

interface TransactionScript {
  invocation: string;
  verification: string;
}

export interface TransactionDetails {
  txid: string;
  size: number;
  type: string;
  version: number;
  attributes: TransactionAttribute[];
  vin: any[];
  vout: any[];
  sys_fee: string;
  net_fee: string;
  scripts: TransactionScript[];
  script: string;
  gas: string;
  blockhash: string;
  confirmations: number;
  blocktime: number;
}

export function getTransaction(data: TransactionInputArgs): Promise<TransactionDetails> {
  return sendMessage({
    command: Command.getTransaction,
    data,
  });
}
