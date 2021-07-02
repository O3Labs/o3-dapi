import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface Account {
  address: string;
  label: string;
}

export function pickAddress(): Promise<Account> {
  return sendMessage({
    command: Command.pickAddress,
  });
}
