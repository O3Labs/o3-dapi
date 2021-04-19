const disconnectEle = document.getElementById("disconnect");

o3dapi.initPlugins([o3dapiETH.ETH])
o3dapi.initPlugins([o3dapiETH.BSC])
o3dapi.initPlugins([o3dapiETH.HECO])

function disconnect() {
    o3dapi.ETH.disconnect()
    .then(data => {
        console.log(data)
        return data;
    })
    .then(res => {
        console.log(res)
    })
    .catch();
}

// o3dapi.ETH.addEventListener(o3dapi.ETH.Constants.EventName.READY, onReady);

// o3dapi.ETH.addEventListener(o3dapi.ETH.Constants.EventName.CONNECTED, data => {
//     console.log(data);
// });

// o3dapi.ETH.addEventListener(o3dapi.ETH.Constants.EventName.NETWORK_CHANGED, handleNewNetworks);

// o3dapi.ETH.addEventListener(o3dapi.ETH.Constants.EventName.DISCONNECTED, data => {
//     accountEle.innerHTML = '';
//     disconnectEle.innerHTML = '';
// });

// function handleNewNetworks() {
//     console.log('network')
// }

// function onReady() {
//     o3dapi.ETH.addEventListener(o3dapi.ETH.Constants.EventName.ETH_BLOCK_HEIGHT_CHANGED, data => {
//         console.log('eth block height changed: ', JSON.stringify(data));
//     });
// };
