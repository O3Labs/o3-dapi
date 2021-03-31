import { RequestArguments, Account } from './modules/read/request';
import { EventName, ChainType } from './constants';
import o3dapi from 'o3-dapi-core';
export default o3dapi;
export declare type request = (data: RequestArguments, blockchain: ChainType) => Promise<Account>;
export declare type disconnect = () => Promise<boolean>;
export declare type addEventListener = (event: EventName, callback: Function) => void;
export declare type removeEventListener = (event: EventName) => void;
//# sourceMappingURL=index.d.ts.map