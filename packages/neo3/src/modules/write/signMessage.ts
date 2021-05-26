import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface SignMessageInput {
  message: string;
}

export interface Signature {
  publicKey: string;
  data: string;
  salt: string;
  message: string;
}

export function signMessage(data: SignMessageInput): Promise<Signature> {
  return sendMessage({
    command: Command.signMessage,
    data,
  });
}
