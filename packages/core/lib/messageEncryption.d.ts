export declare const AES128GCM = "aes-128-gcm";
export default class MessageEncryption {
    private ec;
    private key;
    private shared;
    private nonceMap;
    private cipherAlgorithm;
    getPublicKey(): any;
    setSharedKey(key: any): void;
    hasSharedKey(): boolean;
    encrypt(message: string): string | any;
    decrypt(input: string | any): {
        message: any;
        error?: string;
    };
    setCipherAlgorithOverride(algorithm: string): void;
    private _getSharedKey;
}
//# sourceMappingURL=messageEncryption.d.ts.map