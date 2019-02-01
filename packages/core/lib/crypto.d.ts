export declare class Crypto {
    private ec;
    private key;
    private shared;
    private cipher;
    private decipher;
    private nonceMap;
    constructor(key: any);
    getPublicKey(): any;
    encrypt(message: string): string;
    decrypt(input: string): string | Error;
}
//# sourceMappingURL=crypto.d.ts.map