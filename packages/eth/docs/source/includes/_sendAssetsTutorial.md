## Request assets from user

```
neoDapi.send({
  fromAddress: 'AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru',
  toAddress: 'ATaWxfUAiBcQixNPq6TvKHEHPQum9bx79d',
  asset: 'GAS',
  amount: '0.01',
  network: 'MainNet',
})
.then(({txid, nodeUrl}: SendOutput) => {
  console.log('Send transaction success!');
  console.log('Transaction ID: ' + txid);
  console.log('RPC node URL: ' + nodeUrl);
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
    case SEND_ERROR:
      console.log('There was an error when broadcasting this transaction to the network.');
      break;
    case MALFORMED_INPUT:
      console.log('The receiver address provided is not valid.');
      break;
    case CANCELED:
      console.log('The user has canceled this transaction.');
      break;
    case INSUFFICIENT_FUNDS:
      console.log('The user has insufficient funds to execute this transaction.');
      break;
  }
});
```

In the case where the dApp would like to request a payment or any general sending of assets from the users wallet address to another address. The dAPI provides a method called `send`. The `send` method accepts the basic parameters for from which address the assets are to be sent from, the address which wil be receiving the assets, what asset to send, and the amount to be sent.

In this basic example, we are conducting a basic send of 0.01 GAS from the address that we got from calling `getAccount`, to the dApp address.

### Advanced attributes

```
neoDapi.send({
  fromAddress: 'ATaWxfUAiBcQixNPq6TvKHEHPQum9bx79d',
  toAddress: 'ATaWxfUAiBcQixNPq6TvKHEHPQum9bx79d',
  asset: 'GAS',
  amount: '0.01',
  network: 'MainNet',
  remark: 'Hash puppy clothing purchase. Invoice#abc123',
  fee: '0.0011',
})
```

The `send` method can also accept an option parameter called `remark`. This will allow you to attach a short message description for the send transaction. This will be recorded on the blockchain as a part of the transaction.

The dApp can also specific a network fee amount attached to the transaction under the parameter `fee`. This network fee will be paid by the user in GAS, and will help to aid to get the transaction processed quicker when the mempool is full with free or lower fee transactions.
