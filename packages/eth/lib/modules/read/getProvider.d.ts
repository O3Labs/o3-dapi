export interface Provider {
    name: string;
    website: string;
    version: string;
    compatibility: string[];
    extra: {
        theme: string;
        currency: string;
    };
}
export declare function getProvider(): Promise<Provider>;
//# sourceMappingURL=getProvider.d.ts.map