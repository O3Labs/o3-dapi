import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface Account {
  address: string;
  label: string;
}

export function getAccount(): Promise<Account> {
  return sendMessage({
    command: Command.getAccount,
  });
}
