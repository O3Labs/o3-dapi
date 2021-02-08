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
			"from": "0x54715A7ab13692b268Eb12334E98e0DA891a86d0",
			"to": "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3", // account address
			"gas": "0x15f90", // 90000
			"gasPrice": "0x9184e72a000", // 10000000000000
			"value": "0x9184e72a", 
			// "data": "0xa9059cbb00000000000000000000000054715A7ab13692b268Eb12334E98e0DA891a86d000000000000000000000000000000000000000000000000000000000000186a0"
		},
		// Contract
		ethSendRawTransactionInput: {
			"from": "0x54715A7ab13692b268Eb12334E98e0DA891a86d0",
			"to": "0xdAC17F958D2ee523a2206206994597C13D831ec7", // Contract address
			"gas": "0x15f90", // 90000
			"gasPrice": "0x9184e72a000", // 10000000000000
			"value": "0x0", // 0
			"data": "0xa9059cbb000000000000000000000000dF704A67Fc56F0D7CFA147548Ee4C115921D2ba300000000000000000000000000000000000000000000000000000000000186a0"
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
	o3dapi.ETH.request({method: 'eth_chainId', params: []}).then((res) => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	});
}

function ethNetVersion(elem) {
	o3dapi.ETH.request({method: 'net_version', params: []}).then((res) => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch((err) => {
		document.getElementById(elem).innerHTML = formatInput(err);
	});
}

function ethRequestAccounts(elem) {
	o3dapi.ETH.request({method: 'eth_requestAccounts', params: []}).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethAccounts(elem) {
	o3dapi.ETH.request({method: 'eth_accounts', params: []}).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethBlockNumber(elem) {
	o3dapi.ETH.request({method: 'eth_blockNumber', params: []}).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethCall(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.ETH.request({method: 'eth_call', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethEstimateGas(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.ETH.request({method: 'eth_estimateGas', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethGasPrice(resElem) {
	o3dapi.ETH.request({method: 'eth_gasPrice', params: []}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethTransactionReceipt(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	console.log(params);
	o3dapi.ETH.request({method: 'eth_getTransactionReceipt', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethSendTransaction(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.ETH.request({method: 'eth_sendTransaction', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethSendRawTransaction(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	o3dapi.ETH.request({method: 'eth_sendRawTransaction', params: params}).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}