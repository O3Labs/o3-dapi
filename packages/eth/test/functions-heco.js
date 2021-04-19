var app = new Vue({
	el: '#app',
	data: {
		ethCallInput: [
			{
				"to":"0xdaaf96c344f63131acadd0ea35170e7892d3dfba", // account address
				"data":"0xbc1c58d11d9964670435ad8ded3a5abba251ed340cb01fce690794b9dc35627fdac55fb0",
			}, "latest"
		],
		ethEstimateGasInput: [
			{
				"from": "0x54715A7ab13692b268Eb12334E98e0DA891a86d0",
				"to": "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3",
				"value": "0x3211"
			}, "latest"
		],
		ethTransactionReceiptInput: ['0x4383f1bc48657782998bd8d44e24bdbe8f2431346cd69dde73aec2188288ae06'],
		// eth
		ethSendTransactionInput: {
			"from": "0x18C2c8AdEe19EB8cF920A71FFE46703ebeFEd5E8",
			"to": "0x1A94f9aEb5C2D63C3040dB6D546C7139613074f1",
			"gas": "0x5208",
			"gasPrice": "0x1",
			"value": "0x9184e72a"
			// "data": "0xa9059cbb00000000000000000000000054715A7ab13692b268Eb12334E98e0DA891a86d000000000000000000000000000000000000000000000000000000000000186a0"
		},
		// Contract
		ethSendRawTransactionInput: {
			"from": "0x18C2c8AdEe19EB8cF920A71FFE46703ebeFEd5E8",
			"to": "0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c",
			"gas": "0x15f90",
			"gasPrice": "0x1",
			"value": "0x0",
			"data": "0xa9059cbb0000000000000000000000001A94f9aEb5C2D63C3040dB6D546C7139613074f100000000000000000000000000000000000000000000000000000000000186a0"
		}
	},
	methods: {
		formatInput(json) {
			return JSON.stringify(json, null, "\t");
		}
	}
})

function formatInput(json) {
	return JSON.stringify(json, null, "\t");
}

function ethChainId(elem) {
	o3dapi.HECO.request({method: 'eth_chainId', params: []}).then((res) => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	});
}

function ethNetVersion(elem) {
	o3dapi.HECO.request({method: 'net_version', params: []}).then((res) => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch((err) => {
		document.getElementById(elem).innerHTML = formatInput(err);
	});
}

function ethRequestAccounts(elem) {
	o3dapi.HECO.request({method: 'eth_requestAccounts', params: []}).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethAccounts(elem) {
	o3dapi.HECO.request({method: 'eth_accounts', params: []}).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethBlockNumber(elem) {
	o3dapi.HECO.request({method: 'eth_blockNumber', params: []}).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethCall(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.HECO.request({method: 'eth_call', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethEstimateGas(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.HECO.request({method: 'eth_estimateGas', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethGasPrice(resElem) {
	o3dapi.HECO.request({method: 'eth_gasPrice', params: []}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethTransactionReceipt(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.HECO.request({method: 'eth_getTransactionReceipt', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethSendTransaction(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.HECO.request({method: 'eth_sendTransaction', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethSendRawTransaction(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.HECO.request({method: 'eth_sendRawTransaction', params: params}).then(res => {
		console.log(res)
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}