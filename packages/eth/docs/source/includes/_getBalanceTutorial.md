## Getting asset balances

```
neoDapi.getBalance({
  params: {
    address: 'AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru',
  },
  network: 'MainNet',
})
.then(results => {
  Object.keys(results).forEach(address => {
    const balances = results[address];
    balances.forEach(balance => {
      const { assetID, symbol, amount } = balance

      console.log('Address: ' + address);
      console.log('Asset ID: ' + assetID);
      console.log('Asset symbol: ' + symbol);
      console.log('Amount: ' + amount);
    });
  });
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
    case CONNECTION_DENIED:
      console.log('The user rejected the request to connect with your dApp');
      break;
  }
});
```

Whether it be for the account the user has provided to your dApp via getAccount, or you would like to get asset balance information for another account, the `getBalance` method can be used. By default, for a provided address, the wallet provider will query the status of the NEO block for the latest asset balances for NEO, GAS, and any NEP5 tokens. This balance request does not require permission from the user, and will return the balances immidiately in the resolve of the returned Promise.

In this first example, we have requested the default balances for the address `AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru` on `MainNet`. Similarly, you can change the network from which the balances are pulled from. For example, if you are still in development, you can change the network field to `TestNet`, and the asset balances for that account will be returned from the NEO test net.

### Advanced attributes

```
neoDapi.getBalance({
  params: {
    address: 'AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru',
    assets: ['GAS'],
    fetchUTXO: true,
  },
  network: 'MainNet',
})
```

Alternatively, this same `getBalance` method can accept additional parameters for fetching the balance for only specific assets, or even return the NEO and GAS UTXOs for these balances. This is of course a more advanced usecase, and will probably not be required for the average dApp.
