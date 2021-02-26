import { request, RequestArguments, Account } from './modules/read/request';
import { EventName, Command } from './constants';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { disconnect } from './modules/disconnect';
declare class O3DapiEth {
    static blockchain: string;
    private clientPlugin;
    request: typeof request;
    disconnect: typeof disconnect;
    addEventListener: typeof addEventListener;
    removeEventListener: typeof removeEventListener;
    Constants: {
        EventName: typeof EventName;
        Command: typeof Command;
    };
    constructor(sendMessageMethod: any, addEventListenerMethod: any);
    setClientPlugin(plugin: any): void;
}
export default O3DapiEth;
export declare type request = (data: RequestArguments) => Promise<Account>;
export declare type disconnect = () => Promise<boolean>;
export declare type addEventListener = (event: EventName, callback: Function) => void;
export declare type removeEventListener = (event: EventName) => void;
//# sourceMappingURL=index.d.ts.map