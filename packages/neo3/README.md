# o3-dapi-neo
NEO Plugin for o3-dapi

Requires o3-dapi-core to operate.

## Usage

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-neo/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-neo)
```
<script src="https://cdn.jsdelivr.net/npm/o3-dapi-neo/lib/o3-dapi-neo.min.js"></script>
```
```
window.o3dapiNeo
```

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-neo.svg)](https://badge.fury.io/js/o3-dapi-neo)
```
npm i --save o3-dapi-neo

or

yarn add o3-dapi-neo
```

```
var o3dapiNeo = require('o3-dapi-neo');

import o3dapiNeo from 'o3-dapi-neo';
```

## Example
```
import o3dapi from 'o3-dapi-core';
import o3dapiNeo from 'o3-dapi-neo';

o3dapi.initPlugins([o3dapiNeo]);

o3dapi.NEO.getNetworks()
.then(networks => console.log(networks));
```
