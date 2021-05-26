import { sendMessage } from '../messaging';
import { Command } from '../constants';

export function disconnect(): Promise<boolean> {
  return sendMessage({
    command: Command.disconnect,
  });
}
