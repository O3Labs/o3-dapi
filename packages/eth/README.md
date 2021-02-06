# o3-dapi-eth
ETH Plugin for o3-dapi-eth

Requires o3-dapi-core to operate.

## Usage

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-eth/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-eth)
```
<script src="https://cdn.jsdelivr.net/npm/o3-dapi-eth/lib/o3-dapi-eth.min.js"></script>
```

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-eth.svg)](https://badge.fury.io/js/o3-dapi-eth)
```
npm i --save o3-dapi-core
npm i --save o3-dapi-eth

import o3dapi from 'o3-dapi-core';

import o3DapiETH from 'o3-dapi-eth';

o3dapi.initPlugins([o3DapiETH]);

yarn add o3-dapi-core
yarn add o3-dapi-eth
```

```
var o3dapi = require('o3-dapi-core');
var o3DapiETH = require('o3-dapi-eth');
```

## Example
```
import o3dapi from 'o3-dapi-core';
import o3DapiETH from 'o3-dapi-eth';

o3dapi.initPlugins([o3DapiETH]);

o3dapi.ETH.request({method: 'eth_chainId', params: []}).then((res) => {}).catch((err) => {});
```

## start eth
```
yarn

npm start or npm run start
```
