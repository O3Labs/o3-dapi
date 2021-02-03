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
