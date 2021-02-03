# API Methods

## Read Methods

Read methods do not alter the state of the blockchain. It can help you query information about your user, and provide you with relevant information:

### getProvider

```typescript
neoDapi.getProvider()
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
    'NEP-14',
    'NEP-23',
    'NEP-29'
  ],
  extra: {
    theme: 'Dark Mode',
    currency: 'USD',
  }
}
```

Returns information about the dAPI provider, including who this provider is, the version of their dAPI, and the NEP that the interface is compatible with.

##### Input Arguments

None

##### Success Response
| Parameter     | Type     | Description                                                      |
|:------------- |:-------- |:---------------------------------------------------------------- |
| name          | String   | The name of the wallet provider                                  |
| website       | String   | The website of the wallet provider                               |
| version       | String   | The version of the dAPI that the the wallet supports             |
| compatibility | String[] | A list of all applicable NEPs which the wallet provider supports |
| extra         | Object   | Provider specific attributes                                     |

###### extra
| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| theme     | string | UI theme of the provider  |
| currency  | string | Base currency set by user |

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getNetworks

```typescript
dapi.NEO.getNetworks()
.then(response => {
  const {
    networks,
    defaultNetwork,
  } = response.networks;

  console.log('Networks: ' + networks);
  // eg. ["MainNet", "TestNet", "PrivateNet"]

  console.log('Default network: ' + defaultNetwork);
  // eg. "MainNet"
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
  networks: ["MainNet", "TestNet", "PrivateNet"],
  defaultNetwork: "TestNet",
}
```

Returns the networks the wallet provider has available to connect to, along with the default network the wallet is currently set to.

##### Input Arguments

None

##### Success Response

| Parameter      | Type     | Description                                                        |
|:-------------- |:-------- |:------------------------------------------------------------------ |
| networks       | String[] | A list of all networks which this wallet provider allows access to |
| defaultNetwork | String   | Network the wallet is currently set to                             |

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


### getAccount

```typescript
neoDapi.getAccount()
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
  address: 'AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru',
  label: 'My Spending Wallet'
}
```

Return the Account that is currently connected to the dApp.

##### Success Response
| Parameter | Type   | Description                                                        |
|:--------- |:------ |:------------------------------------------------------------------ |
| address   | String | The address of the account that is currently connected to the dapp |
| label     | String | A label the users has set to identify their wallet                 |

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


### getPublicKey

```typescript
neoDapi.getPublicKey()
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
  address: 'ATUaTd3LA4kZiyB6it9fdb5oJpZYMBF4DX',
  publicKey: '03fa41b6ff75ebeff8464556629cfceae7402f5d815626a7a6542f786974b942e0'
}
```

Return the public key of the Account that is currently connected to the dApp.

##### Success Response
| Parameter | Type   | Description                                                           |
|:--------- |:------ |:--------------------------------------------------------------------- |
| address   | String | The address of the account that is currently connected to the dapp    |
| publicKey | String | The public key of the account that is currently connected to the dapp |

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


### getBalance

```typescript
neoDapi.getBalance({
  params: {
    address: 'AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru',
    assets: ['NKN']
  },
  network: 'MainNet',
})
.then((results: BalanceResults) => {
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

> Single Address with specific balances requested

```typescript
// input
{
  params: {
    address: 'AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru',
    assets: ['NKN']
  },
  network: 'MainNet',
}

// output
{
  AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru: [
    {
      assetID: 'c36aee199dbba6c3f439983657558cfb67629599',
      symbol: 'NKN',
      amount: '0.00000233',
    }
  ],
}
```

> Single Address with all balances requested

```typescript
// input
{
  params: {
    address: 'AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru',
  },
  network: 'MainNet',
}

// output
{
  AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru: [
    {
      assetID: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
      symbol: 'NEO',
      amount: '10',
    },
    {
      assetID: '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
      symbol: 'GAS',
      amount: '777.0001',
    },
    {
      assetID: 'c36aee199dbba6c3f439983657558cfb67629599',
      symbol: 'NKN',
      amount: '0.00000233',
    },
    {
      assetID: 'fc732edee1efdf968c23c20a9628eaa5a6ccb934',
      symbol: 'NNC',
      amount: '2000',
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
      address: 'AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru',
    },
    {
      address: 'AbKNY45nRDy6B65YPVz1B6YXiTnzRqU2uQ',
      assets: ['PHX'],
    },
  ],
  network: 'MainNet',
}

