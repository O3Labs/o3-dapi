# API Methods

## Read Methods

Read methods do not alter the state of the blockchain. It can help you query information about your user, and provide you with relevant information:

### eth_chainId

```typescript
o3dapi.ETH.request({ method: "eth_chainId", params: [] })
  .then((res) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### net_version

Returns the current network id.

```typescript
o3dapi.ETH.request({ method: "net_version", params: [] })
  .then((res) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "1"
}
```

#### Parameters

none

#### Returns

`String` - The current network id.

- `"1"`: Ethereum Mainnet

### eth_accounts

Returns of addresses owned by client.

```typescript
o3dapi.ETH.request({ method: "eth_accounts", params: [] })
  .then((res) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [
		"0x54715A7ab13692b268Eb12334E98e0DA891a86d0"
	]
}
```

#### Parameters

none

#### Returns

`Array of DATA`,20 Bytes - addresses owned by the client.

### eth_requestAccounts

Returns of addresses owned by client.

```typescript
o3dapi.ETH.request({ method: "eth_requestAccounts", params: [] })
  .then((res) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [
		"0x54715A7ab13692b268Eb12334E98e0DA891a86d0"
	]
}
```

#### Parameters

none

#### Returns

`Array of DATA`,20 Bytes - addresses owned by the client.

### eth_blockNumber

Returns the number of most recent block.

```typescript
o3dapi.ETH.request({ method: "eth_blockNumber", params: [] })
  .then((res) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0xb3f5db"
}
```

#### Parameters

none

#### Returns

`QUANTITY` - integer of the current block number the client is on.

### eth_call

Executes a new message call immediately without creating a transaction on the block chain.

```typescript
let params = [
  {
    to: "0xdaaf96c344f63131acadd0ea35170e7892d3dfba", // account address
    data:
      "0xbc1c58d11d9964670435ad8ded3a5abba251ed340cb01fce690794b9dc35627fdac55fb0",
  },
  "latest",
];

o3dapi.ETH.request({ method: "eth_sendTransaction", params: params })
  .then((txid) => {
    console.log(txid);
  })
  .catch((err) => {});
```

> Example Response

```typescript
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000026e3010170122094c398198b191d52219591e891c88fff49b6c613b20d89164e66045dcca5d0ad0000000000000000000000000000000000000000000000000000"
}
```

#### Parameters

1.`Object` - The transaction call object

| Parameter | Type   | Description                                                                                                                 |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------- |
| from      | String | TDATA, 20 Bytes - The address the transaction is send from.                                                                 |
| to        | String | DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.                          |
| gas       | String | QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas. |
| gasPrice  | String | QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas                             |
| value     | String | QUANTITY - (optional) Integer of the value sent with this transaction                                                       |
| data      | String | DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.                  |
| nonce     | String | QUANTITY-(optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.     |

2.`QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`.

### eth_estimateGas

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.

```typescript
const params = [
  {
    from: "0x54715A7ab13692b268Eb12334E98e0DA891a86d0",
    to: "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3",
    value: "0x3211",
  },
  "latest",
];
o3dapi.ETH.request({ method: "eth_estimateGas", params: params })
  .then((res) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x5208"
}
```

#### Parameters

1.`Object` - The transaction call object.

| Parameter | Type   | Description                                                                                                                 |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------- |
| from      | String | TDATA, 20 Bytes - The address the transaction is send from.                                                                 |
| to        | String | DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.                          |
| gas       | String | QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas. |
| gasPrice  | String | QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas                             |
| value     | String | QUANTITY - (optional) Integer of the value sent with this transaction                                                       |
| data      | String | DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.                  |
| nonce     | String | QUANTITY-(optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.     |

2.`QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`.

#### Returns

`DATA` - the return value of executed contract.

### eth_gasPrice

```typescript
o3dapi.ETH.request({ method: "eth_gasPrice", params: [] })
  .then((res) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x5208"
}
```

Returns the current price per gas in wei.

#### Parameters

none

#### Returns

`QUANTITY` - integer of the current gas price in wei.

### eth_getTransactionReceipt

Returns the receipt of a transaction by transaction hash.
Note That the receipt is not available for pending transactions.

#### Parameters

1.`DATA`, 32 Bytes - hash of a transaction

#### Returns

```typescript
const params = [
  "0x4383f1bc48657782998bd8d44e24bdbe8f2431346cd69dde73aec2188288ae06",
];
o3dapi.ETH.request({ method: "eth_getTransactionReceipt", params: params })
  .then((res) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"blockHash": "0xe0eb08b52feaecd7c33c36a033f3111a28b3ab1114ceaeadffb034a9745f5d96",
		"blockNumber": "0xb247e6",
		"contractAddress": null,
		"cumulativeGasUsed": "0xa1a968",
		"from": "0xd34e3b073a484823058ab76fc2304d5394beafe4",
		"gasUsed": "0x5208",
		"logs": [],
		"logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		"status": "0x1",
		"to": "0x54715a7ab13692b268eb12334e98e0da891a86d0",
		"transactionHash": "0x4383f1bc48657782998bd8d44e24bdbe8f2431346cd69dde73aec2188288ae06",
		"transactionIndex": "0x8a"
	}
}
```

`Object` - A transaction receipt object, or `null` when no receipt was found:

| Parameter         | Type       | Description                                                                                            |
| :---------------- | :--------- | :----------------------------------------------------------------------------------------------------- |
| transactionHash   | `DATA`     | 2 Bytes - hash of the transaction.                                                                     |
| transactionIndex  | `QUANTITY` | integer of the transactions index position in the block.                                               |
| blockHash         | `DATA`     | 32 Bytes - hash of the block where this transaction was in.                                            |
| blockNumber       | `QUANTITY` | block number where this transaction was in.                                                            |
| from              | `DATA`     | 20 Bytes - address of the sender.                                                                      |
| to                | `DATA`     | 20 Bytes - address of the receiver. null when its a contract creation transaction.                     |
| cumulativeGasUsed | `QUANTITY` | The total amount of gas used when this transaction was executed in the block.                          |
| gasUsed           | `QUANTITY` | The amount of gas used by this specific transaction alone.                                             |
| contractAddress   | `DATA`     | 20 Bytes - The contract address created, if the transaction was a contract creation, otherwise `null`. |
| logs              | `Array`    | Array of log objects, which this transaction generated.                                                |
| logsBloom         | `DATA`     | 256 Bytes - Bloom filter for light clients to quickly retrieve related logs.                           |
| cumulativeGasUsed | `QUANTITY` | The total amount of gas used when this transaction was executed in the block.                          |

It also returns either :

| Parameter | Type       | Description                                            |
| :-------- | :--------- | :----------------------------------------------------- |
| root      | `DATA`     | 32 bytes of post-transaction stateroot (pre Byzantium) |
| status    | `QUANTITY` | either 1 (success) or 0 (failure)                      |

## Write Methods

### eth_sendTransaction

Creates new message call transaction or a contract creation, if the data field contains code.

```typescript
let params = {
  "from": "0xd34E3B073a484823058Ab76fc2304D5394beafE4",
  "to": "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3",
  "gas": "0x15f90", // 90000
  "gasPrice": "0x32", // 50
  // "value": "0x9184e72a", // 2441406250
  "data": "0xa9059cbb00000000000000000000000054715A7ab13692b268Eb12334E98e0DA891a86d000000000000000000000000000000000000000000000000000000000000186a0"
  "nonce": "0x1"
}
o3dapi.ETH.request({method: 'eth_sendTransaction', params: params}).then(res => {}).catch((err) => {});
```

> Example Response

```typescript
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x0676cae6b9d2838ad19574d4106262a21e0231ab0c3087d27255cdcdbf785056"
}
```

##### Input Arguments

| Parameter | Type   | Description                                                                                                                 |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------- |
| from      | String | TDATA, 20 Bytes - The address the transaction is send from.                                                                 |
| to        | String | DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.                          |
| gas       | String | QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas. |
| gasPrice  | String | QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas                             |
| value     | String | QUANTITY - (optional) Integer of the value sent with this transaction                                                       |
| data      | String | DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.                  |
| nonce     | String | QUANTITY-(optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.     |

### eth_sendRawTransaction

Creates new message call transaction or a contract creation, if the data field contains code.

```typescript
let params = {
  from: "0xd34E3B073a484823058Ab76fc2304D5394beafE4",
  to: "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3",
  gas: "0x15f90", // 90000
  gasPrice: "0x32", // 50
  value: "0x9184e72a", // 2441406250
  // "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
};
o3dapi.ETH.request({ method: "eth_sendTransaction", params: params })
  .then((txid) => {})
  .catch((err) => {});
