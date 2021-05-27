import { sendMessage } from '../../messaging';
import { ArgumentDataType, Command } from '../../constants';

export interface InvokeReadArgs {
  scriptHash: string;
  operation: string;
  args?: Argument[];
  signers?: Signer[];
  network?: string;
}

interface Signer {
  account: string;
  scopes: string;
  allowedcontracts?: string[];
  allowedgroups?: string[];
}


interface Argument {
  type: ArgumentDataType;
  value: any;
}

export function invokeRead(data: InvokeReadArgs[]): Promise<any> {
  return sendMessage({
    command: Command.invokeReadMulti,
    data,
  });
}
