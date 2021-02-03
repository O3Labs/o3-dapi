export interface GetStorageArgs {
    scriptHash: string;
    key: string;
    network?: string;
}
export interface GetStorageOutput {
    result: string;
}
export declare function getStorage(data: GetStorageArgs): Promise<GetStorageOutput>;
//# sourceMappingURL=getStorage.d.ts.map