```

> Example Response

```typescript
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x0676cae6b9d2838ad19574d4106262a21e0231ab0c3087d27255cdcdbf785056"
}
```

##### Input Arguments

| Parameter | Type   | Description                                                                                                                 |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------- |
| from      | String | TDATA, 20 Bytes - The address the transaction is send from.                                                                 |
| to        | String | DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.                          |
| gas       | String | QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas. |
| gasPrice  | String | QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas                             |
| value     | String | QUANTITY - (optional) Integer of the value sent with this transaction                                                       |
| data      | String | DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.                  |
| nonce     | String | QUANTITY-(optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.     |

## Event Methods

### addEventListener

```typescript
o3dapi.ETH.addEventListener(
  o3dapi.ETH.Constants.EventName.CONNECTED,
  (data) => {
    console.log(`Connected Account: ${data}`);
  }
);
```

Method is used to add a callback method to be triggered on a specified event.

### removeEventListener

```typescript
o3dapi.ETH.removeEventListener(o3dapi.ETH.Constants.EventName.CONNECTED);
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

### CONNECTED

On a CONNECTED event, the user has approved the connection of the dapp with one of their accounts.

> Example Response

```typescript
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": [
		"0x54715A7ab13692b268Eb12334E98e0DA891a86d0"
	]
}
```

### DISCONNECTED

On a DISCONNECTED event, the account connected to the dapp via the dapi provider has been disconnected (logged out).

### NETWORK_CHANGED

On a NETWORK_CHANGED event, the user has changed the network their provider wallet is connected to. The event will return the updated network details.

| Parameter      | Type     | Description                                                        |
|:-------------- |:-------- |:------------------------------------------------------------------ |
| networks       | String[] | A list of all networks which this wallet provider allows access to |
| defaultNetwork | String   | Network the wallet is currently set to                             |

### ETH_BLOCK_HEIGHT_CHANGED

On a ETH_BLOCK_HEIGHT_CHANGED event, the block has advanced to the next.

> Example Response

```typescript
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0xb3f5db"
}
```

## Errors

All errors thrown or returned by the MetaMask provider follow this interface:

```typescript
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

| Error Type | Meaning                              |
| ---------- | ------------------------------------ |
| 4001       | The request was rejected by the user |
| -32602     | The parameters were invalid          |
| -32603     | Internal error                       |
