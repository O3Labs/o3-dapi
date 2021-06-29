# o3-dapi-neo-n3
NEO N3 Plugin for o3-dapi

Requires o3-dapi-core to operate.

## Usage

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-neo-n3/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-neo-n3)
```
<script src="https://cdn.jsdelivr.net/npm/o3-dapi-neo-n3/lib/o3-dapi-neo-n3.min.js"></script>
```
```
window.o3dapiNeoN3
```

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-neo.svg)](https://badge.fury.io/js/o3-dapi-neo-n3)
```
npm i --save o3-dapi-neo-n3

or

yarn add o3-dapi-neo-n3
```

```
var o3dapiNeoN3 = require('o3-dapi-neo-n3');

import o3dapiNeoN3 from 'o3-dapi-neo-n3';
```

## Example
```
import o3dapi from 'o3-dapi-core';
import o3dapiNeoN3 from 'o3-dapi-neo-n3';

o3dapi.initPlugins([o3dapiNeoN3]);

o3dapi.NEO3.getNetworks()
.then(networks => console.log(networks));
```
