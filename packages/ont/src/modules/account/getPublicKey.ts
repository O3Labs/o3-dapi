import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

interface PublicKeyOutput {
  publicKey: string;
  address: string;
}

export function getPublicKey(): Promise<PublicKeyOutput> {
  return sendMessage({
    command: Command.getPublicKey,
  });
}
