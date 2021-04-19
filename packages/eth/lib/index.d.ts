import { request, RequestArguments, Account, requestHeco, requestBsc } from './modules/read/request';
import { EventName, Command, ChainType } from './constants';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { disconnect } from './modules/disconnect';
export declare class ETH {
    static blockchain: ChainType;
    private clientPlugin;
    request: typeof request;
    disconnect: typeof disconnect;
    addEventListener: typeof addEventListener;
    removeEventListener: typeof removeEventListener;
    Constants: {
        EventName: typeof EventName;
        Command: typeof Command;
    };
    constructor(sendMessageMethod: any, addEventListenerMethod: any, blockchain?: ChainType);
    setClientPlugin(plugin: any): void;
}
export declare class BSC {
    static blockchain: ChainType;
    private clientPlugin;
    request: typeof requestBsc;
    disconnect: typeof disconnect;
    addEventListener: typeof addEventListener;
    removeEventListener: typeof removeEventListener;
    Constants: {
        EventName: typeof EventName;
        Command: typeof Command;
    };
    constructor(sendMessageMethod: any, addEventListenerMethod: any, blockchain?: ChainType);
    setClientPlugin(plugin: any): void;
}
export declare class HECO {
    static blockchain: ChainType;
    private clientPlugin;
    request: typeof requestHeco;
    disconnect: typeof disconnect;
    addEventListener: typeof addEventListener;
    removeEventListener: typeof removeEventListener;
    Constants: {
        EventName: typeof EventName;
        Command: typeof Command;
    };
    constructor(sendMessageMethod: any, addEventListenerMethod: any, blockchain?: ChainType);
    setClientPlugin(plugin: any): void;
}
declare const o3DapiETH: {};
export default o3DapiETH;
export declare type request = (data: RequestArguments, blockchain: ChainType) => Promise<Account>;
export declare type disconnect = () => Promise<boolean>;
export declare type addEventListener = (event: EventName, callback: Function) => void;
export declare type removeEventListener = (event: EventName) => void;
//# sourceMappingURL=index.d.ts.map