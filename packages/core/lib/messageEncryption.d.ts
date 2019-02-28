export default class MessageEncryption {
    private ec;
    private key;
    private senderKey;
    private shared;
    private nonceMap;
    getPublicKey(): any;
    setSharedKey(key: any): void;
    hasSharedKey(): boolean;
    encrypt(message: string): [string, string];
    decrypt(input: string, mac?: string): {
        message: any;
        error?: string;
    };
}
//# sourceMappingURL=messageEncryption.d.ts.map