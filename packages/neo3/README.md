# o3-dapi-n3
NEO3 Plugin for o3-dapi

Requires o3-dapi-core to operate.

<!-- ## Usage

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-neo/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-neo)
```
<script src="https://cdn.jsdelivr.net/npm/o3-dapi-neo/lib/o3-dapi-neo.min.js"></script>
```
```
window.o3dapiNeo -->
<!-- ``` -->
<!-- 
Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-neo.svg)](https://badge.fury.io/js/o3-dapi-neo) -->
```
npm i --save o3-dapi-n3

or

yarn add o3-dapi-n3
```

```
var o3dapiNeo3 = require('o3-dapi-n3');

import o3dapiNeo3 from 'o3-dapi-n3';
```

## Example
```
import o3dapi from 'o3-dapi-core';
import o3dapiNeo3 from 'o3-dapi-n3';

o3dapi.initPlugins([o3dapiNeo3]);

o3dapi.NEO3.getNetworks()
.then(networks => console.log(networks));
```
