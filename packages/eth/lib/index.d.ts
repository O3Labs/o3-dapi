import { request, RequestArguments, Account } from './modules/read/request';
declare class O3dapiEth {
    static blockchain: string;
    private clientPlugin;
    request: typeof request;
    constructor(sendMessageMethod: any, addEventListenerMethod: any);
    setClientPlugin(plugin: any): void;
}
export default O3dapiEth;
export declare type request = (data: RequestArguments) => Promise<Account>;
//# sourceMappingURL=index.d.ts.map