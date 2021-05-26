import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface GetStorageArgs {
  scriptHash: string;
  key: string;
  network?: string;
}

export interface GetStorageOutput {
  result: string;
}

export function getStorage(data: GetStorageArgs): Promise<GetStorageOutput> {
  return sendMessage({
    command: Command.getStorage,
    data,
  });
}
