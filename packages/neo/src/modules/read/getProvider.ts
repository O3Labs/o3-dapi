import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface Provider {
  name: string;
  website: string;
  version: string;
  compatibility: string[];
  extra: { theme: string };
}

export function getProvider(): Promise<Provider> {
  return sendMessage({
    command: Command.getProvider,
    timeout: 2500,
  });
}
