import { onEvent } from './modules/eventListener';
import { ChainType, VERSION } from './constants';

interface SendMessageArgs {
  command: string;
  data?: any;
  network?: string;
  timeout?: number;
}

interface InternalSendMessageArgs extends SendMessageArgs {
  blockchain: string;
  version: string;
}

export let _sendMessage = (args: InternalSendMessageArgs): Promise<any> => Promise.reject(new Error('o3-dapi-eth plugin not instanciated.'));

export function sendMessage(args: SendMessageArgs, chainType: ChainType): Promise<any> {
  return _sendMessage({
    ...args,
    blockchain: chainType,
    version: VERSION,
  });
}

export function initMessaging(sendMessageMethod, addEventListener, chainType: ChainType) {
  _sendMessage = sendMessageMethod;
  addEventListener({blockchain: chainType, callback: onEvent});
}
