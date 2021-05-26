import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface GetBlockHeightInputArgs {
  network?: string;
}

export function getBlockHeight(data: GetBlockHeightInputArgs): Promise<any> {
  return sendMessage({
    command: Command.getBlockHeight,
    data,
  });
}
