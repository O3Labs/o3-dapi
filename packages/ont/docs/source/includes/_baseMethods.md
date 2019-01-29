# Base Methods

## getProvider

```typescript
o3dapi.ONT.getProvider()
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
  } = extra;

  console.log('Provider name: ' + name);
  console.log('Provider website: ' + website);
  console.log('Provider dAPI version: ' + version);
  console.log('Provider dAPI compatibility: ' + JSON.stringify(compatibility));
  console.log('Provider UI theme: ' + theme);
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
    'OEP-6',
  ],
  extra: {
    theme: 'Dark Mode'
  }
}
```

Returns information about the dAPI provider, including who this provider is, the version of their dAPI, and the NEP that the interface is compatible with.

### Input Arguments

None

### Success Response
| Parameter     | Type     | Description                                                      |
|:------------- |:-------- |:---------------------------------------------------------------- |
| name          | String   | The name of the wallet provider                                  |
| website       | String   | The website of the wallet provider                               |
| version       | String   | The version of the dAPI that the the wallet supports             |
| compatibility | String[] | A list of all applicable NEPs which the wallet provider supports |
| extra         | Object   | Provider specific attributes                                     |

##### extra
| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| theme     | string | UI theme of the provider |


### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String  | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

## getNetworks

```typescript
o3dapi.ONT.getNetworks()
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

### Input Arguments

None

### Success Response

| Parameter      | Type     | Description                                                        |
|:-------------- |:-------- |:------------------------------------------------------------------ |
| networks       | String[] | A list of all networks which this wallet provider allows access to |
| defaultNetwork | String   | Network the wallet is currently set to                             |

### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String  | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |

## getAccount

```typescript
o3dapi.ONT.getAccount()
.then((account: Account) => {
  const {
    address,
    label,
  } = account;

  console.log('Provider address: ' + address);
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

### Success Response
| Parameter | Type   | Description                                                        |
|:--------- |:------ |:------------------------------------------------------------------ |
| address   | String | The address of the account that is currently connected to the dapp |
| label     | String | A label the users has set to identify their wallet                 |

### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String  | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |


## getPublicKey

```typescript
o3dapi.ONT.getPublicKey()
.then((account: AccountPublicKey) => {
  const {
    address,
    publicKey,
  } = account;

  console.log('Provider address: ' + address);
  console.log('Provider public key: ' + publicKey);
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
  publicKey: '03d43468721ef8936548878071b534d8228c313e02e6d90cef8c65fd3c2d4eaeed'
}
```

Return the AccountPublicKey that is currently connected to the dApp.

### Success Response
| Parameter | Type   | Description                                                           |
|:--------- |:------ |:--------------------------------------------------------------------- |
| address   | String | The address of the account that is currently connected to the dapp    |
| publicKey | String | The public key of the account that is currently connected to the dapp |

### Error Response
| Parameter   | Type    | Description                                  |
|:----------- |:------- |:-------------------------------------------- |
| type        | String  | The type of error which has occured          |
| description | String  | A description of the error which has occured |
| data        | String? | Any raw data associated with the error       |
