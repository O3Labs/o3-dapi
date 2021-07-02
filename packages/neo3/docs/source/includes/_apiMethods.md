# API Methods

## Read Methods

Read methods do not alter the state of the blockchain. It can help you query information about your user, and provide you with relevant information:

### getProvider

```typescript
neoN3Dapi.getProvider()
.then((provider: Provider) => {
  const {
    name,
    website,
    version,
    compatibility,
    extra,
  } = provider;

  const {
    theme,
    currency,
  } = extra;

  console.log('Provider name: ' + name);
  console.log('Provider website: ' + website);
  console.log('Provider dAPI version: ' + version);
  console.log('Provider dAPI compatibility: ' + JSON.stringify(compatibility));
  console.log('Provider UI theme: ' + theme);
  console.log('Provider Base currency: ' + currency);
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
    case CONNECTION_DENIED:
      console.log('The user rejected the request to connect with your dApp.');
      break;
  }
});
```

> Example Response

```typescript
{
  name: 'Awesome Wallet',
  website: 'https://www.awesome.com',
  version: 'v0.0.1',
  compatibility: [
    'NEP-dapi',
    'OEP-6',
    'ONT-STAKING',
    'PAY'
  ],
  extra: {
    theme: 'Light Mode',
    currency: 'USD',
  }
}
```

Returns information about the dAPI provider, including who this provider is, the version of their dAPI, and the NEP that the interface is compatible with.

##### Input Arguments

None

##### Success Response

| Parameter     | Type     | Description                                                      |
|:--------------|:---------|:-----------------------------------------------------------------|
| name          | String   | The name of the wallet provider                                  |
| website       | String   | The website of the wallet provider                               |
| version       | String   | The version of the dAPI that the the wallet supports             |
| compatibility | String[] | A list of all applicable NEPs which the wallet provider supports |
| extra         | Object   | Provider specific attributes                                     |

###### extra

| Parameter | Type   | Description               |
|-----------|--------|---------------------------|
| theme     | string | UI theme of the provider  |
| currency  | string | Base currency set by user |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getNetworks

