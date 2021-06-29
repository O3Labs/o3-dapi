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

const networksEle = document.getElementById("networks");

const signMessageInputEle = document.getElementById("signMessageInput");

const verifyMessageInputEle = document.getElementById("verifyMessageInput");
const verifyMessageSignatureInputEle = document.getElementById("verifyMessageSignatureInput");
const verifyMessagePiblicKeyInputEle = document.getElementById("verifyMessagePiblicKeyInput");

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
  loadingEle.style = 'display: block;';
}

function stopLoading() {
  loadingEle.style = 'display: none;';
}

stopLoading();

function isReady() {
  neoN3Dapi.isReady()
  .then(handleSuccess)
  .catch(handleError);
}

function getProvider() {
  neoN3Dapi.getProvider()
  .then(handleSuccess)
  .catch(handleError);
}

function getNetworks() {
  neoN3Dapi.getNetworks()
  .then(handleSuccess)
  .catch(handleError);
}

function getAccount() {
  startLoading();

  neoN3Dapi.getAccount()
  .then(accountData => {
    accountEle.innerHTML = `Connected Account: ${accountData.address}`;
    disconnectEle.innerHTML = 'disconnect';
    handleSuccess(accountData);
  })
  .catch(handleError);
}

function getPublicKey() {
  startLoading();

  neoN3Dapi.getPublicKey()
  .then(handleSuccess)
  .catch(handleError);
}

function getBalance() {
  try {
    startLoading();
    neoN3Dapi.getBalance({
      params: balanceInputEle.value && JSON.parse(balanceInputEle.value),
      network: networksEle.value,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function getStorage() {
  startLoading();
  neoN3Dapi.getStorage({
    scriptHash: getStorageScriptHashEle.value,
    key: getStorageKeyEle.value,
    network: networksEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function invokeRead() {
  try {
    startLoading();
    neoN3Dapi.invokeRead({
      scriptHash: invokeReadScriptHashEle.value,
      operation: invokeReadOperationEle.value,
      args: invokeReadArgsEle.value && JSON.parse(invokeReadArgsEle.value),
      network: networksEle.value,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function invoke() {
  try {
    startLoading();
    neoN3Dapi.invoke({
      scriptHash: invokeScriptHashEle.value,
      operation: invokeOperationEle.value,
      args: invokeArgsEle.value && JSON.parse(invokeArgsEle.value),
      attachedAssets: invokeAttachedAssetsEle.value && JSON.parse(invokeAttachedAssetsEle.value),
      fee: invokeFeeEle.value,
      network: networksEle.value,
      assetIntentOverrides: assetIntentOverridesEle.value && JSON.parse(assetIntentOverridesEle.value),
      triggerContractVerification: triggerContractVerificationEle.checked,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function send() {
  startLoading();
  neoN3Dapi.send({
    fromAddress: sendFromAddressEle.value,
    toAddress: sendToAddressEle.value,
    asset: sendAssetEle.value,
    amount: sendAmountEle.value,
    remark: sendRemarkEle.value,
    fee: sendFeeEle.value,
    network: networksEle.value,
  })
  .then(handleSuccess)
  .catch(handleError);
}

function signMessage() {
  try {
    startLoading();
    neoN3Dapi.signMessage({
      message: signMessageInputEle.value,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function verifyMessage() {
  try {
    startLoading();
    neoN3Dapi.verifyMessage({
      message: verifyMessageInputEle.value,
      data: verifyMessageSignatureInputEle.value,
      publicKey: verifyMessagePiblicKeyInputEle.value,
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function deploy() {
  try {
    startLoading();
    neoN3Dapi.deploy({
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
    })
    .then(handleSuccess)
    .catch(handleError);
  } catch (err) {
    handleError('invalid JSON input');
  }
}

function disconnect() {
  neoN3Dapi.disconnect()
  .then(data => {
    accountEle.innerHTML = '';
    disconnectEle.innerHTML = '';
    return data;
  })
  .then(handleSuccess)
  .catch(handleError);
}

function utilsString() {
  const hex2strResult = utilsHex2strInputEle.value ? neoN3Dapi.utils.hex2str(utilsHex2strInputEle.value) : '';
  const str2hexResult = utilsStr2hexInputEle.value ? neoN3Dapi.utils.str2hex(utilsStr2hexInputEle.value) : '';

  utilsHex2strOutputEle.innerHTML = hex2strResult;
  utilsStr2hexOutputEle.innerHTML = str2hexResult;
}

function utilsInteger() {
  const hex2intResult = utilsHex2intInputEle.value ? neoN3Dapi.utils.hex2int(utilsHex2intInputEle.value) : '';
  const int2hexResult = utilsInt2hexInputEle.value ? neoN3Dapi.utils.int2hex(utilsInt2hexInputEle.value) : '';

  utilsHex2intOutputEle.innerHTML = hex2intResult;
  utilsInt2hexOutputEle.innerHTML = int2hexResult;
}

function utilsReverseHex() {
  const reversehexResult = utilsReverseHexInputEle.value ? neoN3Dapi.utils.reverseHex(utilsReverseHexInputEle.value) : '';

  utilsReverseHexOutputEle.innerHTML = reversehexResult;
}

function utilsAddress() {
  const address2scriptHashResult = utilsAddress2scriptHashInputEle.value ? neoN3Dapi.utils.address2scriptHash(utilsAddress2scriptHashInputEle.value) : '';
  const scriptHash2addressResult = utilsScriptHash2addressInputEle.value ? neoN3Dapi.utils.scriptHash2address(utilsScriptHash2addressInputEle.value) : '';

  utilsAddress2scriptHashOutputEle.innerHTML = address2scriptHashResult;
  utilsScriptHash2addressOutputEle.innerHTML = scriptHash2addressResult;
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

function readSingleFile(evt) {
  var f = evt.target.files[0];
  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      deployCodeEle.innerHTML = Array.prototype.map.call(new Uint8Array(contents), x => ('00' + x.toString(16)).slice(-2)).join('');
    }
    r.readAsArrayBuffer(f);
  } else {
    alert("Failed to load file");
  }
}

deployAvmFileEle.addEventListener('change', readSingleFile, false);

if (neoN3Dapi.isAvailable) {
  console.log('in o3 dapp browser')
}

neoN3Dapi.addEventListener(neoN3Dapi.Constants.EventName.CONNECTED, data => {
  accountEle.innerHTML = `Connected Account: ${data.address}`;
  disconnectEle.innerHTML = 'disconnect';
});

neoN3Dapi.addEventListener(neoN3Dapi.Constants.EventName.ACCOUNT_CHANGED, data => {
  accountEle.innerHTML = `Connected Account: ${data.address}`;
  disconnectEle.innerHTML = 'disconnect';
});

neoN3Dapi.addEventListener(neoN3Dapi.Constants.EventName.DISCONNECTED, data => {
  accountEle.innerHTML = '';
  disconnectEle.innerHTML = '';
  clearText();
});

['MainNet', 'TestNet'].forEach(network => {
  const option = document.createElement('option');
  if (network === 'MainNet') {
    option.selected = 'selected';
  }
  option.value = network;
  option.label = network;
  option.innerHTML = network;
  networksEle.append(option);
});
