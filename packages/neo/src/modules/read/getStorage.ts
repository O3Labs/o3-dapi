import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

interface GetStorageArgs {
  scriptHash: string;
  key: string;
  network?: string;
}

interface GetStorageOutput {
  result: string;
}

export function getStorage(data: GetStorageArgs): Promise<GetStorageOutput> {
  return sendMessage({
    command: Command.getStorage,
    data,
  });
}
