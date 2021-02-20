const disconnectEle = document.getElementById("disconnect");

o3dapi.initPlugins([o3DapiETH]);
console.log(o3dapi.ETH)

function disconnect() {
    o3dapi.ETH.disconnect()
    .then(data => {
      accountEle.innerHTML = '';
      disconnectEle.innerHTML = '';
      return data;
    })
    .then(res => {
        console.log(res)
    })
    .catch();
}

o3dapi.ETH.addEventListener(o3dapi.ETH.Constants.EventName.READY, onReady);

o3dapi.ETH.addEventListener(o3dapi.ETH.Constants.EventName.DISCONNECTED, data => {
    accountEle.innerHTML = '';
    disconnectEle.innerHTML = '';
});

function handleNewNetworks({ networks, defaultNetwork }) {
    const networksEle = document.getElementById("networks");
    [].slice.call(networksEle.children).forEach(child => networksEle.remove(child));
    networks.forEach(network => {
        const option = document.createElement('option');
        if (network === defaultNetwork) {
            option.selected = 'selected';
        }
        option.value = network;
        option.label = network;
        option.innerHTML = network;
        networksEle.append(option);
    });
}

function onReady() {
    o3dapi.ETH.getNetworks()
        .then(handleNewNetworks);
    o3dapi.ETH.addEventListener(o3dapi.ETH.Constants.EventName.BLOCK_HEIGHT_CHANGED, data => {
        console.log('eth block height changed: ', JSON.stringify(data));
    });
};