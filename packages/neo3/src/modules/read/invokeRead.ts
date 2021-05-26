import { sendMessage } from '../../messaging';
import { ArgumentDataType, Command } from '../../constants';

export interface InvokeReadArgs {
  scriptHash: string;
  operation: string;
  args: Argument[];
  network?: string;
}

interface Argument {
  type: ArgumentDataType;
  value: any;
}

export function invokeRead(data: InvokeReadArgs): Promise<any> {
  return sendMessage({
    command: Command.invokeRead,
    data,
  });
}
