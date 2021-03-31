import { sendMessage } from '../messaging';
import { ChainType, Command } from '../constants';

export function disconnect(): Promise<boolean> {
    return sendMessage({
        command: Command.disconnect,
    },ChainType.BSC);
}
