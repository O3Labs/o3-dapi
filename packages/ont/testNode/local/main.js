const o3dapi = require('../../../core/lib/o3-dapi-core.min.js');
// const o3dapi = require('../../../core/build/bundle.js');
const o3dapiOnt = require('../../lib/o3-dapi-ont.min.js');
// const o3dapiOnt = require('../../build/bundle.js');

o3dapi.initPlugins([o3dapiOnt]);
o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.READY, data => {
  o3dapi.ONT.getProvider()
  .then(res => console.log(res))
  .catch(err => console.log(err));
});
