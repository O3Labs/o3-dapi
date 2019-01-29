const errorEle = document.getElementById("error");
const resultEle = document.getElementById("result");
const loadingEle = document.getElementById("loading");
const networksEle = document.getElementById("networks");
const accountEle = document.getElementById("account");
const disconnectEle = document.getElementById("disconnect");

const getTotalStakeInputEle = document.getElementById("getTotalStakeInput");
const getStakedClaimableOngRewardsInputEle = document.getElementById("getStakedClaimableOngRewardsInput");
const getStakedClaimableOngInputEle = document.getElementById("getStakedClaimableOngInput");
const getNodeStakeInfoAddressInputEle = document.getElementById("getNodeStakeInfoAddressInput");
const getNodeStakeInfoNodePublicKeyInputEle = document.getElementById("getNodeStakeInfoNodePublicKeyInput");

const addStakeNodePublicKeyInput = document.getElementById("addStakeNodePublicKeyInput");
const addStakeAmountInput = document.getElementById("addStakeAmountInput");
const requestStakeWithdrawNodePublicKeyInput = document.getElementById("requestStakeWithdrawNodePublicKeyInput");
const requestStakeWithdrawAmountInput = document.getElementById("requestStakeWithdrawAmountInput");
const withdrawStakeNodePublicKeyInput = document.getElementById("withdrawStakeNodePublicKeyInput");
const withdrawStakeAmountInput = document.getElementById("withdrawStakeAmountInput");

function clearText() {
  resultEle.innerHTML = '';
  errorEle.innerHTML = '';
}

function handleSuccess(data) {
  stopLoading();
  const formatted = syntaxHighlight(data);
  resultEle.innerHTML = formatted;
}

function handleError(error) {
  stopLoading();
  errorEle.innerHTML = syntaxHighlight(error);
}

function startLoading() {
  clearText();
  loadingEle.style = 'display: block;';
}

function stopLoading() {
  loadingEle.style = 'display: none;';
}

stopLoading();

function getStakeRoundInfo() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.getStakeRoundInfo({
    network: networksEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getNodeList() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.getNodeList({
    network: networksEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getTotalStake() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.getTotalStake({
    network: networksEle.value,
    address: getTotalStakeInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getStakedClaimableOngRewards() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.getStakedClaimableOngRewards({
    network: networksEle.value,
    address: getStakedClaimableOngRewardsInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getStakedClaimableOng() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.getStakedClaimableOng({
    network: networksEle.value,
    address: getStakedClaimableOngInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getNodeStakeInfo() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.getNodeStakeInfo({
    network: networksEle.value,
    address: getNodeStakeInfoAddressInputEle.value,
    nodePublicKey: getNodeStakeInfoNodePublicKeyInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}


function claimStakedOng() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.claimStakedOng({
    network: networksEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function claimStakedOngRewards() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.claimStakedOngRewards({
    network: networksEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function addStake() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.addStake({
    network: networksEle.value,
    nodePublicKey: addStakeNodePublicKeyInput.value,
    amount: addStakeAmountInput.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function requestStakeWithdraw() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.requestStakeWithdraw({
    network: networksEle.value,
    nodePublicKey: requestStakeWithdrawNodePublicKeyInput.value,
    amount: requestStakeWithdrawAmountInput.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function withdrawStake() {
  clearText();
  startLoading();
  o3dapi.ONT.stake.withdrawStake({
    network: networksEle.value,
    nodePublicKey: withdrawStakeNodePublicKeyInput.value,
    amount: withdrawStakeAmountInput.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function disconnect() {
  o3dapi.ONT.disconnect()
  .then(data => {
    accountEle.innerHTML = '';
    disconnectEle.innerHTML = '';
    return data;
  })
  .then(handleSuccess)
  .catch(handleError);
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

o3dapi.initPlugins([o3dapiOnt]);

if (o3dapi.ONT.isAvailable) {
  console.log('in o3 dapp browser')
}

o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.READY, onReady);

o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.CONNECTED, data => {
  accountEle.innerHTML = `Connected Account: ${data.address}`;
  disconnectEle.innerHTML = 'disconnect';
});

o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.ACCOUNT_CHANGED, data => {
  accountEle.innerHTML = `Connected Account: ${data.address}`;
  disconnectEle.innerHTML = 'disconnect';
});

o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.DISCONNECTED, data => {
  accountEle.innerHTML = '';
  disconnectEle.innerHTML = '';
  clearText();
});

function onReady() {
  o3dapi.ONT.getNetworks()
  .then(({networks, defaultNetwork}) => {
    networks.forEach(network => {
      const option = document.createElement('option');
      if (network === defaultNetwork) {
        option.selected = 'selected';
      }
      option.value = network;
      option.label = network;
      networksEle.append(option);
    });
  });
};
