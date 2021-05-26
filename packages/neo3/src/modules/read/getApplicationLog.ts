import { sendMessage } from '../../messaging';
import { Command } from '../../constants';
import { TransactionInputArgs } from './getTransaction';

export interface ApplicationLog {
  txid: string;
  blockindex: number;
  executions: ExecutionDetails[];
}

interface Argument {
  type: string;
  value: string;
}

interface ExecutionDetails {
  trigger: string;
  contract: string;
  vmstate: string;
  gas_consumed: string;
  stack: Argument[];
  notifications: Notification[];
}

interface Notification {
  contract: string;
  state: {
    type: 'Array';
    value: Argument[];
  };
}

export function getApplicationLog(data: TransactionInputArgs): Promise<ApplicationLog> {
  return sendMessage({
    command: Command.getApplicationLog,
    data,
  });
}
