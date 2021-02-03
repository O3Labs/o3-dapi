export interface VerifyMessageInput {
    message: string;
    publicKey: string;
    data: string;
}
export interface VerifyMessageOutput {
    result: boolean;
}
export declare function verifyMessage(data: VerifyMessageInput): Promise<VerifyMessageOutput>;
//# sourceMappingURL=verifyMessage.d.ts.map