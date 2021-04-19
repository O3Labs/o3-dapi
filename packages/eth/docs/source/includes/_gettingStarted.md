# Guide
## Getting Started
To develop for O3-desktop, install O3-desktop on your development machine
## What is the dAPI?

The dAPI is a package interface for communicating with the ETH blockchain. The methods are handled by an existing wallet provider, such as the O3 wallet, and help to reduce the development overhead associated with creating dApps on ETH.

By offloading the responsibility of ETH blockchain interactions to a wallet provider, dApp developers do no have to worry about managing users private keys or how to format transactions to be signed and broadcast. The developer no long has to worry about user onboarding flows related to creating and managing a users secure credentials, and can just focus on the development of their core dApp.

On the user side, since all transactions that a dApp needs to broadcast to the blockchain will be handled by the users wallet proivder, they can feel safe knowing that they never need to copy and paste their private key into a dApp again. Any transaction that a user signs will be done so in the wallet, and their private key will never be provided to the dApp.

## Installation

dAPI client integrations are currently facilited via a versioned JS package, and can be imported to your application either via CDN or NPM.

### Install via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/o3-dapi-core@0.3.13/lib/o3-dapi-core.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/o3-dapi-eth@1.0.8/lib/o3-dapi-eth.min.js"></script>
```
```typescript
window.initPlugins([o3DapiETH['ETH']]);

or

window.initPlugins([o3DapiETH['BSC']]);

or

window.initPlugins([o3DapiETH['HECO']]);
```

### Install via NPM

```typescript
npm i --save o3-dapi-eth

or

yarn add o3-dapi-eth

```

```typescript
import o3dapi from 'o3-dapi-core';
import o3DapiETH from 'o3-dapi-eth';

or

var o3dapi = require('o3-dapi-core');
var o3DapiETH = require('o3-dapi-eth');

o3dapi.initPlugins([o3DapiETH]);
```

> Example Response

```typescript
import o3dapi from 'o3-dapi-core';
import o3DapiETH from 'o3-dapi-eth';

or

var o3dapi = require('o3-dapi-core');
var o3DapiETH = require('o3-dapi-eth');

o3dapi.initPlugins([o3DapiETH]);

o3dapi.ETH.request({method: 'eth_chainId', params: []}).then((res) => {}).catch((err) => {});
```

<!-- ## Dev Environment

The client JS package will help to facilitate all communications with the provider wallet, and the only requirement is that you have the O3 wallet running in the background. For development purposes, we recommend using the O3 desktop application, which can be downloaded from [https://o3.network](https://o3.network).

As long as you have the O3 desktop application open in the background. You can open your dApp in any web browser, and the JS package will automatically communicate with the background wallet.

### Private Net

If you are looking to develop your own smart contracts, or would like to test sending assets without having to worry about requesting assets on testnet, O3 has made a private net available for you to run on your local computer. This locally hosted private net will provide you will full controll over all the ETH and GAS in your network, and it can be reset at anytime.

For more information please see the private net repo:
[https://github.com/O3Labs/ETH-privatenet-docker](https://github.com/O3Labs/ETH-privatenet-docker) -->
