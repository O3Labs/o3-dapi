import { getProvider, Provider } from './modules/read/getProvider';
import { getNetworks, GetNetworksOutput } from './modules/read/getNetworks';
import { getAccount, Account } from './modules/read/getAccount';
import { getBalance, GetBalanceArgs, BalanceResults } from './modules/read/getBalance';
import { getStorage, GetStorageArgs, GetStorageOutput } from './modules/read/getStorage';
import { invokeRead, InvokeReadArgs } from './modules/read/invokeRead';
import { send, SendArgs, SendOutput } from './modules/write/send';
import { invoke, InvokeArgs, InvokeOutput } from './modules/write/invoke';
import { disconnect } from './modules/disconnect';
import { addEventListener, removeEventListener } from './modules/eventListener';
import { ArgumentDataType, EventName } from './constants';
declare class O3dapiNeo {
    static blockchain: string;
    isAvailable: boolean;
    getProvider: typeof getProvider;
    getNetworks: typeof getNetworks;
    getAccount: typeof getAccount;
    getBalance: typeof getBalance;
    getStorage: typeof getStorage;
    invokeRead: typeof invokeRead;
    send: typeof send;
    invoke: typeof invoke;
    addEventListener: typeof addEventListener;
    removeEventListener: typeof removeEventListener;
    disconnect: typeof disconnect;
    Constants: {
        EventName: typeof EventName;
        ArgumentDataType: typeof ArgumentDataType;
    };
    constructor(sendMessageMethod: any, addEventListenerMethod: any);
}
export default O3dapiNeo;
export declare type getProvider = () => Promise<Provider>;
export declare type getNetworks = () => Promise<GetNetworksOutput>;
export declare type getAccount = () => Promise<Account>;
export declare type getBalance = (data: GetBalanceArgs) => Promise<BalanceResults>;
export declare type getStorage = (data: GetStorageArgs) => Promise<GetStorageOutput>;
export declare type invokeRead = (data: InvokeReadArgs) => Promise<any>;
export declare type send = (data: SendArgs) => Promise<SendOutput>;
export declare type invoke = (data: InvokeArgs) => Promise<InvokeOutput>;
export declare type disconnect = () => Promise<boolean>;
export declare type addEventListener = (event: EventName, callback: Function) => void;
export declare type removeEventListener = (event: EventName) => void;
//# sourceMappingURL=index.d.ts.map