// output
{
  AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru: [
    {
      assetID: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
      symbol: 'NEO',
      amount: '10',
    },
    {
      assetID: '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
      symbol: 'GAS',
      amount: '777.0001',
    },
    {
      assetID: 'c36aee199dbba6c3f439983657558cfb67629599',
      symbol: 'NKN',
      amount: '0.00000233',
    },
    {
      assetID: 'fc732edee1efdf968c23c20a9628eaa5a6ccb934',
      symbol: 'NNC',
      amount: '2000',
    }
  ],
  AbKNY45nRDy6B65YPVz1B6YXiTnzRqU2uQ: [
    {
      assetID: '1578103c13e39df15d0d29826d957e85d770d8c9',
      symbol: 'PHX',
      amount: '11000',
    }
  ]
}
```


Allows the DAPP to query the balance of a user, this includes both native assets (NEO/GAS) and NEP-5 tokens

##### Input Arguments
| Parameter | Type                               | Description                                                                              |
|:--------- |:---------------------------------- |:---------------------------------------------------------------------------------------- |
| params    | BalanceRequest or BalanceRequest[] | A list of Balance Request Objects, specifying which addresses, and which assets to query |
| network   | String                             | The call will only work for the networks available in the GetNetworks command            |

###### Balance Request
| Parameter  | Type     | Description                                                                   |
|:---------- |:-------- |:----------------------------------------------------------------------------- |
| address    | String   | The address whose balance you want to query                                   |
| assets     | String[] | A list of contract hash (or symbold on MainNet only) to query the balance for |
| fetchUTXO? | boolean  | The response will fetch NEO and GAS UTXO's if this attribute is true          |

##### Success Response
| Parameter | Type              | Description                                                                          |
|:--------- |:----------------- |:------------------------------------------------------------------------------------ |
| address_1 | BalanceResponse[] | This key is the actual address of the query eg. "AeysVbKWiLSuSDhg7DTzUdDyYYKfgjojru" |
| address_2 | BalanceResponse[] | This key is the actual address of the query eg. "AbKNY45nRDy6B65YPVz1B6YXiTnzRqU2uQ" |
| address_n | BalanceResponse[] | This key is the actual address of the query eg. "AUdawyrLMskxXMUE8osX9mSLKz8R7777kE" |

<aside class="notice">
The amount of addresses is n where n is the number of addresses specified in your query
</aside>


###### BalanceResponse
| Parameter | Type    | Description                                                                                          |
|:--------- |:------- |:---------------------------------------------------------------------------------------------------- |
| assetID   | String  | ID of the given asset                                                                                |
| symbol    | String  | Symbol of the given asset                                                                            |
| amount    | String  | Double Value of the balance represented as a String                                                  |
| unspent   | UTXO[]? | If fetch utxo's was turned on then the utxo array will be returned for the native assets NEO and GAS |

###### UTXO
| Parameter      | Type   | Description                                                           |
|:-------------- |:------ |:--------------------------------------------------------------------- |
| asset          | String | Script hash of the native asset                                       |
| createdAtBlock | String | Block number where this utxo was created                              |
| index          | Int    | Output index of the UTXO relative to the txid in which it was created |
| txid           | String | The transaction id of this UTXO                                       |
| value          | String | The double value of this UTXO represented as a String                 |


### getStorage

```typescript
neoDapi.getStorage({
  scriptHash: '505663a29d83663a838eee091249abd167e928f5',
  key: 'game.status',
  network: 'TestNet'
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
  result: 'hello world'
}
```


Returns the raw value located in contract storage

##### Input Arguments
| Parameter  | Type   | Description                                                  |
|:---------- |:------ |:------------------------------------------------------------ |
| scriptHash | String | Scripthash of the contract whose storage you are querying on |
| key        | String | Key of the storage value to retrieve from the contract       |
| network    | String | Network alias to submit this request to.                     |

##### Success Response
| Parameter | Type   | Description                               |
|:--------- |:------ |:----------------------------------------- |
| result    | String | The raw value located in contract storage |

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### invokeRead

```typescript
neoDapi.invokeRead({
  scriptHash: '505663a29d83663a838eee091249abd167e928f5',
  operation: 'calculatorAdd',
  args: [
    {
      type: neoDapi.Constants.ArgumentDataType.INTEGER,
      value: 2
    },
    {
      type: neoDapi.Constants.ArgumentDataType.INTEGER,
      value: 10
    }
  ],
  network: 'PrivNet'
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
  script: '8h89fh398f42f.....89hf2894hf9834',
  state: 'HALT, BREAK',
  gas_consumed: '0.13',
  stack: [
    {
      type: 'Integer',
      value: '1337'
    }
  ]
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments
| Parameter  | Type       | Description                                                                                              |
|:---------- |:---------- |:-------------------------------------------------------------------------------------------------------- |
| scriptHash | String     | The script hash of the contract you want to invoke a read on                                             |
| operation  | String     | The operation on the smart contract that you want to invoke a read on                                    |
| args       | Argument[] | The input arguments necessary to perform this operation                                                  |
| network    | String     | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

###### Argument
| Parameter | Type   | Description                                               |
|:--------- |:------ |:--------------------------------------------------------- |
| type      | String | The type of the argument with you are using               |
| value     | String | String representation of the argument which you are using |

<aside class =notice>
Available types are "String"|"Boolean"|"Hash160"|"Hash256"|"Integer"|"ByteArray"|"Array"|"Address"
</aside>

##### Success Response
The wallet will return the direct response from the RPC node.

| Parameter    | Type       | Description                                                                                   |
|:------------ |:---------- |:--------------------------------------------------------------------------------------------- |
| script       | String     | The script which was run                                                                      |
| state        | String     | Status of the executeion                                                                      |
| gas_consumed | String     | Estimated amount of GAS to be used to execute the invocation. (Up to 10 free per transaction) |
| stack        | Argument[] | An array of response arguments                                                                |

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


### verifyMessage

```typescript
neoDapi.verifyMessage({
  message: '058b9e03e7154e4db1e489c99256b7faHello World!',
  data: '0147fb89d0999e9d8a90edacfa26152fe695ec8b3770dcad522048297ab903822e12472364e254ff2e088fc3ebb641cc24722c563ff679bb1d1623d08bd5863d0d',
  publicKey: '0241392007396d6ef96159f047967c5a61f1af0871ecf9dc82afbedb68afbb949a',
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
|:--------- |:------ |:------------------------------------------------------ |
| message   | String | The original signed message                            |
| data      | String | The signature data                                     |
| publicKey | String | The public key of the account used to sign the message |

##### Success Response

| Parameter | Type    | Description                                                                |
|:--------- |:------- |:-------------------------------------------------------------------------- |
| result    | Boolean | Whether the provided signature matches the provided message and public key |

##### Error Response
| Parameter   | Type    | Description                                   |
|:----------- |:------- |:--------------------------------------------- |
| type        | String  | The type of error which has occurred          |
| description | String  | A description of the error which has occurred |
| data        | String? | Any raw data associated with the error        |

### getBlock

```typescript
neoDapi.getBlock({
  blockHeight: 2619690,
  network: 'TestNet'
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
  "hash": "0xc1668a114ee680597196ed402a0e0507fd8348e6090a54250d7accfadbd74b6e",
  "size": 686,
  "version": 0,
  "previousblockhash": "0xbae289c94e17ae90022673186fd6e1e48b7dd7afb89319bff0e2832db06d16b3",
  "merkleroot": "0x07d70f7337d3869a7daa538425d78a47212fb8c6130d66d84ac48526853a4e51",
  "time": 1557376153,
  "index": 2619690,
  "nonce": "8efd62ebb85ee68b",
  "nextconsensus": "AWZo4qAxhT8fwKL93QATSjCYCgHmCY1XLB",
  "script": {
    "invocation": "402a1dab9e5593d1d7d2a22a36772d4541b8053d33f8b8474b7d5a20066c1bd821e051fc252ed16146930d55ecb17fbb74972fba4c4b27af81a707999ca1313dd2401520eba2dd3b54a74a798cbb716c484ba6f6f21218f099e3d622a0fbd15989f38f9b0b344daf9b89175055d3a92f49df65118e8598735d651bedd4f1811baeb140e6491c03f3057f404d2fe7db50e40e82ade405a9dc7fccd81f4ba0b499a4a29f8570d631b8d40c5995b17d9391fe9ff8c73f28a4e1eb922b7a1ce9d1a5dc0448402cfcdede54828875d45402120aa2d8f78c7bd40df5e5d3b1873fd7e4d03672ebd0904f90c90fa519c623968f55550ae55374de66dc0db9c9d865c593bb95be5640214db0cd3cea6f4ad866df4129d482b89583805d1bdb08ce8399881e70351778a3e4a4093cf69aa7b99b83347fbfd38d85ff45d6a78ca2ab8cacffbfbc8c2d16",
    "verification": "5521030ef96257401b803da5dd201233e2be828795672b775dd674d69df83f7aec1e36210327da12b5c40200e9f65569476bbff2218da4f32548ff43b6387ec1416a231ee821025bdf3f181f53e9696227843950deb72dcd374ded17c057159513c3d0abe20b64210266b588e350ab63b850e55dbfed0feeda44410a30966341b371014b803a15af0721026ce35b29147ad09e4afe4ec4a7319095f08198fa8babbe3c56e970b143528d222103c089d7122b840a4935234e82e26ae5efd0c2acb627239dc9f207311337b6f2c12103fd95a9cb3098e6447d0de9f76cc97fd5e36830f9c7044457c15a0e81316bf28f57ae"
  },
  "tx": [
    {
      "txid": "0x07d70f7337d3869a7daa538425d78a47212fb8c6130d66d84ac48526853a4e51",
      "size": 10,
      "type": "MinerTransaction",
      "version": 0,
      "attributes": [],
      "vin": [],
      "vout": [],
      "sys_fee": "0",
      "net_fee": "0",
      "scripts": [],
      "nonce": 3093227147
    }
  ],
  "confirmations": 70,
  "nextblockhash": "0x2c9d6a107b21e83e09dd1b89df344a726895147d410120c46996290692ba29aa"
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments
| Parameter   | Type    | Description                                                                                              |
|:----------- |:------- |:-------------------------------------------------------------------------------------------------------- |
| blockHeight | integer | The height of the block you would like to get information about.                                         |
| network     | String  | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

##### Success Response
The wallet will return the direct response from the RPC node.

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


### getBlockHeight

```typescript
neoDapi.getBlockHeight({
  network: 'TestNet'
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
  "result": 2619690
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments
| Parameter | Type   | Description                                                                                              |
|:--------- |:------ |:-------------------------------------------------------------------------------------------------------- |
| network   | String | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

##### Success Response
| Parameter | Type   | Description                 |
|:--------- |:------ |:--------------------------- |
| result    | Number | Height of the current block |

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


### getTransaction

```typescript
neoDapi.getTransaction({
  txid: '7e049fd7c253dabf38e4156df30c78b30d49f307196aa89b99a47d2330789bf2',
  network: 'TestNet'
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
  "txid": "0x7e049fd7c253dabf38e4156df30c78b30d49f307196aa89b99a47d2330789bf2",
  "size": 556,
  "type": "InvocationTransaction",
  "version": 1,
  "attributes": [
    {
      "usage": "Script",
      "data": "296ac124021a71c449a9bad320c16429b08ad6ee"
    },
    {
      "usage": "Remark",
      "data": "cbb549adec34d741"
    }
  ],
  "vin": [],
  "vout": [],
  "sys_fee": "0",
  "net_fee": "0",
  "scripts": [
    {
      "invocation": "4072b83e8aca62c27dc36b032b895e757db00620384e26f43cd0ecc9904bff1e652dd94a03226d6dcb0b6f91104cb40be6455aa0fc3b474a8a8e5fa43ff4b10b8d40af726dc0976f15cd8a134634074c5613ab1e59979fec37b611392975c92afa11038fd9d96ddfb306df12ae200dc3c15fa17cb9530389e28f090fd8c9721c3307",
      "verification": "53c56b6c766b00527ac46c766b51527ac4616c766b00c36121022949376faacb0c6783da8ab63548926cb3a2e8d786063a449833f927fa8853f0ac642f006c766b51c361210292a25f5f0772d73d3fb50d42bb3cb443505b15e106789d19efa4d09c5ddca756ac635f006c766b00c361210292a25f5f0772d73d3fb50d42bb3cb443505b15e106789d19efa4d09c5ddca756ac642f006c766b51c36121022949376faacb0c6783da8ab63548926cb3a2e8d786063a449833f927fa8853f0ac62040000620400516c766b52527ac46203006c766b52c3616c7566"
    }
  ],
  "script": "0400e1f505147869ef9732cdf6f6d54adaa5cae3b55a9396bceb14296ac124021a71c449a9bad320c16429b08ad6ee53c1087472616e7366657267f1dfcf0051ec48ec95c8d0569e0b95075d099d84f10400e1f50514b1fdddf658ce5ff9f83e66ede2f333ecfcc0463e14296ac124021a71c449a9bad320c16429b08ad6ee53c1087472616e7366657267f1dfcf0051ec48ec95c8d0569e0b95075d099d84f1",
  "gas": "0",
  "blockhash": "0x4ea57fe267a392933d2b03fa733fbf1fa12c13f7e8ae2051e45465800e1a7cdb",
  "confirmations": 9,
  "blocktime": 1557377749
}
```

Execute a contract invocation in read-only mode.

##### Input Arguments
| Parameter | Type   | Description                                                                                              |
|:--------- |:------ |:-------------------------------------------------------------------------------------------------------- |
| txid      | String | The id of the transaction you would like to get information about.                                       |
| network   | String | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

##### Success Response
The wallet will return the direct response from the RPC node.

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### getApplicationLog

```typescript
neoDapi.getApplicationLog({
  txid: '7e049fd7c253dabf38e4156df30c78b30d49f307196aa89b99a47d2330789bf2',
  network: 'TestNet'
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
  "txid": "0x7e049fd7c253dabf38e4156df30c78b30d49f307196aa89b99a47d2330789bf2",
  "executions": [
    {
      "trigger": "Application",
      "contract": "0x72985e7f2cea98b89af54d8607bc6400814c4b45",
      "vmstate": "HALT",
      "gas_consumed": "5.292",
      "stack": [],
      "notifications": [
        {
          "contract": "0x849d095d07950b9e56d0c895ec48ec5100cfdff1",
          "state": {
            "type": "Array",
            "value": [
              {
                "type": "ByteArray",
                "value": "7472616e73666572"
              },
              {
                "type": "ByteArray",
                "value": "296ac124021a71c449a9bad320c16429b08ad6ee"
              },
              {
                "type": "ByteArray",
                "value": "7869ef9732cdf6f6d54adaa5cae3b55a9396bceb"
              },
              {
                "type": "ByteArray",
                "value": "00e1f505"
              }
            ]
          }
        },
        {
          "contract": "0x849d095d07950b9e56d0c895ec48ec5100cfdff1",
          "state": {
            "type": "Array",
            "value": [
              {
                "type": "ByteArray",
                "value": "7472616e73666572"
              },
              {
                "type": "ByteArray",
                "value": "296ac124021a71c449a9bad320c16429b08ad6ee"
              },
              {
                "type": "ByteArray",
                "value": "b1fdddf658ce5ff9f83e66ede2f333ecfcc0463e"
              },
              {
                "type": "ByteArray",
                "value": "00e1f505"
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
|:--------- |:------ |:-------------------------------------------------------------------------------------------------------- |
| txid      | String | The id of the transaction you would like to get the application logs for.                                |
| network   | String | Network alias to submit this request to. If omitted, will default the network which the wallet is set to |

##### Success Response
The wallet will return the direct response from the RPC node.

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

## Write Methods

Write methods will alter the state on the blockchain, and require a user signature.

### send

```typescript
neoDapi.send({
  fromAddress: 'ATaWxfUAiBcQixNPq6TvKHEHPQum9bx79d',
  toAddress: 'ATaWxfUAiBcQixNPq6TvKHEHPQum9bx79d',
  asset: 'GAS',
  amount: '0.0001',
  remark: 'Hash puppy clothing purchase. Invoice#abc123',
  fee: '0.0001',
  network: 'MainNet',
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
  nodeUrl: 'http://seed7.ngd.network:10332',
}
```

The send API can be used for accepting payments from the user in a cryptocurrency that is located on the NEO blockchain. It requires user authentication in order for the transaction to be relayed. The transaction will be relayed by the wallet.

##### Input Arguments
| Parameter         | Type     | Description                                                                                                                                        |
|:----------------- |:-------- |:-------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromAddress       | String   | The address from where the transaction is being sent. This will be the same value as the one received from the getAccount API                      |
| toAddress         | String   | The address to where the user should send their funds                                                                                              |
| asset             | String   | The asset which is being requested for payment...e.g NEP5 scripHash, GAS or CGAS                                                                   |
| amount            | String   | The amount which is being requested for payment                                                                                                    |
| remark            | String?  | A transaction attribute remark which may be placed in the transaction, this data will appear in the transaction record on the blockchain           |
| fee               | String?  | If a fee is specified then the wallet SHOULD NOT override it, if a fee is not specified the wallet SHOULD allow the user to attach an optional fee |
| network           | String   | Network alias to submit this request to.                                                                                                           |
| broadcastOverride | Boolean? | If this flag is set to True, the wallet provider will return the signed transaction rather than broadcasting to a node.                            |

##### Success Response

In the case where the "broadcastOverride" input argument is not set, or set to false.

| Parameter | Type   | Description                                                                   |
|:--------- |:------ |:----------------------------------------------------------------------------- |
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| nodeURL   | String | The node to which the transaction was submitted to                            |

<aside class="warning">
It is recommended that the DAPP take appropriate levels of risk prevention when accepting transactions. The dapp can query the mempool of a known node to ensure that the transaction will indeed be broadcast on the network.
</aside>

In the case where the "broadcastOverride" input argument is set to True.

| Parameter | Type   | Description                                                                   |
|:--------- |:------ |:----------------------------------------------------------------------------- |
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| signedTx  | String | The serialized signed transaction                                             |


##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

### invoke
```typescript
neoDapi.invoke({
  scriptHash: '505663a29d83663a838eee091249abd167e928f5',
  operation: 'storeData',
  args: [
    {
      type: neoDapi.Constants.ArgumentDataType.STRING,
      value: 'hello'
    }
  ],
  attachedAssets: {
    NEO: '100',
    GAS: '0.0001',
  },
  fee: '0.001',
  network: 'TestNet',
  broadcastOverride: false,
  txHashAttributes: [
    {
      type: 'Boolean',
      value: true,
      txAttrUsage: 'Hash1'
    }
  ]
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
  nodeUrl: 'http://seed7.ngd.network:10332',
}:
```

Invoke allows for the generic execution of smart contracts on behalf of the user. It is recommended to have a general understanding of the NEO blockchain, and to be able successfully use all other commands listed previously in this document before attempting a generic contract execution.

##### Input arguments
| Parameter                   | Type                 | Description                                                                                                                                        |
|:--------------------------- |:-------------------- |:-------------------------------------------------------------------------------------------------------------------------------------------------- |
| scriptHash                  | String               | The script hash of the contract that you wish to invoke                                                                                            |
| operation                   | String               | The operation on the smart contract that you wish to call. This can be fetched from the contract ABI                                               |
| args                        | Argument[]           | A list of arguments necessary to perform on the operation you wish to call                                                                         |
| fee                         | String?              | If a fee is specified then the wallet SHOULD NOT override it, if a fee is not specified the wallet SHOULD allow the user to attach an optional fee |
| network                     | String               | Network alias to submit this request to.                                                                                                           |
| attachedAssets              | AttachedAssets?      | Describes the assets to attach with the smart contract, e.g. attaching assets to mint tokens during a token sale                                   |
| assetIntentOverrides        | AssetIntentOverrides | Used to specify the exact UTXO's to use for attached assets. If this is provided fee and attachedAssets will be ignored                            |
| triggerContractVerification | Boolean?             | Adds the instruction to invoke the contract verifican trigger                                                                                      |
| broadcastOverride           | Boolean?             | If this flag is set to True, the wallet provider will return the signed transaction rather than broadcasting to a node.                            |
| txHashAttributes            | TxHashAttribute[]?   | Optional list of tx attribute hash values to be added                                                                                              |

###### Argument
| Parameter | Type   | Description                                               |
|:--------- |:------ |:--------------------------------------------------------- |
| type      | String | The type of the argument with you are using               |
| value     | String | String representation of the argument which you are using |

<aside class =notice>
Available types are "String"|"Boolean"|"Hash160"|"Hash256"|"Integer"|"ByteArray"|"Array"|"Address"
</aside>

###### TxHashAttribute
| Parameter   | Type   | Description                                               |
|:----------- |:------ |:--------------------------------------------------------- |
| type        | String | The type of the argument with you are using               |
| value       | String | String representation of the argument which you are using |
| txAttrUsage | String | Attribute usage value                                     |

<aside class =notice>
Available txAttrUsages are Hash1'|'Hash2'|'Hash3'|'Hash4'|'Hash5'|'Hash6'|'Hash7'|'Hash8'|'Hash9'|'Hash10'|'Hash11'|'Hash12'|'Hash13'|'Hash14'|'Hash15'
</aside>

###### AttachedAssets
| Parameter | Type    | Description                                            |
|:--------- |:------- |:------------------------------------------------------ |
| NEO       | String? | The amount of NEO to attach to the contract invocation |
| GAS       | String? | The amount of GAS to attach to the contract invocation |

###### AssetIntentOverrides
| Parameter | Type          | Description                                        |
|:--------- |:------------- |:-------------------------------------------------- |
| inputs    | AssetInput[]  | A list of UTXO inputs to use for this transaction  |
| outputs   | AssetOutput[] | A list of UTXO outputs to use for this transaction |

###### AssetInput
| Parameter | Type   | Description                                              |
|:--------- |:------ |:-------------------------------------------------------- |
| txid      | String | Transaction id to be used as input                       |
| index     | String | Index of the UTXO, can be found from transaction details |

###### AssetOutput
| Parameter | Type   | Description                                                           |
|:--------- |:------ |:--------------------------------------------------------------------- |
| asset     | String | Asset of the UTXO                                                     |
| address   | String | Address to receive the UTXO                                           |
| value     | String | String representation of double or integer value to be used as output |


##### Success Response

In the case where the "broadcastOverride" input argument is not set, or set to false.

| Parameter | Type   | Description                                                                   |
|:--------- |:------ |:----------------------------------------------------------------------------- |
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| nodeURL   | String | The node to which the transaction was submitted to                            |

<aside class="warning">
It is recommended that the DAPP take appropriate levels of risk prevention when accepting transactions. The dapp can query the mempool of a known node to ensure that the transaction will indeed be broadcast on the network.
</aside>

In the case where the "broadcastOverride" input argument is set to True.

| Parameter | Type   | Description                                                                   |
|:--------- |:------ |:----------------------------------------------------------------------------- |
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| signedTx  | String | The serialized signed transaction                                             |

###### Set script transaction attribute 0x20 according to the following conditions:
- If triggerContractVerification is set to true, set 0x20 to scriptHash of the contract being invoked
- If there is no fee, attachedAssets, or 'assetIntentOverrides', set 0x20 to the users address
- If there are assetIntentOverrides but none of the inputs belong to the user address, set 0x20 to user address

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


### invokeMulti
```typescript
neoDapi.invokeMulti({
  invokeArgs: [
    {
      scriptHash: '505663a29d83663a838eee091249abd167e928f5',
      operation: 'storeData',
      args: [
        {
          type: neoDapi.Constants.ArgumentDataType.STRING,
          value: 'hello'
        }
      ],
      attachedAssets: {
        NEO: '100',
        GAS: '0.0001',
      },
      triggerContractVerification: true,
    },
    {
      scriptHash: '505663a29d83663a838eee091249abd167e928f5',
      operation: 'purchaseTicket',
      args: [
        {
          type: neoDapi.Constants.ArgumentDataType.INTEGER,
          value: '10'
        }
      ],
    }
  ],
  fee: '0.001',
  network: 'TestNet',
  broadcastOverride: false,
  txHashAttributes: [
    {
      type: neoDapi.Constants.ArgumentDataType.BOOLEAN,
      value: true,
      txAttrUsage: 'Hash1'
    }
  ]
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
  nodeUrl: 'http://seed7.ngd.network:10332',
}:
```

Invoke Multi functions the same as Invoke, but accepts inputs to execute multiple invokes in the same transaction.

##### Input arguments
| Parameter            | Type                 | Description                                                                                                                                        |
|:-------------------- |:-------------------- |:-------------------------------------------------------------------------------------------------------------------------------------------------- |
| fee                  | String?              | If a fee is specified then the wallet SHOULD NOT override it, if a fee is not specified the wallet SHOULD allow the user to attach an optional fee |
| network              | String               | Network alias to submit this request to.                                                                                                           |
| assetIntentOverrides | AssetIntentOverrides | Used to specify the exact UTXO's to use for attached assets. If this is provided fee and attachedAssets will be ignored                            |
| invokeArgs           | InvokeArguments[]    | Array of contract invoke inputs                                                                                                                    |
| broadcastOverride    | Boolean?             | If this flag is set to True, the wallet provider will return the signed transaction rather than broadcasting to a node.                            |
| txHashAttributes     | TxHashAttribute[]?   | Optional list of tx attribute hash values to be added                                                                                              |

###### InvokeArguments
| Parameter                   | Type            | Description                                                                                                      |
|:--------------------------- |:--------------- |:---------------------------------------------------------------------------------------------------------------- |
| scriptHash                  | String          | The script hash of the contract that you wish to invoke                                                          |
| operation                   | String          | The operation on the smart contract that you wish to call. This can be fetched from the contract ABI             |
| args                        | Argument[]      | A list of arguments necessary to perform on the operation you wish to call                                       |
| attachedAssets              | AttachedAssets? | Describes the assets to attach with the smart contract, e.g. attaching assets to mint tokens during a token sale |
| triggerContractVerification | Boolean?        | Adds the instruction to invoke the contract verifican trigger                                                    |

###### Argument
| Parameter | Type   | Description                                               |
|:--------- |:------ |:--------------------------------------------------------- |
| type      | String | The type of the argument with you are using               |
| value     | String | String representation of the argument which you are using |

<aside class =notice>
Available types are "String"|"Boolean"|"Hash160"|"Hash256"|"Integer"|"ByteArray"|"Array"|"Address"
</aside>

###### TxHashAttribute
| Parameter   | Type   | Description                                               |
|:----------- |:------ |:--------------------------------------------------------- |
| type        | String | The type of the argument with you are using               |
| value       | String | String representation of the argument which you are using |
| txAttrUsage | String | Attribute usage value                                     |

<aside class =notice>
Available txAttrUsages are Hash1'|'Hash2'|'Hash3'|'Hash4'|'Hash5'|'Hash6'|'Hash7'|'Hash8'|'Hash9'|'Hash10'|'Hash11'|'Hash12'|'Hash13'|'Hash14'|'Hash15'
</aside>

###### AttachedAssets
| Parameter | Type    | Description                                            |
|:--------- |:------- |:------------------------------------------------------ |
| NEO       | String? | The amount of NEO to attach to the contract invocation |
| GAS       | String? | The amount of GAS to attach to the contract invocation |

###### AssetIntentOverrides
| Parameter | Type          | Description                                        |
|:--------- |:------------- |:-------------------------------------------------- |
| inputs    | AssetInput[]  | A list of UTXO inputs to use for this transaction  |
| outputs   | AssetOutput[] | A list of UTXO outputs to use for this transaction |

###### AssetInput
| Parameter | Type   | Description                                              |
|:--------- |:------ |:-------------------------------------------------------- |
| txid      | String | Transaction id to be used as input                       |
| index     | String | Index of the UTXO, can be found from transaction details |

###### AssetOutput
| Parameter | Type   | Description                                                           |
|:--------- |:------ |:--------------------------------------------------------------------- |
| asset     | String | A list of UTXO inputs to use for this transaction                     |
| address   | String | A list of UTXO outputs to use for this transaction                    |
| value     | String | String representation of double or integer value to be used as output |


##### Success Response

In the case where the "broadcastOverride" input argument is not set, or set to false.

| Parameter | Type   | Description                                                                   |
|:--------- |:------ |:----------------------------------------------------------------------------- |
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| nodeURL   | String | The node to which the transaction was submitted to                            |

<aside class="warning">
It is recommended that the DAPP take appropriate levels of risk prevention when accepting transactions. The dapp can query the mempool of a known node to ensure that the transaction will indeed be broadcast on the network.

dApp will be responsible for setting a network fee appropriate for the size of the transaction.
</aside>

In the case where the "broadcastOverride" input argument is set to True.

| Parameter | Type   | Description                                                                   |
|:--------- |:------ |:----------------------------------------------------------------------------- |
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| signedTx  | String | The serialized signed transaction                                             |

###### Set script transaction attribute 0x20 according to the following conditions:
- If triggerContractVerification is set to true, set 0x20 to scriptHash of the contract being invoked
- If there is no fee, attachedAssets, or 'assetIntentOverrides', set 0x20 to the users address
- If there are assetIntentOverrides but none of the inputs belong to the user address, set 0x20 to user address

##### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String? | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


### signMessage

```typescript
neoDapi.signMessage({
  message: 'Hello World!',
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
  publicKey: '0241392007396d6ef96159f047967c5a61f1af0871ecf9dc82afbedb68afbb949a',
  data: '0147fb89d0999e9d8a90edacfa26152fe695ec8b3770dcad522048297ab903822e12472364e254ff2e088fc3ebb641cc24722c563ff679bb1d1623d08bd5863d0d',
  salt: '058b9e03e7154e4db1e489c99256b7fa',
  message: 'Hello World!',
}
```

Signs a provided messaged with an account selected by user. A salt prefix is added to the input string, and provided as a part of the data while signing. In the example, the signed value would be `058b9e03e7154e4db1e489c99256b7faHello World!`.

##### Input Arguments

| Parameter | Type   | Description         |
|:--------- |:------ |:------------------- |
| message   | String | The message to sign |

##### Success Response

| Parameter | Type   | Description                                                  |
|:--------- |:------ |:------------------------------------------------------------ |
| publicKey | String | The public key used to sign message                          |
| data      | String | The signed data                                              |
| salt      | String | The salt prefix added to the original message before signing |
| message   | String | The original message                                         |


##### Error Response

| Parameter   | Type    | Description                                   |
|:----------- |:------- |:--------------------------------------------- |
| type        | String  | The type of error which has occurred          |
| description | String  | A description of the error which has occurred |
| data        | String? | Any raw data associated with the error        |


### deploy

```typescript
neoDapi.deploy({
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
  nodeUrl: 'http://seed7.ngd.network:10332',
}:
```

Will deploy a compiled smart contract to the blockchain with the provided input parameters. The GAS cost for deploying the contract will be calculated by the provider, and displayed to the user upon tx acceptance or rejection.

##### Input Arguments

| Parameter         | Type     | Description                                                                                                             |
|:----------------- |:-------- |:----------------------------------------------------------------------------------------------------------------------- |
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
|:--------- |:------ |:----------------------------------------------------------------------------- |
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| nodeURL   | String | The node to which the transaction was submitted to                            |

<aside class="warning">
It is recommended that the DAPP take appropriate levels of risk prevention when accepting transactions. The dapp can query the mempool of a known node to ensure that the transaction will indeed be broadcast on the network.
</aside>

In the case where the "broadcastOverride" input argument is set to True.

| Parameter | Type   | Description                                                                   |
|:--------- |:------ |:----------------------------------------------------------------------------- |
| txid      | String | The transaction id of the send request which can be queried on the blockchain |
| signedTx  | String | The serialized signed transaction                                             |

##### Error Response
| Parameter   | Type    | Description                                   |
|:----------- |:------- |:--------------------------------------------- |
| type        | String  | The type of error which has occurred          |
| description | String  | A description of the error which has occurred |
| data        | String? | Any raw data associated with the error        |

## Event Methods

### addEventListener

```typescript
neoDapi.addEventListener(neoDapi.Constants.EventName.ACCOUNT_CHANGED, data => {
  console.log(`Connected Account: ${data.address}`);
});
```

Method is used to add a callback method to be triggered on a specified event.

### removeEventListener

```typescript
neoDapi.removeEventListener(neoDapi.Constants.EventName.ACCOUNT_CHANGED);
```

Method is to remove existing callback event listeners.

## Events
Events are a way for the wallet to asynchronously with the DAPP when certain changes occur to the state of the wallet that might be relevant for the


### READY
On a READY event, the callback will fire with a single argument with information about the wallet provider. At any time a READY event listener is added, it will immidiately be called if the provider is already in a ready state. This provides a single flow for dapp developers since this listener should start any and all interactions with the dapi protocol.

| Parameter     | Type     | Description                                                      |
|:------------- |:-------- |:---------------------------------------------------------------- |
| name          | String   | The name of the wallet provider                                  |
| website       | String   | The website of the wallet provider                               |
| version       | String   | The version of the dAPI that the the wallet supports             |
| compatibility | String[] | A list of all applicable NEPs which the wallet provider supports |
| extra         | Object   | Provider specific attributes                                     |

###### extra
| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| theme     | string | UI theme of the provider |

### ACCOUNT_CHANGED
On a ACCOUNT_CHANGED event, the callback will fire with a single argument of the new account. This occurs when an account is already connected to the dapp, and the user has changed the connected account from the dapi provider side.

| Parameter | Type   | Description                                        |
|:--------- |:------ |:-------------------------------------------------- |
| address   | String | Address of the new account                         |
| label     | String | A label the users has set to identify their wallet |


### CONNECTED

On a CONNECTED event, the user has approved the connection of the dapp with one of their accounts. This will fire the first time any of one of the following methods are called from the dapp: `getAccount`, `invoke`, `send`.

| Parameter | Type   | Description                                        |
|:--------- |:------ |:-------------------------------------------------- |
| address   | String | Address of the new account                         |
| label     | String | A label the users has set to identify their wallet |


### DISCONNECTED

On a DISCONNECTED event, the account connected to the dapp via the dapi provider has been disconnected (logged out).


### NETWORK_CHANGED

On a NETWORK_CHANGED event, the user has changed the network their provider wallet is connected to. The event will return the updated network details.

| Parameter      | Type     | Description                                                        |
|:-------------- |:-------- |:------------------------------------------------------------------ |
| networks       | String[] | A list of all networks which this wallet provider allows access to |
| defaultNetwork | String   | Network the wallet is currently set to                             |

### BLOCK_HEIGHT_CHANGED

On a BLOCK_HEIGHT_CHANGED event, the block has advanced to the next.

| Parameter   | Type     | Description                                       |
|:----------- |:-------- |:------------------------------------------------- |
| network     | String   | Network of the block which changed                |
| blockHeight | Number   | Height of the new block                           |
| blockTime   | Number   | Timestamp of the new block                        |
| blockHash   | String   | Hash of the new block                             |
| tx          | String[] | List of transaction ids executed in the new block |

### TRANSACTION_CONFIRMED

On a TRANSACTION_CONFIRMED event, a previously broadcast transaction via the dapi has been confirmed by the blockchain.

| Parameter   | Type   | Description                                 |
|:----------- |:------ |:------------------------------------------- |
| txid        | String | Transaction id which was confirmed on chain |
| blockHeight | Number | Height of the new block                     |
| blockTime   | Number | Timestamp of the new block                  |

## Errors
The NEO dAPI will provide these basic errors. It is up to the wallet provider to provide additional information if they choose:

| Error Type         | Meaning                                                                     |
| ------------------ | --------------------------------------------------------------------------- |
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

const hex2strResult = neoDapi.utils.hex2str(hex2strInput);

console.log('hex2str', hex2strExpected === hex2strResult);
```

Converts a hex string to a string.

### str2hex

```typescript
const str2hexInput = 'hello';
const str2hexExpected = '68656c6c6f';

const str2hexResult = neoDapi.utils.str2hex(str2hexInput);

console.log('str2hex', str2hexExpected === str2hexResult);
```

Converts a string to a hex string.


### hex2int

```typescript
const hex2intInput = '00e1f505';
const hex2intExpected = 100000000;

const hex2intResult = neoDapi.utils.hex2int(hex2intInput);

console.log('hex2int', hex2intExpected === hex2intResult);
```

Converts a hex string to an integer.


### int2hex

```typescript
const int2hexInput = 100000000;
const int2hexExpected = '00e1f505';

const int2hexResult = neoDapi.utils.int2hex(int2hexInput);

console.log('int2hex', int2hexExpected === int2hexResult);
```

Converts an integer to a hex string.


### reverseHex

```typescript
const reverseHexInput = 'bc99b2a477e28581b2fd04249ba27599ebd736d3';
const reverseHexExpected = 'd336d7eb9975a29b2404fdb28185e277a4b299bc';
const reverseHexResult = neoDapi.utils.reverseHex(reverseHexInput);

console.log('reverseHex', reverseHexExpected === reverseHexResult);
```

Converts the endian of a hex string, big to little, or little to big.


### address2scriptHash

```typescript
const address2scriptHashInput = 'Ab2fvZdmnM4HwDgVbdBrbTLz1wK5TcEyhU';
const address2scriptHashExpected = 'd336d7eb9975a29b2404fdb28185e277a4b299bc';

const address2scriptHashResult = neoDapi.utils.address2scriptHash(address2scriptHashInput);

console.log('address2scriptHash', address2scriptHashExpected === address2scriptHashResult);
```

Converts an address to a script hash.


### scriptHash2address

```typescript
const scriptHash2addressInput = 'd336d7eb9975a29b2404fdb28185e277a4b299bc';
const scriptHash2addressExpected = 'Ab2fvZdmnM4HwDgVbdBrbTLz1wK5TcEyhU';

const scriptHash2addressResult = neoDapi.utils.scriptHash2address(scriptHash2addressInput);

console.log('scriptHash2address', scriptHash2addressExpected === scriptHash2addressResult);
```

Converts a script hash to an address.
