import { sendMessage } from '../../messaging';
import { ChainType, Command } from '../../constants';

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
  }, ChainType.ETH);
}

export function requestBsc(args: RequestArguments): Promise<Account> {
  return sendMessage({
    command: args.method,
    data: args.params,
  }, ChainType.BSC);
}

export function requestHeco(args: RequestArguments): Promise<Account> {
  return sendMessage({
    command: args.method,
    data: args.params,
  }, ChainType.HECO);
}