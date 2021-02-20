import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface RequestArguments {
  method: Command;
  params?: {} | string;
}

export interface Account {
  address: string;
  label: string;
}

export function request(args: RequestArguments): Promise<Account> {
  return sendMessage({
    command: args.method,
    data: args.params,
  });
}