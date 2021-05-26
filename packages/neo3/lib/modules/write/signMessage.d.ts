export interface SignMessageInput {
    message: string;
}
export interface Signature {
    publicKey: string;
    data: string;
    salt: string;
    message: string;
}
export declare function signMessage(data: SignMessageInput): Promise<Signature>;
//# sourceMappingURL=signMessage.d.ts.map