```typescript
neoN3Dapi.getNetworks()
.then(response => {
  const {
    chainId,
    networks,
    defaultNetwork,
  } = response;

  console.log('chainId: ' + chainId);
  // eg. 4

  console.log('Networks: ' + networks);
  // eg. ["MainNet", "TestNet", "N3TestNet"]

  console.log('Default network: ' + defaultNetwork);
  // eg. "N3TestNet"
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

> Example Response

```typescript
{
  chainId: 4,
  networks: ["MainNet", "TestNet", "N3TestNet"],
  defaultNetwork: "N3TestNet"
}
```

Returns the networks the wallet provider has available to connect to, along with the default network the wallet is currently set to.

##### Input Arguments

None

##### Success Response

| Parameter      | Type     | Description                                                        |
|:---------------|:---------|:-------------------------------------------------------------------|
| networks       | String[] | A list of all networks which this wallet provider allows access to |
| chainId        | Number   | ChainId the wallet is currently set to                             |
| defaultNetwork | String   | Network the wallet is currently set to                             |

###### Chain IDs Type

These are the IDs of the Neo chain supported by O3 Desktop.

| chainId | Description                                             |
|:--------|:--------------------------------------------------------|
| 1       | ChainId 1 is the Neo2 MainNet                           |
| 2       | ChainId 2 is the Neo2 TestNet                           |
| 3       | ChainId 3 is the N3 MainNet                             |
| 4       | ChainId 4 is the N3 TestNet (Currently only N3 TestNet) |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getAccount

```typescript
neoN3Dapi.getAccount()
.then((account: Account) => {
  const {
    address,
    label,
  } = account;

  console.log('Account address: ' + address);
  console.log('Account label: ' + label);
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

> Example Response

```typescript
{
  address: 'NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq',
  label: 'My Spending Wallet'
}
```

Return the Account that is currently connected to the dApp.

##### Success Response

| Parameter | Type   | Description                                                        |
|:----------|:-------|:-------------------------------------------------------------------|
| address   | String | The address of the account that is currently connected to the dapp |
| label     | String | A label the users has set to identify their wallet                 |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### pickAddress

```typescript
neoN3Dapi.pickAddress()
.then((account: Account) => {
  const {
    address,
    label,
  } = account;

  console.log('Account address: ' + address);
  console.log('Account label: ' + label);
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

> Example Response

```typescript
{
  address: 'NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq',
  label: 'My Spending Wallet'
}
```

Return a Neo N3 Account.

##### Success Response

| Parameter | Type   | Description                                                        |
|:----------|:-------|:-------------------------------------------------------------------|
| address   | String | A NEO N3 address of your choice |
| label     | String | A label the users has set to identify their wallet                 |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getPublicKey

```typescript
neoN3Dapi.getPublicKey()
.then((publicKeyData: PublicKeyData) => {
  const {
    address,
    publicKey,
  } = publicKeyData;

  console.log('Account address: ' + address);
  console.log('Account public key: ' + publicKey);
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

> Example Response

```typescript
{
  address: 'NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq',
  publicKey: '6PYKGV4numxfoswwCedXzhb1oNCC8W4tEdfFPdtWtFa8WidpzYfeJkd2To'
}
```

Return the public key of the Account that is currently connected to the dApp.

##### Success Response

| Parameter | Type   | Description                                                           |
|:----------|:-------|:----------------------------------------------------------------------|
| address   | String | The address of the account that is currently connected to the dapp    |
| publicKey | String | The public key of the account that is currently connected to the dapp |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getBalance

```typescript
neoN3Dapi.getBalance({
  params: [{
    address: 'NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq',
    contracts: ['NEO']
  }],
  network: 'N3TestNet',
})
.then((results: BalanceResults) => {
  Object.keys(results).forEach(address => {
    const balances = results[address];
    balances.forEach(balance => {
      const { contract, symbol, amount } = balance

      console.log('Address: ' + address);
      console.log('Contract: ' + contract);
      console.log('Contract symbol: ' + symbol);
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

> Single Address with specific balances requested

```typescript
// input
{
  params: [{
    address: 'NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq',
    contracts: ['GAS']
  }],
  network: 'N3TestNet',
}

// output
{
  NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq: [
    {
      contract: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
      symbol: 'GAS',
      amount: '432.4085032',
    }
  ],
}
```

> Single Address with all balances requested

```typescript
// input
{
  params: {
    address: 'NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq'
  },
  network: 'N3TestNet',
}

// output
{
  NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq: [
    {
      contract: '0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5',
      symbol: 'NEO',
      amount: '0',
    },
    {
      contract: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
      symbol: 'GAS',
      amount: '432.4085032',
    }
  ]
}
```

> Multiple address balance queries

```typescript
// input
{
  params: [
    {
      address: 'NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq',
    },
    {
      address: 'NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ',
      contracts: ['NEO'],
    },
  ],
  network: 'N3TestNet',
}

// output
{
  NaUjKgf5vMuFt7Ffgfffcpc41uH3adx1jq: [
    {
      contract: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      symbol: "NEO",
      amount: "0"
    },
    {
      contract: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
      symbol: "GAS",
      amount: "432.4085032"
    }
  ],
  NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ: [
    {
      contract: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      symbol: "NEO",
      amount: "52"
    }
  ]
}
```

Allows the DAPP to query the balance of a user, this includes both native assets (NEO/GAS) and NEP-17 tokens

##### Input Arguments

| Parameter | Type                               | Description                                                                              |
|:----------|:-----------------------------------|:-----------------------------------------------------------------------------------------|
| params    | BalanceRequest or BalanceRequest[] | A list of Balance Request Objects, specifying which addresses, and which assets to query |
| network   | String                             | The call will only work for the networks available in the GetNetworks command            |

###### Balance Request

| Parameter | Type     | Description                                                   |
|:----------|:---------|:--------------------------------------------------------------|
| address   | String   | The address whose balance you want to query                   |
| contracts | String[] | A list of contract hash (or symbold) to query the balance for |

##### Success Response

| Parameter | Type              | Description                                                                          |
|:----------|:------------------|:-------------------------------------------------------------------------------------|
| address_1 | BalanceResponse[] | This key is the actual address of the query eg. "AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru" |
| address_2 | BalanceResponse[] | This key is the actual address of the query eg. "AbKNY45nRDy6B65YPVz1B6YXiTnzRqU2uQ" |
| address_n | BalanceResponse[] | This key is the actual address of the query eg. "AUdawyrLMskxXMUE8osX9mSLKz8R7777kE" |

<aside class="notice">
The amount of addresses is n where n is the number of addresses specified in your query
</aside>

###### BalanceResponse

| Parameter | Type   | Description                                         |
|:----------|:-------|:----------------------------------------------------|
| contract  | String | contract of the given hash                          |
| symbol    | String | Symbol of the given contract                        |
| amount    | String | Double Value of the balance represented as a String |

### getStorage

```typescript
neoN3Dapi.getStorage({
  scriptHash: '006b26dd0d2aa076b11082847a094772450f05af',
  key: 'token0',
  network: 'N3TestNet'
})
.then(res => {
  const value = res.result;
  console.log('Storage value: ' + value);
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
    case CONNECTION_REFUSED:
      console.log('Connection dApp not connected. Please call the "connect" function.');
      break;
    case RPC_ERROR:
      console.log('There was an error when broadcasting this transaction to the network.');
      break;
  }
});
```

> Example Response

```typescript
{
  result: 'wYCMqLCTIUiax57E8Zd/O9xN3l8='
}
```

Returns the raw value located in contract storage

##### Input Arguments

| Parameter  | Type   | Description                                                  |
|:-----------|:-------|:-------------------------------------------------------------|
| scriptHash | String | Scripthash of the contract whose storage you are querying on |
| key        | String | Key of the storage value to retrieve from the contract       |
| network    | String | Network alias to submit this request to.                     |

##### Success Response

| Parameter | Type   | Description                               |
|:----------|:-------|:------------------------------------------|
| result    | String | The raw value located in contract storage |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### invokeRead

```typescript
neoN3Dapi.invokeRead({
  scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
  operation: "balanceOf",
  args: [
    {
      type: "Address",
      value: "NYxb4fSZVKAz8YsgaPK2WkT3KcAE9b3Vag"
    }
  ],
  network: "N3TestNet"
})
.then((result: Object) => {
  console.log('Read invocation result: ' + JSON.stringify(result));
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
    case CONNECTION_REFUSED:
      console.log('Connection dApp not connected. Please call the "connect" function.');
      break;
   case RPC_ERROR:
    console.log('There was an error when broadcasting this transaction to the network.');
    break;
  }
});
```

> Example Response

```typescript
{
  "script": "DBSPGGqUKpybpotgzGQ8Z+jwK4ovdhHAHwwJYmFsYW5jZU9mDBT1Y+pAvCg9TQ4FxI6jBbPyoHNA70FifVtS",
  "state": "HALT",
  "gasconsumed": "2028330",
  "exception": null,
  "stack": [
    {
      "type": "Integer",
      "value": "48929339"
    }
  ]
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments

| Parameter  | Type       | Description                                                                                              |
|:-----------|:-----------|:---------------------------------------------------------------------------------------------------------|
| scriptHash | String     | The script hash of the contract you want to invoke a read on                                             |
| operation  | String     | The operation on the smart contract that you want to invoke a read on                                    |
| args       | Argument[] | The input arguments necessary to perform this operation                                                  |
| signers    | Signers[]? | Sender and the effective scope of signature                                                              |
| network    | String     | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

###### Argument

| Parameter | Type   | Description                                               |
|:----------|:-------|:----------------------------------------------------------|
| type      | String | The type of the argument with you are using               |
| value     | String | String representation of the argument which you are using |

<aside class =notice>
Available types are "String"|"Boolean"|"Hash160"|"Hash256"|"Integer"|"ByteArray"|"Array"|"Address"
</aside>

###### Signers

| Parameter        | Type   | Description                                      |
|:-----------------|:-------|:-------------------------------------------------|
| account          | String | Script hash of the account                       |
| scopes           | Number | Effective range of the signature                 |
| allowedContracts | Array? | Signs array of the allowed contract scripts      |
| allowedGroups    | Array? | Signs public keys of the allowed contract groups |

###### Scopes

| Field | Description                                                                                            |
|:------|:-------------------------------------------------------------------------------------------------------|
| 0     | The signature is used for transactions only, and is disabled in contracts                              |
| 1     | The signature is only effective to the contract script called by Entry                                 |
| 16    | The signature is only effective to the specified contract script                                       |
| 32    | The signature is effective to contracts in the group.                                                  |
| 128   | The signature is globally effective. It is the default value of Neo Legacy and is backward compatible. |

##### Success Response

The wallet will return the direct response from the RPC node.

| Parameter    | Type       | Description                                                                                   |
|:-------------|:-----------|:----------------------------------------------------------------------------------------------|
| script       | String     | The script which was run                                                                      |
| state        | String     | Status of the executeion                                                                      |
| gas_consumed | String     | Estimated amount of GAS to be used to execute the invocation. (Up to 10 free per transaction) |
| stack        | Argument[] | An array of response arguments                                                                |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### invokeReadMulti

```typescript
neoN3Dapi.invokeReadMulti({
  invokeReadArgs: [
    {
      scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      operation: "balanceOf",
      args: [
        {
          type: "Address",
          value: "NYxb4fSZVKAz8YsgaPK2WkT3KcAE9b3Vag"
        }
      ]
    },
    {
      scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      operation: "balanceOf",
      args: [
        {
          type: "Address",
          value: "NZHf1NJvz1tvELGLWZjhpb3NqZJFFUYpxT"
        }
      ]
    }
  ],
  network: "N3TestNet"
})
.then((result: Object) => {
  console.log('Read invocation result: ' + JSON.stringify(result));
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
    case CONNECTION_REFUSED:
      console.log('Connection dApp not connected. Please call the "connect" function.');
      break;
   case RPC_ERROR:
    console.log('There was an error when broadcasting this transaction to the network.');
    break;
  }
});
```

> Example Response

```typescript
[
  {
    "script": "DBSPGGqUKpybpotgzGQ8Z+jwK4ovdhHAHwwJYmFsYW5jZU9mDBT1Y+pAvCg9TQ4FxI6jBbPyoHNA70FifVtS",
    "state": "HALT",
    "gasconsumed": "2028330",
    "exception": null,
    "stack": [
      {
        "type": "Integer",
        "value": "48929339"
      }
    ]
  },
  {
    "script": "DBSSs5x3qmDym1fBc87ZF/F/0yGm6xHAHwwJYmFsYW5jZU9mDBT1Y+pAvCg9TQ4FxI6jBbPyoHNA70FifVtS",
    "state": "HALT",
    "gasconsumed": "2028330",
    "exception": null,
    "stack": [
      {
        "type": "Integer",
        "value": "15000000"
      }
    ]
  }
]
```

Execute a contract invocation in read-only mode.

##### Input Arguments

| Parameter  | Type       | Description                                                                                              |
|:-----------|:-----------|:---------------------------------------------------------------------------------------------------------|
| invokeReadArgs | InvokeReadArguments[]     | The script hash of the contract you want to invoke a read on                               |
| signers        | Signers[]  | Sender and the effective scope of signature                                                          |
| network    | String     | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

###### InvokeReadArguments

| Parameter  | Type       | Description                                                                                              |
|:-----------|:-----------|:---------------------------------------------------------------------------------------------------------|
| scriptHash | String     | The script hash of the contract you want to invoke a read on                                             |
| operation  | String     | The operation on the smart contract that you want to invoke a read on                                    |
| args       | Argument[] | The input arguments necessary to perform this operation                                                  |

###### Argument

| Parameter | Type   | Description                                               |
|:----------|:-------|:----------------------------------------------------------|
| type      | String | The type of the argument with you are using               |
| value     | String | String representation of the argument which you are using |

<aside class =notice>
Available types are "String"|"Boolean"|"Hash160"|"Hash256"|"Integer"|"ByteArray"|"Array"|"Address"
</aside>

###### Signers

| Parameter        | Type   | Description                                      |
|:-----------------|:-------|:-------------------------------------------------|
| account          | String | Script hash of the account                       |
| scopes           | Number | Effective range of the signature                 |
| allowedContracts | Array? | Signs array of the allowed contract scripts      |
| allowedGroups    | Array? | Signs public keys of the allowed contract groups |

###### Scopes

| Field | Description                                                                                            |
|:------|:-------------------------------------------------------------------------------------------------------|
| 0     | The signature is used for transactions only, and is disabled in contracts                              |
| 1     | The signature is only effective to the contract script called by Entry                                 |
| 16    | The signature is only effective to the specified contract script                                       |
| 32    | The signature is effective to contracts in the group.                                                  |
| 128   | The signature is globally effective. It is the default value of Neo Legacy and is backward compatible. |

##### Success Response

The wallet will return the direct response from the RPC node.

| Parameter    | Type       | Description                                                                                   |
|:-------------|:-----------|:----------------------------------------------------------------------------------------------|
| script       | String     | The script which was run                                                                      |
| state        | String     | Status of the executeion                                                                      |
| gas_consumed | String     | Estimated amount of GAS to be used to execute the invocation. (Up to 10 free per transaction) |
| stack        | Argument[] | An array of response arguments                                                                |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### verifyMessage

```typescript
neoN3Dapi.verifyMessage({
  message: '15c06345eebb49cdbc14421e03491951Here is a message',
  data: '7249925b8813e21fdfdd8c08d6b6c45c49c813e59c9cf64eec9a2d1b096c85baa874fb0b6eefc3f6c553a0b4f95c8c651607a7a416986c216f7175f45956d522',
  publicKey: '027b18c5aaae6a66ce8ab1a41f0ea0db4ec5bb5d6501d51c86cc994aca5275a461',
})
.then(({result: bool}) => {
  console.log('Signature data matches provided message and public key: ' + result);
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

> Example Response

```typescript
{
  result: true,
}
```

Returns whether the provided signature data matches the provided message and was signed by the account of the provided public key.

##### Input Arguments

| Parameter | Type   | Description                                            |
|:----------|:-------|:-------------------------------------------------------|
| message   | String | The original signed message                            |
| data      | String | The signature data                                     |
| publicKey | String | The public key of the account used to sign the message |

##### Success Response

| Parameter | Type    | Description                                                                |
|:----------|:--------|:---------------------------------------------------------------------------|
| result    | Boolean | Whether the provided signature matches the provided message and public key |

##### Error Response
| Parameter   | Type    | Description                                   |
|:------------|:--------|:----------------------------------------------|
| type        | String  | The type of error which has occurred          |
| description | String  | A description of the error which has occurred |
| data        | String? | Any raw data associated with the error        |

### getBlock

```typescript
neoN3Dapi.getBlock({
  blockHeight: 100,
  network: 'N3TestNet'
})
.then((result: Object) => {
  console.log('Block information: ' + JSON.stringify(result));
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
   case RPC_ERROR:
    console.log('There was an error when broadcasting this transaction to the network.');
    break;
  }
});
```

Get information about a specific block.

> Example Response

```typescript
{
  "hash": "0x881e36beda53f6e354516058cad52f26ba9c04e6e05eac8f61d0df25227a673b",
  "size": 689,
  "version": 0,
  "previousblockhash": "0xbd40665daee6a2174b24628d5d7c3f94e488e51b0e3f1a416d6f870be68e7146",
  "merkleroot": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "time": 1621309715037,
  "index": 100,
  "primary": 2,
  "nextconsensus": "NZHf1NJvz1tvELGLWZjhpb3NqZJFFUYpxT",
  "witnesses": [
    {
      "invocation": "DECgjHj1POZB2VcJLRYm6Q8aI3eafaSr/jU1f/hUKTB0DayFD4OR4X3n7coMj4ZHSJzmNS/UereRmGn8TgG/WGlWDEBYWZcda6ppsFJpG3u5Vj0YobqJHpWRSDq0Qg+1pE5xpkx66YVbFdYWfP/XWkAEd89gamNUhZiG03D0XdRyc6W+DECGGJCdl5ZREOojNqUpEe+ei7/6Vl9Yuj0xf3h+UOq9lZIrg4Ht0qGvDGSdKD6p2P9iN5yTRbYYpwKexfSNEc1dDEBGpAkyPGbrz+WrtkwYg3hn5leKYFMQpQbFRNd5uDQ6SFBFFSHLceJO/Iia2jD4PndYDmow5Xgj1yRapOR52jqpDEDjUTzO7v2FL8SxfWKA5Uf5LgVj6yQhf4S/A719sI43DtJp2JuSBC+oD8sHr2oZ3dD7MN+SD7QqPOYqW6ls3nYU",
      "verification": "FQwhAwCbdUDhDyVi5f2PrJ6uwlFmpYsm5BI0j/WoaSe/rCKiDCEDAgXpzvrqWh38WAryDI1aokaLsBSPGl5GBfxiLIDmBLoMIQIUuvDO6jpm8X5+HoOeol/YvtbNgua7bmglAYkGX0T/AQwhAj6bMuqJuU0GbmSbEk/VDjlu6RNp6OKmrhsRwXDQIiVtDCEDQI3NQWOW9keDrFh+oeFZPFfZ/qiAyKahkg6SollHeAYMIQKng0vpsy4pgdFXy1u9OstCz9EepcOxAiTXpE6YxZEPGwwhAroscPWZbzV6QxmHBYWfriz+oT4RcpYoAHcrPViKnUq9F0Ge0Nw6"
    }
  ],
  "tx": [],
  "confirmations": 232520,
  "nextblockhash": "0x6e4ccb0110b6e3d631b66ea45502253b0542be358aa6636ac202901e4da0c30c"
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments

| Parameter   | Type    | Description                                                                                              |
|:------------|:--------|:---------------------------------------------------------------------------------------------------------|
| blockHeight | integer | The height of the block you would like to get information about.                                         |
| network     | String  | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

##### Success Response

The wallet will return the direct response from the RPC node.

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getBlockHeight

```typescript
neoN3Dapi.getBlockHeight({
  network: 'N3TestNet'
})
.then((res: {result: number}) => {
  console.log('Block height: ' + res.result);
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
   case RPC_ERROR:
    console.log('There was an error when broadcasting this transaction to the network.');
    break;
  }
});
```

Get the height of the current block.

> Example Response

```typescript
{
  "result": 232626
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments

| Parameter | Type   | Description                                                                                              |
|:----------|:-------|:---------------------------------------------------------------------------------------------------------|
| network   | String | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

##### Success Response

| Parameter | Type   | Description                 |
|:----------|:-------|:----------------------------|
| result    | Number | Height of the current block |

##### Error Response
| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getTransaction

```typescript
neoN3Dapi.getTransaction({
  txid: '0x3174b6a05a110986d09dfb418652fd454a1109db5b56feee382d9fa3c80231bd',
  network: 'N3TestNet'
})
.then((result: Object) => {
  console.log('Transaction details: ' + JSON.stringify(result));
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
   case RPC_ERROR:
    console.log('There was an error when broadcasting this transaction to the network.');
    break;
  }
});
```

Get information about a specific transaction.

> Example Response

```typescript
{
  "hash": "0x3174b6a05a110986d09dfb418652fd454a1109db5b56feee382d9fa3c80231bd",
  "size": 245,
  "version": 0,
  "nonce": 1053966309,
  "sender": "NiULDRovMJYhFkUp6YLtiJYewk88ixDcjf",
  "sysfee": "9977780",
  "netfee": "1228520",
  "validuntilblock": 50294,
  "signers": [
    {
      "account": "0x935ce5f249ac2771a3e9ec4b89934d6ecba171f7",
      "scopes": "CalledByEntry"
    }
  ],
  "attributes": [],
  "script": "CxEMFIU5Il4pKR6Kf5xyOLaNS67/1PekDBT3caHLbk2TiUvs6aNxJ6xJ8uVckxTAHwwIdHJhbnNmZXIMFPVj6kC8KD1NDgXEjqMFs/Kgc0DvQWJ9W1I5",
  "witnesses": [
    {
      "invocation": "DECrDdebDa4YkryS+q0Xx3arFzxZQVLG3YMLOA0i8v68kHobxjPhS00Ap70rT6fcr/0DrKAHgNaLGjDu+1HAvKbp",
      "verification": "DCEDuu8/R9rBJRzfJjOTME436fyss95SjCMzSXeqYPvY8sxBVuezJw=="
    }
  ],
  "blockhash": "0xb60a9a4ffe6fb097b3c253ee52a9b396316d486f3c0fb4a8ea9e1698ab620444",
  "confirmations": 188093,
  "blocktime": 1622015624544
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments

| Parameter | Type   | Description                                                                                              |
|:----------|:-------|:---------------------------------------------------------------------------------------------------------|
| txid      | String | The id of the transaction you would like to get information about.                                       |
| network   | String | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

##### Success Response

The wallet will return the direct response from the RPC node.

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getApplicationLog

```typescript
neoN3Dapi.getApplicationLog({
  txid: '0x3174b6a05a110986d09dfb418652fd454a1109db5b56feee382d9fa3c80231bd',
  network: 'N3TestNet'
})
.then((result: Object) => {
  console.log('Application log of transaction execution: ' + JSON.stringify(result));
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
   case RPC_ERROR:
    console.log('There was an error when broadcasting this transaction to the network.');
    break;
  }
});
```

Get the application log for a given transaction.

> Example Response

```typescript
{
  "txid": "0x3174b6a05a110986d09dfb418652fd454a1109db5b56feee382d9fa3c80231bd",
  "executions": [
    {
      "trigger": "Application",
      "vmstate": "HALT",
      "exception": null,
      "gasconsumed": "9977780",
      "stack": [],
      "notifications": [
        {
          "contract": "0xd2a4cff31913016155e38e474a2c06d08be276cf",
          "eventname": "Transfer",
          "state": {
            "type": "Array",
            "value": [
              {
                "type": "Any"
              },
              {
                "type": "ByteString",
                "value": "93Ghy25Nk4lL7OmjcSesSfLlXJM="
              },
              {
                "type": "Integer",
                "value": "1100000"
              }
            ]
          }
        },
        {
          "contract": "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
          "eventname": "Transfer",
          "state": {
            "type": "Array",
            "value": [
              {
                "type": "ByteString",
                "value": "93Ghy25Nk4lL7OmjcSesSfLlXJM="
              },
              {
                "type": "ByteString",
                "value": "hTkiXikpHop/nHI4to1Lrv/U96Q="
              },
              {
                "type": "Integer",
                "value": "1"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments

| Parameter | Type   | Description                                                                                              |
|:----------|:-------|:---------------------------------------------------------------------------------------------------------|
| txid      | String | The id of the transaction you would like to get the application logs for.                                |
| network   | String | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

##### Success Response

The wallet will return the direct response from the RPC node.

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

## Write Methods

Write methods will alter the state on the blockchain, and require a user signature.

### send

```typescript
neoN3Dapi.send({
  fromAddress: 'NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM',
  toAddress: 'NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ',
  asset: 'NEO',
  amount: '1',
  fee: '0.0001',
  network: 'N3TestNet',
  broadcastOverride: false,
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

> Example Response

```typescript
{
  txid: 'ed54fb38dff371be6e3f96e4880405758c07fe6dd1295eb136fe15f311e9ff77',
  nodeUrl: 'https://neo3-testnet.o3node.org',
}
```

The send API can be used for accepting payments from the user in a cryptocurrency that is located on the NEO blockchain. It requires user authentication in order for the transaction to be relayed. The transaction will be relayed by the wallet.

##### Input Arguments

| Parameter         | Type     | Description                                                                                                                                        |
|:------------------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------|
| fromAddress       | String   | The address from where the transaction is being sent. This will be the same value as the one received from the getAccount API                      |
| toAddress         | String   | The address to where the user should send their funds                                                                                              |
| asset             | String   | The asset which is being requested for payment...e.g NEP5 scripHash, GAS or CGAS                                                                   |
| amount            | String   | The amount which is being requested for payment                                                                                                    |
| fee               | String?  | If a fee is specified then the wallet SHOULD NOT override it, if a fee is not specified the wallet SHOULD allow the user to attach an optional fee |
| network           | String   | Network alias to submit this request to.                                                                                                           |
| broadcastOverride | Boolean? | If this flag is set to True, the wallet provider will return the signed transaction rather than broadcasting to a node.                            |

##### Success Response

In the case where the "broadcastOverride" input argument is not set, or set to false.

| Parameter | Type   | Description                                                                   |
|:----------|:-------|:------------------------------------------------------------------------------|
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| nodeURL   | String | The node to which the transaction was submitted to                            |

<aside class="warning">
It is recommended that the DAPP take appropriate levels of risk prevention when accepting transactions. The dapp can query the mempool of a known node to ensure that the transaction will indeed be broadcast on the network.
</aside>

In the case where the "broadcastOverride" input argument is set to True.

| Parameter | Type   | Description                                                                   |
|:----------|:-------|:------------------------------------------------------------------------------|
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| signedTx  | String | The serialized signed transaction                                             |

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### invoke

```typescript
neoN3Dapi.invoke({
  scriptHash: 'ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5',
  operation: 'transfer',
  args: [
    {
      type: "Address",
      value: "NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM"
    },
    {
      type: "Address",
      value: "NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ"
    },
    {
      type: "Integer",
      value: "1"
    },
    {
      type: "String",
      value: "NEO"
    }
  ],
  fee: '0.001',
  network: 'N3TestNet',
  broadcastOverride: false,
  signers: [
    {
      account: "0x85afbd7dcaa61d4ff1009912856abede476061db",
      scopes: 128
    }
  ],
})
.then(({txid, nodeUrl}: InvokeOutput) => {
  console.log('Invoke transaction success!');
  console.log('Transaction ID: ' + txid);
  console.log('RPC node URL: ' + nodeUrl);
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
    case RPC_ERROR:
      console.log('There was an error when broadcasting this transaction to the network.');
      break;
    case CANCELED:
      console.log('The user has canceled this transaction.');
      break;
  }
});
```

> Example Response

```typescript
{
  txid: 'ed54fb38dff371be6e3f96e4880405758c07fe6dd1295eb136fe15f311e9ff77',
  nodeUrl: 'https://neo3-testnet.o3node.org',
}:
```

Invoke allows for the generic execution of smart contracts on behalf of the user. It is recommended to have a general understanding of the NEO blockchain, and to be able successfully use all other commands listed previously in this document before attempting a generic contract execution.

##### Input arguments

| Parameter         | Type       | Description                                                                                                                                        |
|:------------------|:-----------|:---------------------------------------------------------------------------------------------------------------------------------------------------|
| scriptHash        | String     | The script hash of the contract that you wish to invoke                                                                                            |
| operation         | String     | The operation on the smart contract that you wish to call. This can be fetched from the contract ABI                                               |
| args              | Argument[] | A list of arguments necessary to perform on the operation you wish to call                                                                         |
| fee               | String?    | If a fee is specified then the wallet SHOULD NOT override it, if a fee is not specified the wallet SHOULD allow the user to attach an optional fee |
| network           | String     | Network alias to submit this request to.                                                                                                           |
| broadcastOverride | Boolean?   | If this flag is set to True, the wallet provider will return the signed transaction rather than broadcasting to a node.                            |
| signers           | Signers[]  | Sender and the effective scope of signature                                                                                                        |

###### Argument

| Parameter | Type   | Description                                               |
|:----------|:-------|:----------------------------------------------------------|
| type      | String | The type of the argument with you are using               |
| value     | String | String representation of the argument which you are using |

<aside class =notice>
Available types are "String"|"Boolean"|"Hash160"|"Hash256"|"Integer"|"ByteArray"|"Array"|"Address"
</aside>

###### Signers

| Parameter        | Type   | Description                                      |
|:-----------------|:-------|:-------------------------------------------------|
| account          | String | Script hash of the account                       |
| scopes           | Number | Effective range of the signature                 |
| allowedContracts | Array? | Signs array of the allowed contract scripts      |
| allowedGroups    | Array? | Signs public keys of the allowed contract groups |

###### Scopes

| Field | Description                                                                                            |
|:------|:-------------------------------------------------------------------------------------------------------|
| 0     | The signature is used for transactions only, and is disabled in contracts                              |
| 1     | The signature is only effective to the contract script called by Entry                                 |
| 16    | The signature is only effective to the specified contract script                                       |
| 32    | The signature is effective to contracts in the group.                                                  |
| 128   | The signature is globally effective. It is the default value of Neo Legacy and is backward compatible. |

##### Success Response

In the case where the "broadcastOverride" input argument is not set, or set to false.

| Parameter | Type   | Description                                                                   |
|:----------|:-------|:------------------------------------------------------------------------------|
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| nodeURL   | String | The node to which the transaction was submitted to                            |

<aside class="warning">
It is recommended that the DAPP take appropriate levels of risk prevention when accepting transactions. The dapp can query the mempool of a known node to ensure that the transaction will indeed be broadcast on the network.
</aside>

In the case where the "broadcastOverride" input argument is set to True.

| Parameter | Type   | Description                                                                   |
|:----------|:-------|:------------------------------------------------------------------------------|
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| signedTx  | String | The serialized signed transaction                                             |

###### Set script transaction attribute 0x20 according to the following conditions:

- If triggerContractVerification is set to true, set 0x20 to scriptHash of the contract being invoked
- If there is no fee, attachedAssets, or 'assetIntentOverrides', set 0x20 to the users address
- If there are assetIntentOverrides but none of the inputs belong to the user address, set 0x20 to user address

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### invokeMulti

```typescript
neoN3Dapi.invokeMulti({
  invokeArgs: [
    {
      scriptHash: "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      operation: "transfer",
      args: [
        {
          type: "Address",
          value: "NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM"
        },
        {
          type: "Address",
          value: "NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ"
        },
        {
          type: "Integer",
          value: "1"
        },
        {
          type: "String",
          value: "NEO"
        }
      ]
    },
    {
      scriptHash: "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      operation: "transfer",
      args: [
        {
          type: "Address",
          value: "NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM"
        },
        {
          type: "Address",
          value: "NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ"
        },
        {
          type: "Integer",
          value: "2"
        },
        {
          type: "String",
          value: "NEO"
        }
      ]
    }
  ],
  signers: [
    {
      account: "0x85afbd7dcaa61d4ff1009912856abede476061db",
      scopes: 128
    }
  ],
  fee: "0.11",
  network: "N3TestNet",
  broadcastOverride: false
}
)
.then(({txid, nodeUrl}: InvokeOutput) => {
  console.log('Invoke transaction success!');
  console.log('Transaction ID: ' + txid);
  console.log('RPC node URL: ' + nodeUrl);
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case NO_PROVIDER:
      console.log('No provider available.');
      break;
    case RPC_ERROR:
      console.log('There was an error when broadcasting this transaction to the network.');
      break;
    case CANCELED:
      console.log('The user has canceled this transaction.');
      break;
  }
});
```

> Example Response

```typescript
{
  txid: 'ed54fb38dff371be6e3f96e4880405758c07fe6dd1295eb136fe15f311e9ff77',
  nodeUrl: 'https://neo3-testnet.o3node.org',
}:
```

Invoke Multi functions the same as Invoke, but accepts inputs to execute multiple invokes in the same transaction.

##### Input arguments

| Parameter            | Type                 | Description                                                                                                                                        |
|:---------------------|:---------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------|
| fee                  | String?              | If a fee is specified then the wallet SHOULD NOT override it, if a fee is not specified the wallet SHOULD allow the user to attach an optional fee |
| network              | String               | Network alias to submit this request to.                                                                                                           |
| invokeArgs           | InvokeArguments[]    | Array of contract invoke inputs                                                                                                                    |
| broadcastOverride    | Boolean?             | If this flag is set to True, the wallet provider will return the signed transaction rather than broadcasting to a node.                            |
| signers           | Signers[]  | Sender and the effective scope of signature                                                                                                        |

###### InvokeArguments

| Parameter                   | Type            | Description                                                                                                      |
|:----------------------------|:----------------|:-----------------------------------------------------------------------------------------------------------------|
| scriptHash                  | String          | The script hash of the contract that you wish to invoke                                                          |
| operation                   | String          | The operation on the smart contract that you wish to call. This can be fetched from the contract ABI             |
| args                        | Argument[]      | A list of arguments necessary to perform on the operation you wish to call                                       |

###### Argument

| Parameter | Type   | Description                                               |
|:----------|:-------|:----------------------------------------------------------|
| type      | String | The type of the argument with you are using               |
| value     | String | String representation of the argument which you are using |

<aside class =notice>
Available types are "String"|"Boolean"|"Hash160"|"Hash256"|"Integer"|"ByteArray"|"Array"|"Address"
</aside>

###### Signers

| Parameter        | Type   | Description                                      |
|:-----------------|:-------|:-------------------------------------------------|
| account          | String | Script hash of the account                       |
| scopes           | Number | Effective range of the signature                 |
| allowedContracts | Array? | Signs array of the allowed contract scripts      |
| allowedGroups    | Array? | Signs public keys of the allowed contract groups |

###### Scopes

| Field | Description                                                                                            |
|:------|:-------------------------------------------------------------------------------------------------------|
| 0     | The signature is used for transactions only, and is disabled in contracts                              |
| 1     | The signature is only effective to the contract script called by Entry                                 |
| 16    | The signature is only effective to the specified contract script                                       |
| 32    | The signature is effective to contracts in the group.                                                  |
| 128   | The signature is globally effective. It is the default value of Neo Legacy and is backward compatible. |

##### Success Response

In the case where the "broadcastOverride" input argument is not set, or set to false.

| Parameter | Type   | Description                                                                   |
|:----------|:-------|:------------------------------------------------------------------------------|
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| nodeURL   | String | The node to which the transaction was submitted to                            |

<aside class="warning">
It is recommended that the DAPP take appropriate levels of risk prevention when accepting transactions. The dapp can query the mempool of a known node to ensure that the transaction will indeed be broadcast on the network.

dApp will be responsible for setting a network fee appropriate for the size of the transaction.
</aside>

In the case where the "broadcastOverride" input argument is set to True.

| Parameter | Type   | Description                                                                   |
|:----------|:-------|:------------------------------------------------------------------------------|
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| signedTx  | String | The serialized signed transaction                                             |

###### Set script transaction attribute 0x20 according to the following conditions:

- If triggerContractVerification is set to true, set 0x20 to scriptHash of the contract being invoked
- If there is no fee, attachedAssets, or 'assetIntentOverrides', set 0x20 to the users address
- If there are assetIntentOverrides but none of the inputs belong to the user address, set 0x20 to user address

##### Error Response

| Parameter   | Type    | Description                                  |
|:------------|:--------|:---------------------------------------------|
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### signMessage

```typescript
neoN3Dapi.signMessage({
  message: 'Here is a message',
})
.then((signedMessage: SignedMessage) => {
  const {
    publicKey,
    message,
    salt,
    data,
  } = signedMessage;

  console.log('Public key used to sign:', publicKey);
  console.log('Original message:', message);
  console.log('Salt added to message:', salt);
  console.log('Signed data:', data);
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case UNKNOWN_ERROR:
      console.log(description);
      break;
  }
});
```

> Example Response

```typescript
{
  publicKey: '027b18c5aaae6a66ce8ab1a41f0ea0db4ec5bb5d6501d51c86cc994aca5275a461',
  data: '7249925b8813e21fdfdd8c08d6b6c45c49c813e59c9cf64eec9a2d1b096c85baa874fb0b6eefc3f6c553a0b4f95c8c651607a7a416986c216f7175f45956d522',
  salt: '15c06345eebb49cdbc14421e03491951',
  message: 'Here is a message',
}
```

Signs a provided messaged with an account selected by user. A salt prefix is added to the input string, and provided as a part of the data while signing. In the example, the signed value would be `15c06345eebb49cdbc14421e03491951Here is a message`.

##### Input Arguments

| Parameter | Type   | Description         |
|:----------|:-------|:--------------------|
| message   | String | The message to sign |

##### Success Response

| Parameter | Type   | Description                                                  |
|:----------|:-------|:-------------------------------------------------------------|
| publicKey | String | The public key used to sign message                          |
| data      | String | The signed data                                              |
| salt      | String | The salt prefix added to the original message before signing |
| message   | String | The original message                                         |

##### Error Response

| Parameter   | Type    | Description                                   |
|:------------|:--------|:----------------------------------------------|
| type        | String  | The type of error which has occurred          |
| description | String  | A description of the error which has occurred |
| data        | String? | Any raw data associated with the error        |

<!-- ### deploy

```typescript
neoN3Dapi.deploy({
  network: 'PrivateNet',
  name: 'Hello world!',
  version: 'v0.0.1',
  author: 'John Smith',
  email: 'info@o3.network',
  description: 'My first contract.',
  needsStorage: true,
  dynamicInvoke: false,
  isPayable: false,
  parameterList: '0710',
  returnType: '05',
  code: '53c56b0d57616b652075702c204e454f21680f4e656f2e52756e74696d652e4c6f6761006c7566',
  networkFee: '0.001',
})
.then(({txid, nodeUrl}: InvokeOutput) => {
  console.log('Deploy transaction success!');
  console.log('Transaction ID: ' + txid);
  console.log('RPC node URL: ' + nodeUrl);
})
.catch(({type: string, description: string, data: any}) => {
  switch(type) {
    case UNKNOWN_ERROR:
      console.log(description);
      break;
  }
});
```

> Example Response

```typescript
{
  txid: 'ed54fb38dff371be6e3f96e4880405758c07fe6dd1295eb136fe15f311e9ff77',
  nodeUrl: 'https://neo3-testnet.o3node.org',
}:
```

Will deploy a compiled smart contract to the blockchain with the provided input parameters. The GAS cost for deploying the contract will be calculated by the provider, and displayed to the user upon tx acceptance or rejection.

##### Input Arguments

| Parameter         | Type     | Description                                                                                                             |
|:------------------|:---------|:------------------------------------------------------------------------------------------------------------------------|
| network           | String   | Network alias to submit this request to.                                                                                |
| name              | String   | The name of the contract to be deployed                                                                                 |
| version           | String   | The version of the contract to be deployed                                                                              |
| author            | String   | The author of the contract to be deployed                                                                               |
| email             | String   | The email of the contract to be deployed                                                                                |
| description       | String   | The description of the contract to be deployed                                                                          |
| needsStorage      | Boolean  | Whether or not the contract will use storage                                                                            |
| dynamicInvoke     | Boolean  | Whether or not the contract will be performing dynamic invocations of other smart contracts                             |
| isPayable         | Boolean  | Whether or not the contract will be able to accept native assets                                                        |
| parameterList     | String   | The list of input argument types for the Main function on the contract. https://docs.neo.org/en-us/sc/Parameter.html    |
| returnType        | String   | The list of output returnType argument types. https://docs.neo.org/en-us/sc/Parameter.html                              |
| code              | String   | The hex of the compiled smart contract avm                                                                              |
| netowrkFee        | String   | The network fee to execute the transaction, in addition to the deploy fee which will be added automatically             |
| broadcastOverride | Boolean? | If this flag is set to True, the wallet provider will return the signed transaction rather than broadcasting to a node. |

##### Success Response

In the case where the "broadcastOverride" input argument is not set, or set to false.

| Parameter | Type   | Description                                                                   |
|:----------|:-------|:------------------------------------------------------------------------------|
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| nodeURL   | String | The node to which the transaction was submitted to                            |

<aside class="warning">
It is recommended that the DAPP take appropriate levels of risk prevention when accepting transactions. The dapp can query the mempool of a known node to ensure that the transaction will indeed be broadcast on the network.
</aside>

In the case where the "broadcastOverride" input argument is set to True.

| Parameter | Type   | Description                                                                   |
|:----------|:-------|:------------------------------------------------------------------------------|
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| signedTx  | String | The serialized signed transaction                                             |

##### Error Response

| Parameter   | Type    | Description                                   |     |
|:------------|:--------|:----------------------------------------------|-----|
| type        | String  | The type of error which has occurred          |     |
| description | String  | A description of the error which has occurred |     |
| data        | String? | Any raw data associated with the error        | --> |

## Event Methods

### addEventListener

```typescript
neoN3Dapi.addEventListener(neoN3Dapi.Constants.EventName.ACCOUNT_CHANGED, data => {
  console.log(`Connected Account: ${data.address}`);
});
```

Method is used to add a callback method to be triggered on a specified event.

### removeEventListener

```typescript
neoN3Dapi.removeEventListener(neoN3Dapi.Constants.EventName.ACCOUNT_CHANGED);
```

Method is to remove existing callback event listeners.

## Events

Events are a way for the wallet to asynchronously with the DAPP when certain changes occur to the state of the wallet that might be relevant for the

### READY

On a READY event, the callback will fire with a single argument with information about the wallet provider. At any time a READY event listener is added, it will immidiately be called if the provider is already in a ready state. This provides a single flow for dapp developers since this listener should start any and all interactions with the dapi protocol.

| Parameter     | Type     | Description                                                      |
|:--------------|:---------|:-----------------------------------------------------------------|
| name          | String   | The name of the wallet provider                                  |
| website       | String   | The website of the wallet provider                               |
| version       | String   | The version of the dAPI that the the wallet supports             |
| compatibility | String[] | A list of all applicable NEPs which the wallet provider supports |
| extra         | Object   | Provider specific attributes                                     |

###### extra

| Parameter | Type   | Description              |
|-----------|--------|--------------------------|
| theme     | string | UI theme of the provider |

### ACCOUNT_CHANGED

On a ACCOUNT_CHANGED event, the callback will fire with a single argument of the new account. This occurs when an account is already connected to the dapp, and the user has changed the connected account from the dapi provider side.

| Parameter | Type   | Description                                        |
|:----------|:-------|:---------------------------------------------------|
| address   | String | Address of the new account                         |
| label     | String | A label the users has set to identify their wallet |

### CONNECTED

On a CONNECTED event, the user has approved the connection of the dapp with one of their accounts. This will fire the first time any of one of the following methods are called from the dapp: `getAccount`, `invoke`, `send`.

| Parameter | Type   | Description                                        |
|:----------|:-------|:---------------------------------------------------|
| address   | String | Address of the new account                         |
| label     | String | A label the users has set to identify their wallet |

### DISCONNECTED

On a DISCONNECTED event, the account connected to the dapp via the dapi provider has been disconnected (logged out).

### NETWORK_CHANGED

On a NETWORK_CHANGED event, the user has changed the network their provider wallet is connected to. The event will return the updated network details.

| Parameter      | Type     | Description                                                        |
|:---------------|:---------|:-------------------------------------------------------------------|
| networks       | String[] | A list of all networks which this wallet provider allows access to |
| defaultNetwork | String   | Network the wallet is currently set to                             |

### BLOCK_HEIGHT_CHANGED

On a BLOCK_HEIGHT_CHANGED event, the block has advanced to the next.

| Parameter   | Type     | Description                                       |
|:------------|:---------|:--------------------------------------------------|
| network     | String   | Network of the block which changed                |
| blockHeight | Number   | Height of the new block                           |
| blockTime   | Number   | Timestamp of the new block                        |
| blockHash   | String   | Hash of the new block                             |
| tx          | String[] | List of transaction ids executed in the new block |

### TRANSACTION_CONFIRMED

On a TRANSACTION_CONFIRMED event, a previously broadcast transaction via the dapi has been confirmed by the blockchain.

| Parameter   | Type   | Description                                 |
|:------------|:-------|:--------------------------------------------|
| txid        | String | Transaction id which was confirmed on chain |
| blockHeight | Number | Height of the new block                     |
| blockTime   | Number | Timestamp of the new block                  |

## Errors

The NEO N3 dAPI will provide these basic errors. It is up to the wallet provider to provide additional information if they choose:

| Error Type         | Meaning                                                                     |
|--------------------|-----------------------------------------------------------------------------|
| NO_PROVIDER        | Could not find an instance of the dAPI in the webpage                       |
| CONNECTION_DENIED  | The dAPI provider refused to process this request                           |
| RPC_ERROR          | An RPC error occured when submitting the request                            |
| MALFORMED_INPUT    | An input such as the address is not a valid NEO address                     |
| CANCELED           | The user cancels, or refuses the dapps request                              |
| INSUFFICIENT_FUNDS | The user does not have a sufficient balance to perform the requested action |

## Utils

These are a collection of commonly used utilities for parsing responses from smart contracts.

### hex2str

```typescript
const hex2strInput = '68656c6c6f';
const hex2strExpected = 'hello';

const hex2strResult = neoN3Dapi.utils.hex2str(hex2strInput);

console.log('hex2str', hex2strExpected === hex2strResult);
```

Converts a hex string to a string.

### str2hex

```typescript
const str2hexInput = 'hello';
const str2hexExpected = '68656c6c6f';

const str2hexResult = neoN3Dapi.utils.str2hex(str2hexInput);

console.log('str2hex', str2hexExpected === str2hexResult);
```

Converts a string to a hex string.

### hex2int

```typescript
const hex2intInput = '00e1f505';
const hex2intExpected = 100000000;

const hex2intResult = neoN3Dapi.utils.hex2int(hex2intInput);

console.log('hex2int', hex2intExpected === hex2intResult);
```

Converts a hex string to an integer.

### int2hex

```typescript
const int2hexInput = 100000000;
const int2hexExpected = '00e1f505';

const int2hexResult = neoN3Dapi.utils.int2hex(int2hexInput);

console.log('int2hex', int2hexExpected === int2hexResult);
```

Converts an integer to a hex string.

### reverseHex

```typescript
const reverseHexInput = 'bc99b2a477e28581b2fd04249ba27599ebd736d3';
const reverseHexExpected = 'd336d7eb9975a29b2404fdb28185e277a4b299bc';
const reverseHexResult = neoN3Dapi.utils.reverseHex(reverseHexInput);

console.log('reverseHex', reverseHexExpected === reverseHexResult);
```

Converts the endian of a hex string, big to little, or little to big.

<!-- ### address2scriptHash

```typescript
const address2scriptHashInput = 'Ab2fvZdmnM4HwDgVbdBrbTLz1wK5TcEyhU';
const address2scriptHashExpected = 'd336d7eb9975a29b2404fdb28185e277a4b299bc';

const address2scriptHashResult = neoN3Dapi.utils.address2scriptHash(address2scriptHashInput);

console.log('address2scriptHash', address2scriptHashExpected === address2scriptHashResult);
```

Converts an address to a script hash.

### scriptHash2address

```typescript
const scriptHash2addressInput = 'd336d7eb9975a29b2404fdb28185e277a4b299bc';
const scriptHash2addressExpected = 'Ab2fvZdmnM4HwDgVbdBrbTLz1wK5TcEyhU';

const scriptHash2addressResult = neoN3Dapi.utils.scriptHash2address(scriptHash2addressInput);

console.log('scriptHash2address', scriptHash2addressExpected === scriptHash2addressResult);
```

Converts a script hash to an address. -->
