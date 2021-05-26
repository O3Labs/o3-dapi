import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface VerifyMessageInput {
  message: string;
  publicKey: string;
  data: string;
}

export interface VerifyMessageOutput {
  result: boolean;
}

export function verifyMessage(data: VerifyMessageInput): Promise<VerifyMessageOutput> {
  return sendMessage({
    command: Command.verifyMessage,
    data,
  });
}
