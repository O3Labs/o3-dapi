import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

interface Provider {
  name: string;
  website: string;
  version: string;
  compatibility: string[];
  theme: string;
}

export function getProvider(): Promise<Provider> {
  return sendMessage({
    command: Command.getProvider,
    timeout: 2500,
  });
}
