interface GetStorageArgs {
    scriptHash: string;
    key: string;
    network?: string;
}
interface GetStorageOutput {
    result: string;
}
export declare function getStorage(data: GetStorageArgs): Promise<GetStorageOutput>;
export {};
//# sourceMappingURL=getStorage.d.ts.map