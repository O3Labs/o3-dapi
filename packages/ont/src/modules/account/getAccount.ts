import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

interface AccountOutput {
  address: string;
  label: string;
}

export function getAccount(): Promise<AccountOutput> {
  return sendMessage({
    command: Command.getAccount,
  });
}
