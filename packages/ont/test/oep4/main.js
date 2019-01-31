const errorEle = document.getElementById("error");
const resultEle = document.getElementById("result");
const loadingEle = document.getElementById("loading");
const networksEle = document.getElementById("networks");
const accountEle = document.getElementById("account");
const disconnectEle = document.getElementById("disconnect");

const contractHashEle = document.getElementById("contractHash");

const getBalanceOfAddressInputEle = document.getElementById("getBalanceOfAddressInput");
const getAllowanceOwnerInputEle = document.getElementById("getAllowanceOwnerInput");
const getAllowanceSpenderInputEle = document.getElementById("getAllowanceSpenderInput");

const initGasPriceInputEle = document.getElementById("initGasPriceInput");
const initGasLimitInputEle = document.getElementById("initGasLimitInput");

const transferFromInputEle = document.getElementById("transferFromInput");
const transferToInputEle = document.getElementById("transferToInput");
const transferAmountInputEle = document.getElementById("transferAmountInput");
const transferGasPriceInputEle = document.getElementById("transferGasPriceInput");
const transferGasLimitInputEle = document.getElementById("transferGasLimitInput");

const transferFromFromInputEle = document.getElementById("transferFromFromInput");
const transferFromToInputEle = document.getElementById("transferFromToInput");
const transferFromAmountInputEle = document.getElementById("transferFromAmountInput");
const transferFromGasPriceInputEle = document.getElementById("transferFromGasPriceInput");
const transferFromGasLimitInputEle = document.getElementById("transferFromGasLimitInput");

const approveOwnerInputEle = document.getElementById("approveOwnerInput");
const approveSpenderInputEle = document.getElementById("approveSpenderInput");
const approveAmountInputEle = document.getElementById("approveAmountInput");
const approveGasPriceInputEle = document.getElementById("approveGasPriceInput");
const approveGasLimitInputEle = document.getElementById("approveGasLimitInput");

const transferMultiOutputsInputEle = document.getElementById("transferMultiOutputsInput");
const transferMultiGasPriceInputEle = document.getElementById("transferMultiGasPriceInput");
const transferMultiGasLimitInputEle = document.getElementById("transferMultiGasLimitInput");

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

function getTokenDetails() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.getTokenDetails({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getName() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.getName({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getSymbol() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.getSymbol({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getDecimals() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.getDecimals({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getTotalSupply() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.getTotalSupply({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getBalanceOf() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.getBalanceOf({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
    address: getBalanceOfAddressInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function getAllowance() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.getAllowance({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
    owner: getAllowanceOwnerInputEle.value,
    spender:getAllowanceSpenderInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function init() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.init({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
    gasPrice: initGasPriceInputEle.value,
    gasLimit: initGasLimitInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function transfer() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.transfer({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
    from: transferFromInputEle.value,
    to: transferToInputEle.value,
    amount: transferAmountInputEle.value,
    gasPrice: transferGasPriceInputEle.value,
    gasLimit: transferGasLimitInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function transferFrom() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.transferFrom({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
    from: transferFromFromInputEle.value,
    to: transferFromToInputEle.value,
    amount: transferFromAmountInputEle.value,
    gasPrice: transferFromGasPriceInputEle.value,
    gasLimit: transferFromGasLimitInputEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function transferMulti() {
  try {
    clearText();
    startLoading();
    o3dapi.ONT.oep4.transferMulti({
      network: networksEle.value,
      scriptHash: contractHashEle.value,
      outputs: JSON.parse(transferMultiOutputsInputEle.value),
      gasPrice: transferMultiGasPriceInputEle.value,
      gasLimit: transferMultiGasLimitInputEle.value,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('Invalid JSON.')
  }
}

function approve() {
  clearText();
  startLoading();
  o3dapi.ONT.oep4.approve({
    network: networksEle.value,
    scriptHash: contractHashEle.value,
    owner: approveOwnerInputEle.value,
    spender: approveSpenderInputEle.value,
    amount: approveAmountInputEle.value,
    gasPrice: approveGasPriceInputEle.value,
    gasLimit: approveGasLimitInputEle.value,
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

o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.NETWORK_CHANGED, handleNewNetworks);

function handleNewNetworks({networks, defaultNetwork}) {
  [].slice.call(networksEle.children).forEach(child => networksEle.remove(child));
  networks.forEach(network => {
    const option = document.createElement('option');
    if (network === defaultNetwork) {
      option.selected = 'selected';
    }
    option.value = network;
    option.label = network;
    networksEle.append(option);
  });
}

function onReady() {
  o3dapi.ONT.getNetworks()
  .then(handleNewNetworks);
};
