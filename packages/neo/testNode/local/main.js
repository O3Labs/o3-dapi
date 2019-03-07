const o3dapi = require('../../../core/lib/o3-dapi-core.min.js');
// const o3dapi = require('../../../core/build/bundle.js');
const o3dapiNeo = require('../../lib/o3-dapi-neo.min.js');
// const o3dapiNeo = require('../../build/bundle.js');

o3dapi.initPlugins([o3dapiNeo]);
o3dapi.NEO.addEventListener(o3dapi.NEO.Constants.EventName.READY, data => {
  o3dapi.NEO.getProvider()
  .then(res => console.log(res))
  .catch(err => console.log(err));
});
