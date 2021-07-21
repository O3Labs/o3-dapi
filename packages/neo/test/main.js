const errorEle = document.getElementById("error");
const resultEle = document.getElementById("result");
const loadingEle = document.getElementById("loading");
const accountEle = document.getElementById("account");
const disconnectEle = document.getElementById("disconnect");

const balanceInputEle = document.getElementById("balanceInput");

const getStorageScriptHashEle = document.getElementById("getStorageScriptHash");
const getStorageKeyEle = document.getElementById("getStorageKey");

const invokeReadScriptHashEle = document.getElementById("invokeReadScriptHash");
const invokeReadOperationEle = document.getElementById("invokeReadOperation");
const invokeReadArgsEle = document.getElementById("invokeReadArgs");

const invokeScriptHashEle = document.getElementById("invokeScriptHash");
const invokeOperationEle = document.getElementById("invokeOperation");
const invokeArgsEle = document.getElementById("invokeArgs");
const invokeAttachedAssetsEle = document.getElementById("invokeAttachedAssets");
const invokeFeeEle = document.getElementById("invokeFee");
const assetIntentOverridesEle = document.getElementById("assetIntentOverrides");
const triggerContractVerificationEle = document.getElementById("triggerContractVerification");


const sendFromAddressEle = document.getElementById("sendFromAddress");
const sendToAddressEle = document.getElementById("sendToAddress");
const sendAssetEle = document.getElementById("sendAsset");
const sendAmountEle = document.getElementById("sendAmount");
const sendRemarkEle = document.getElementById("sendRemark");
const sendFeeEle = document.getElementById("sendFee");


const signMessageInputEle = document.getElementById("signMessageInput");

const verifyMessageInputEle = document.getElementById("verifyMessageInput");
const verifyMessageSignatureInputEle = document.getElementById("verifyMessageSignatureInput");
const verifyMessagePiblicKeyInputEle = document.getElementById("verifyMessagePiblicKeyInput");

const getBlockInputEle = document.getElementById("getBlockInput");
const getBlockheightInputEle = document.getElementById("getBlockheightInput");
const getTransactionInputEle = document.getElementById("getTransactionInput");
const getApplicationLogInputEle = document.getElementById("getApplicationLogInput");

const deployNameEle = document.getElementById("deployName");
const deployVersionEle = document.getElementById("deployVersion");
const deployAuthorEle = document.getElementById("deployAuthor");
const deployEmailEle = document.getElementById("deployEmail");
const deployDescriptionEle = document.getElementById("deployDescription");
const deployNeedsStorageEle = document.getElementById("deployNeedsStorage");
const deployDynamicInvokeEle = document.getElementById("deployDynamicInvoke");
const deployIsPayableEle = document.getElementById("deployIsPayable");
const deployReturnTypeEle = document.getElementById("deployReturnType");
const deployParameterListEle = document.getElementById("deployParameterList");
const deployCodeEle = document.getElementById("deployCode");
const deployAvmFileEle = document.getElementById("deployAvmFile");
const deployNetworkFee = document.getElementById("deployNetworkFee");

const utilsButtonEle = document.getElementById("utils-button");
const utilsEle = document.getElementById("utils");

const utilsHex2strInputEle = document.getElementById("utilsHex2strInput");
const utilsStr2hexInputEle = document.getElementById("utilsStr2hexInput");
const utilsHex2intInputEle = document.getElementById("utilsHex2intInput");
const utilsInt2hexInputEle = document.getElementById("utilsInt2hexInput");
const utilsReverseHexInputEle = document.getElementById("utilsReverseHexInput");
const utilsAddress2scriptHashInputEle = document.getElementById("utilsAddress2scriptHashInput");
const utilsScriptHash2addressInputEle = document.getElementById("utilsScriptHash2addressInput");
const utilsHex2strOutputEle = document.getElementById("utilsHex2strOutput");
const utilsStr2hexOutputEle = document.getElementById("utilsStr2hexOutput");
const utilsHex2intOutputEle = document.getElementById("utilsHex2intOutput");
const utilsInt2hexOutputEle = document.getElementById("utilsInt2hexOutput");
const utilsReverseHexOutputEle = document.getElementById("utilsReverseHexOutput");
const utilsAddress2scriptHashOutputEle = document.getElementById("utilsAddress2scriptHashOutput");
const utilsScriptHash2addressOutputEle = document.getElementById("utilsScriptHash2addressOutput");


