export default class MessageEncryption {
    private ec;
    private key;
    private shared;
    private nonceMap;
    getPublicKey(): any;
    setSharedKey(key: any): void;
    hasSharedKey(): boolean;
    encrypt(message: string): string;
    decrypt(input: string): {
        message: any;
        error?: string;
    };
}
//# sourceMappingURL=messageEncryption.d.ts.map