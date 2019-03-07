const o3dapi = require('o3-dapi-core');
const o3dapiNeo = require('o3-dapi-neo');

o3dapi.initPlugins([o3dapiNeo]);
o3dapi.NEO.addEventListener(o3dapi.NEO.Constants.EventName.READY, data => {
  o3dapi.NEO.getProvider()
  .then(res => console.log(res))
  .catch(err => console.log(err));
});
