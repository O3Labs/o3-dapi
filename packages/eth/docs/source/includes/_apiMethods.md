# API Methods

## Read Methods

Read methods do not alter the state of the blockchain. It can help you query information about your user, and provide you with relevant information:

### eth_chainId

```typescript
const chainId = await o3dapi.ETH.request({method: 'eth_chainId', params: []});
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

#### Parameters

none

#### Returns

```typescript
const netWork = await o3dapi.ETH.request({method: 'net_version', params: []});
```

> Example Response

```typescript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "1"
}
```

`String` - The current network id.

* `"1"`: Ethereum Mainnet

### eth_accounts

```typescript
o3dapi.ETH.request({method: 'eth_accounts', params: []}).then(res => {}).catch(err => {});
```

> Example Response

```typescript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_requestAccounts


```typescript
o3dapi.ETH.request({method: 'eth_requestAccounts', params: []}).then(res => {}).catch(err => {});
```

> Example Response

```typescript
["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
```

### eth_blockNumber



### eth_call

Executes a new message call immediately without creating a transaction on the block chain.

```typescript
let params = {
  "from": "0xd34E3B073a484823058Ab76fc2304D5394beafE4",
  "to": "0x54715A7ab13692b268Eb12334E98e0DA891a86d0",
  "gas": "0x15f90", // 90000
  "gasPrice": "0x32", // 50
  "value": "0x9184e72a", // 2441406250
  //"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}
o3dapi.ETH.request({method: 'eth_sendTransaction', params:  [params]}).then(txid => {
  console.log(txid)
}).catch((err) => {});
```

> Example Response

```typescript
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

#### Parameters

| Parameter         | Type     | Description                                                                                                                                        |
|:----------------- |:-------- |:-------------------------------------------------------------------------------------------------------------------------------------------------- |
| from            | String   | TDATA, 20 Bytes - The address the transaction is send from.                      |
| to              | String   | DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.             |
| gas             | String   | QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.          |
| gasPrice        | String   | QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas            |
| value           | String  | QUANTITY - (optional) Integer of the value sent with this transaction     |
| data            | String  | DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. |
| nonce           | String   | QUANTITY-(optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.           |


### eth_estimateGas



### eth_gasPrice



### eth_getTransactionReceipt



## Write Methods

Creates new message call transaction or a contract creation, if the data field contains code.

### eth_sendTransaction

Creates new message call transaction or a contract creation, if the data field contains code.

```typescript
let params = {
  "from": "0xd34E3B073a484823058Ab76fc2304D5394beafE4",
  "to": "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3",
  "gas": "0x15f90", // 90000
  "gasPrice": "0x32", // 50
  "value": "0x9184e72a", // 2441406250
  "data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  "nonce": "0x1"
}
o3dapi.ETH.request({method: 'eth_sendTransaction', params: params}).then(txid => {
  console.log(txid)
}).catch(({code: number, message: string}) => {
  switch(code) {
    case 40001:
      console.log(message);
      break;
    case -32602:
      console.log(message);
      break;
    case -32603:
      console.log(message);
      break;
  }
});
```

##### Input Arguments
| Parameter         | Type     | Description                                                                                                                                        |
|:----------------- |:-------- |:-------------------------------------------------------------------------------------------------------------------------------------------------- |
| from            | String   | TDATA, 20 Bytes - The address the transaction is send from.                      |
| to              | String   | DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.             |
| gas             | String   | QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.          |
| gasPrice        | String   | QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas            |
| value           | String  | QUANTITY - (optional) Integer of the value sent with this transaction     |
| data            | String  | DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. |
| nonce           | String   | QUANTITY-(optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.           |

### eth_sendRawTransaction

Creates new message call transaction or a contract creation, if the data field contains code.

```typescript
let params = {
  "from": "0xd34E3B073a484823058Ab76fc2304D5394beafE4",
  "to": "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3",
  "gas": "0x15f90", // 90000
  "gasPrice": "0x32", // 50
  "value": "0x9184e72a", // 2441406250
  // "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}
o3dapi.ETH.request({method: 'eth_sendTransaction', params: params}).then(txid => {
  console.log(txid)
}).catch(({code: number, message: string}) => {
  switch(code) {
    case 40001:
      console.log(message);
      break;
    case -32602:
      console.log(message);
      break;
    case -32603:
      console.log(message);
      break;
  }
});
```

##### Input Arguments
| Parameter         | Type     | Description                                                                                                                                        |
|:----------------- |:-------- |:-------------------------------------------------------------------------------------------------------------------------------------------------- |
| from            | String   | TDATA, 20 Bytes - The address the transaction is send from.                      |
| to              | String   | DATA, 20 Bytes - (optional when creating new contract) The address the transaction is directed to.             |
| gas             | String   | QUANTITY - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.          |
| gasPrice        | String   | QUANTITY - (optional, default: To-Be-Determined) Integer of the gasPrice used for each paid gas            |
| value           | String  | QUANTITY - (optional) Integer of the value sent with this transaction     |
| data            | String  | DATA - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. |
| nonce           | String   | QUANTITY-(optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.           |

## Errors
All errors thrown or returned by the MetaMask provider follow this interface:

```typescript
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

| Error Type         | Meaning                                                                     |
| ------------------ | --------------------------------------------------------------------------- |
| 4001               | The request was rejected by the user                                        |
| -32602             | The parameters were invalid                                                 |
| -32603             | Internal error                                                              |

