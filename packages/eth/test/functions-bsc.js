var app = new Vue({
	el: '#app',
	data: {
		ethCallInput: [
			{
				"to": "0xdaaf96c344f63131acadd0ea35170e7892d3dfba", // account address
				"data": "0xbc1c58d11d9964670435ad8ded3a5abba251ed340cb01fce690794b9dc35627fdac55fb0",
			}, "latest"
		],
		ethEstimateGasInput: [
			{
				"from": "0x348C795De6e7B158e38c4fEa8035b923a611e4AF",
				"to": "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3",
				"value": "0x3211"
			}, "latest"
		],
		ethTransactionReceiptInput: ['0x3228af56ca9e6540d1953b3fdfbd94c6db6a3afc469c2becb9021c90b9804917'],
		// bsc
		ethSendTransactionInput: {
			"from": "0x348C795De6e7B158e38c4fEa8035b923a611e4AF",
			"to": "0x297a030b3A99dB1c089b563BCBdFF291CE283141", // account address
			"gas": "0x5208", // 90000
			"gasPrice": "0x02540be400", // 10000000000000
			"value": "0x5af3107a4000",
			// "data": "0xa9059cbb00000000000000000000000054715A7ab13692b268Eb12334E98e0DA891a86d000000000000000000000000000000000000000000000000000000000000186a0"
		},
		// Contract
		ethSendRawTransactionInput: { 
			"gas": "60000", 
			"gasPrice": "0x02540be400",
			"from": "0x348C795De6e7B158e38c4fEa8035b923a611e4AF",
			"to": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
			"value": "0",
			"data": "0xa9059cbb000000000000000000000000297a030b3A99dB1c089b563BCBdFF291CE28314100000000000000000000000000000000000000000000000000000005af3107a4",
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
	O3Dapi.BSC.request({ method: 'eth_chainId', params: [] }).then((res) => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	});
}

function ethNetVersion(elem) {
	O3Dapi.BSC.request({ method: 'net_version', params: [] }).then((res) => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch((err) => {
		document.getElementById(elem).innerHTML = formatInput(err);
	});
}

function ethRequestAccounts(elem) {
	O3Dapi.BSC.request({ method: 'eth_requestAccounts', params: [] }).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethAccounts(elem) {
	O3Dapi.BSC.request({ method: 'eth_accounts', params: [] }).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethBlockNumber(elem) {
	O3Dapi.BSC.request({ method: 'eth_blockNumber', params: [] }).then(res => {
		document.getElementById(elem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(elem).innerHTML = formatInput(err);
	})
}

function ethCall(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	O3Dapi.BSC.request({ method: 'eth_call', params: params }).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethEstimateGas(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	O3Dapi.BSC.request({ method: 'eth_estimateGas', params: params }).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethGasPrice(resElem) {
	O3Dapi.BSC.request({ method: 'eth_gasPrice', params: [] }).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethTransactionReceipt(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	O3Dapi.BSC.request({ method: 'eth_getTransactionReceipt', params: params }).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethSendTransaction(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	O3Dapi.BSC.request({ method: 'eth_sendTransaction', params: params }).then(res => {
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}

function ethSendRawTransaction(reqElem, resElem) {
	let params = JSON.parse(document.getElementById(reqElem).value);
	O3Dapi.BSC.request({ method: 'eth_sendRawTransaction', params: params }).then(res => {
		console.log(res)
		document.getElementById(resElem).innerHTML = formatInput(res);
	}).catch(err => {
		document.getElementById(resElem).innerHTML = formatInput(err);
	})
}