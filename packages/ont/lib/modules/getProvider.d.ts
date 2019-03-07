interface Provider {
    name: string;
    version: string;
    compatibility: string[];
    website: string;
    extra: {
        theme: string;
        currency: string;
    };
}
export declare function getProvider(): Promise<Provider>;
export {};
//# sourceMappingURL=getProvider.d.ts.map