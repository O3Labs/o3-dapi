const o3dapi = require('o3-dapi-core');
const o3dapiOnt = require('o3-dapi-ont');

o3dapi.initPlugins([o3dapiOnt]);
o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.READY, data => {
  o3dapi.ONT.getProvider()
  .then(res => console.log(res))
  .catch(err => console.log(err));
});