let isUtilsOpen;
function toggleUtils() {
  if (isUtilsOpen) {
    utilsEle.classList.remove("active");
  } else {
    utilsEle.classList.add("active");
  }
  isUtilsOpen = !isUtilsOpen;
}

function clearText() {
  resultEle.innerHTML = '';
  errorEle.innerHTML = '';
}

function handleSuccess(data) {
  stopLoading();
  clearText();
  const formatted = syntaxHighlight(data);
  resultEle.innerHTML = formatted;
}

function handleError(error) {
  stopLoading();
  clearText();
  errorEle.innerHTML = syntaxHighlight(error);
}

function startLoading() {
  clearText();
  // loadingEle.style = 'display: block;';
}

function stopLoading() {
  // loadingEle.style = 'display: none;';
}

stopLoading();

function isReady() {
  neoDapi.isReady()
  .then(handleSuccess)
  .catch(handleError);
}



function deploy() {
  try {
    startLoading();
    neoDapi.deploy({
      network: networksEle.value,
      name: deployNameEle.value,
      version: deployVersionEle.value,
      author: deployAuthorEle.value,
      email: deployEmailEle.value,
      description: deployDescriptionEle.value,
      needsStorage: deployNeedsStorageEle.checked,
      dynamicInvoke: deployDynamicInvokeEle.checked,
      isPayable: deployIsPayableEle.checked,
      returnType: deployReturnTypeEle.value,
      parameterList: deployParameterListEle.value,
      code: deployCodeEle.value,
      networkFee: deployNetworkFee.value,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function disconnect() {
  neoDapi.disconnect()
  .then(data => {
    accountEle.innerHTML = '';
    disconnectEle.innerHTML = '';
    return data;
  })
  .then(handleSuccess)
  .catch(handleError);
}


function utilsAddress() {
  const address2scriptHashResult = utilsAddress2scriptHashInputEle.value ? neoDapi.utils.address2scriptHash(utilsAddress2scriptHashInputEle.value) : '';
  const scriptHash2addressResult = utilsScriptHash2addressInputEle.value ? neoDapi.utils.scriptHash2address(utilsScriptHash2addressInputEle.value) : '';

  utilsAddress2scriptHashOutputEle.innerHTML = address2scriptHashResult;
  utilsScriptHash2addressOutputEle.innerHTML = scriptHash2addressResult;
}



function readSingleFile(evt) {
  var f = evt.target.files[0];
  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      deployCodeEle.value = Array.prototype.map.call(new Uint8Array(contents), x => ('00' + x.toString(16)).slice(-2)).join('');
    }
    r.readAsArrayBuffer(f);
  } else {
    alert("Failed to load file");
  }
}


// deployAvmFileEle.addEventListener('change', readSingleFile, false);

if (neoDapi.isAvailable) {
  console.log('in o3 dapp browser')
}

neoDapi.addEventListener(neoDapi.Constants.EventName.READY, onReady);

neoDapi.addEventListener(neoDapi.Constants.EventName.CONNECTED, data => {
  accountEle.innerHTML = `Connected Account: ${data.address}`;
  disconnectEle.innerHTML = 'disconnect';
});

neoDapi.addEventListener(neoDapi.Constants.EventName.ACCOUNT_CHANGED, data => {
  accountEle.innerHTML = `Connected Account: ${data.address}`;
  disconnectEle.innerHTML = 'disconnect';
});

neoDapi.addEventListener(neoDapi.Constants.EventName.DISCONNECTED, data => {
  accountEle.innerHTML = '';
  disconnectEle.innerHTML = '';
  clearText();
});

neoDapi.addEventListener(neoDapi.Constants.EventName.NETWORK_CHANGED, handleNewNetworks);

neoDapi.addEventListener(neoDapi.Constants.EventName.TRANSACTION_CONFIRMED, data => {
  console.log('neo tx confirmed: ', JSON.stringify(data));
});

function handleNewNetworks({networks, defaultNetwork}) {
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
  neoDapi.getNetworks()
  .then(handleNewNetworks);
  neoDapi.addEventListener(neoDapi.Constants.EventName.BLOCK_HEIGHT_CHANGED, data => {
    console.log(data)
  });
};
