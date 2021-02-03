# Getting Started

## What is the dAPI?

The dAPI is a package interface for communicating with the NEO blockchain. The methods are handled by an existing wallet provider, such as the O3 wallet, and help to reduce the development overhead associated with creating dApps on NEO.

By offloading the responsibility of NEO blockchain interactions to a wallet provider, dApp developers do no have to worry about managing users private keys or how to format transactions to be signed and broadcast. The developer no long has to worry about user onboarding flows related to creating and managing a users secure credentials, and can just focus on the development of their core dApp.

On the user side, since all transactions that a dApp needs to broadcast to the blockchain will be handled by the users wallet proivder, they can feel safe knowing that they never need to copy and paste their private key into a dApp again. Any transaction that a user signs will be done so in the wallet, and their private key will never be provided to the dApp.

## Installation

dAPI client integrations are currently facilited via a versioned JS package, and can be imported to your application either via CDN or NPM.

### Install via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/neo-dapi@2.0.4/lib/neo-dapi.min.js"></script>
```
```typescript
window.neoDapi
```

[![](https://data.jsdelivr.com/v1/package/npm/neo-dapi/badge)](https://www.jsdelivr.com/package/npm/neo-dapi)

When installing via CDN, it's always recommended to reference a specific version of the neo-dapi package, to protect your app from possible method interface updates. In this example the version referenced in the url is 2.0.4.


### Install via NPM

```typescript
npm i --save neo-dapi

or

yarn add neo-dapi
```

```typescript
var neoDapi = require('neo-dapi');

or

import neoDapi from 'neo-dapi';
```

[![npm version](https://badge.fury.io/js/neo-dapi.svg)](https://badge.fury.io/js/neo-dapi)

When installing via NPM, it's always advised to lockdown your package version to either the specific version only, or to patch updates.


## Dev Environment

The client JS package will help to facilitate all communications with the provider wallet, and the only requirement is that you have the O3 wallet running in the background. For development purposes, we recommend using the O3 desktop application, which can be downloaded from [https://o3.network](https://o3.network).

As long as you have the O3 desktop application open in the background. You can open your dApp in any web browser, and the JS package will automatically communicate with the background wallet.

### Private Net

If you are looking to develop your own smart contracts, or would like to test sending assets without having to worry about requesting assets on testnet, O3 has made a private net available for you to run on your local computer. This locally hosted private net will provide you will full controll over all the NEO and GAS in your network, and it can be reset at anytime.

For more information please see the private net repo:
[https://github.com/O3Labs/neo-privatenet-docker](https://github.com/O3Labs/neo-privatenet-docker)

## Mobile Compatability

We suggest doing the majority of your development using O3 desktop and using the mobile device simulator in the Chrome debugger. Once your app has been tested and fully functional, the JS package should automatically connect when running in the O3 mobile wallet with no additional changes.
