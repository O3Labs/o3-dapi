import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface SendArgs {
  fromAddress: string;
  toAddress: string;
  asset: string;
  amount: string;
  remark?: string;
  fee?: string;
  network: string;
}

export interface SendOutput {
  txid: string;
  nodeUrl: string;
}

export function send(data: SendArgs): Promise<SendOutput> {
  return sendMessage({
    command: Command.send,
    data,
  });
}
