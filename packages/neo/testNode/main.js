// const o3dapi = require('../../core/lib/o3-dapi-core.min.js');
const o3dapi = require('../../core/build/bundle.js');
// const o3dapiNeo = require('../lib/o3-dapi-neo.min.js');
const o3dapiNeo = require('../build/bundle.js');

o3dapi.initPlugins([o3dapiNeo]);

o3dapi.NEO.getNetworks()
.then(networks => console.log(networks))
.catch(err => console.log(err));
