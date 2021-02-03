var app = new Vue({
	el: '#app',
	data: {
		network:"",
		getStorageInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			key: "bd097b2fcf70e1fd30a5c3ef51e662feeafeba01",
			network: "TestNet",
		},
		getBalanceInput: {
			params: [{
				"address": "AScKxyXmNtEnTLTvbVhNQyTJmgytxhwSnM",
				"assets": ["GAS"]
			}],
			network: "TestNet",
		},
		invokeReadInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			operation: "balanceOf",
			args:[{"type":"ByteArray","value":"bd097b2fcf70e1fd30a5c3ef51e662feeafeba01"}],
			network: "TestNet",
		},
		invokeInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			operation: "transfer",
			args: [{"type":"ByteArray","value":""},{"type":"ByteArray","value":""},{"type":"ByteArray","value":"0100000000000000"}],
			fee: "0.11",
			network: "TestNet",
			triggerContractVerification: false,
			broadcastOverride: false,
		},
		invokeMultiInput: {
			invokeArgs: [
				{
					scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
					operation: "transfer",
					args: [{"type":"ByteArray","value":""},{"type":"ByteArray","value":""},{"type":"ByteArray","value":"0100000000000000"}],
					triggerContractVerification: false,
					attachedAssets: {
						'NEO': 1,
					}
				},
				{
					scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
					operation: "transfer",
					args: [{"type":"ByteArray","value":""},{"type":"ByteArray","value":""},{"type":"ByteArray","value":"0100000000000000"}],
					triggerContractVerification: true,
					attachedAssets: {
						'NEO': 2,
					}
				}
			],
			fee: "0.11",
			network: "TestNet",
			broadcastOverride: false,
		},
		sendInput: {
			fromAddress: "ANtdacYPFN6zkarDwVt5vH55FKsJU8SapW",
			toAddress: "ANtdacYPFN6zkarDwVt5vH55FKsJU8SapW",
			asset: "GAS",
			amount: "1",
			remark: "TestRemark",
			fee: "0.011",
			network: "TestNet",
			broadcastOverride: false,
		},
		signMessageInput:{
			message: "Here is a message",
		},
		verifyMessageInput:{
			message: "Here is a message",
			data: "",
			publicKey: "",
		},
		getBlockInput:{
			blockHeight: 2619690,
			network: "TestNet",
		},
		getBlockHeightInput:{
			network: "TestNet",
		},
		getTransactionInput:{
			txid: "",
			network: "TestNet",
		},
		getApplicationLogInput:{
			txid: "",
			network: "TestNet",
		}
	},
	watch: {
		network:function(value){
			this.getStorageInput.network = value;
			this.getBalanceInput.network = value;
			this.invokeReadInput.network = value;
			this.invokeInput.network = value;
			this.invokeMultiInput.network = value;
			this.sendInput.network = value;
			this.getBlockInput.network = value;
			this.getBlockHeightInput.network = value;
			this.getApplicationLogInput.network = value;
		}
	},
	methods: {
		formatInput(json) {
			return JSON.stringify(json, null, "\t");
		}
	}
})


function getProvider(elem) {
	o3dapi.ETH.request({method: 'net_version'}).then(res => {
		console.log(res)
	}).catch(err => {
		console.log(err)
	})
}

function getAccount(elem) {
	o3dapi.ETH.request({method: 'eth_accounts', params: []}).then(res => {
		console.log(res)
	}).catch(err => {
		console.log(err)
	})
}

function getBlockHeight(inputElement, resultElem) {
	try {
		o3dapi.ETH.request({method: 'eth_blockNumber', params: []}).then(res => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getTransaction(inputElement, resultElem) {
	try {
		let params = {
			"from": "0xd34E3B073a484823058Ab76fc2304D5394beafE4",
			"to": "0xdF704A67Fc56F0D7CFA147548Ee4C115921D2ba3",
			// "gas": "0x15f90", // 90000
			// "gasPrice": "0x32", // 50
			"value": "0x9184e72a", // 2441406250
			// "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
		}
		
		o3dapi.ETH.request({method: 'eth_sendTransaction', params: params}).then(res => {
			console.log(res)
		})
	} catch (error) {
		console.log(error)
	}
}
