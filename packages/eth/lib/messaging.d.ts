import { ChainType } from './constants';
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
export declare let _sendMessage: (args: InternalSendMessageArgs) => Promise<any>;
export declare function sendMessage(args: SendMessageArgs, chainType: ChainType): Promise<any>;
export declare function initMessaging(sendMessageMethod: any, addEventListener: any, chainType: ChainType): void;
export {};
//# sourceMappingURL=messaging.d.ts.map