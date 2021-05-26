var app = new Vue({
  el: '#app',
  data: {
    network: "",
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
      args: [{
        "type": "ByteArray",
        "value": "bd097b2fcf70e1fd30a5c3ef51e662feeafeba01"
      }],
      network: "TestNet",
    },
    invokeInput: {
      scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
      operation: "transfer",
      args: [{
        "type": "ByteArray",
        "value": ""
      }, {
        "type": "ByteArray",
        "value": ""
      }, {
        "type": "ByteArray",
        "value": "0100000000000000"
      }],
      fee: "0.11",
      network: "TestNet",
      triggerContractVerification: false,
      broadcastOverride: false,
    },
    invokeMultiInput: {
      invokeArgs: [{
          scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
          operation: "transfer",
          args: [{
            "type": "ByteArray",
            "value": ""
          }, {
            "type": "ByteArray",
            "value": ""
          }, {
            "type": "ByteArray",
            "value": "0100000000000000"
          }],
          triggerContractVerification: false,
          attachedAssets: {
            'NEO': 1,
          }
        },
        {
          scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
          operation: "transfer",
          args: [{
            "type": "ByteArray",
            "value": ""
          }, {
            "type": "ByteArray",
            "value": ""
          }, {
            "type": "ByteArray",
            "value": "0100000000000000"
          }],
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
    signMessageInput: {
      message: "Here is a message",
    },
    verifyMessageInput: {
      message: "Here is a message",
      data: "",
      publicKey: "",
    },
    getBlockInput: {
      blockHeight: 2619690,
      network: "TestNet",
    },
    getBlockHeightInput: {
      network: "TestNet",
    },
    getTransactionInput: {
      txid: "",
      network: "TestNet",
    },
    getApplicationLogInput: {
      txid: "",
      network: "TestNet",
    }
  },
  watch: {
    network: function (value) {
      this.getStorageInput.network = value;
      this.getBalanceInput.network = value;
      this.invokeReadInput.network = value;
      this.invokeInput.network = value;
      this.invokeMultiInput.network = value;
      this.sendInput.network = value;
      this.getBlockInput.network = value;
      this.getBlockHeightInput.network = value;
      this.getTransactionInput.network = value;
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
  console.log('------');
  neoDapi.getProvider()
    .then(function (data) {
      console.log(data);
      const formatted = syntaxHighlight(data);
      document.getElementById(elem).innerHTML = formatted;
    })
    .catch(function (error) {
      console.log(error);
      document.getElementById(elem).innerHTML = syntaxHighlight(error);
    });
}

function getNetworks(elem) {
  neoDapi.getNetworks()
    .then(function (data) {
      const formatted = syntaxHighlight(data);
      document.getElementById(elem).innerHTML = formatted;
    })
    .catch(function (error) {
      document.getElementById(elem).innerHTML = syntaxHighlight(error);
    });
}

function getAccount(elem) {
  neoDapi.getAccount()
    .then(accountData => {
      const formatted = syntaxHighlight(accountData);
      document.getElementById(elem).innerHTML = formatted;
    })
    .catch(function (error) {
      document.getElementById(elem).innerHTML = syntaxHighlight(error);
    });
}


function getPublicKey(elem) {
  neoDapi.getPublicKey()
    .then(function (data) {
      const formatted = syntaxHighlight(data);
      document.getElementById(elem).innerHTML = formatted;
    })
    .catch(function (error) {
      document.getElementById(elem).innerHTML = syntaxHighlight(error);
    });
}


function getBalance(inputElement, resultElem) {
  try {
    neoDapi.getBalance(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}

function getStorage(inputElement, resultElem) {
  neoDapi.getStorage(JSON.parse(document.getElementById(inputElement).value))
    .then(function (data) {
      const formatted = syntaxHighlight(data);
      document.getElementById(resultElem).innerHTML = formatted;
    })
    .catch(function (error) {
      document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
    });
}


function invokeRead(inputElement, resultElem) {
  try {
    neoDapi.invokeRead(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}

function invoke(inputElement, resultElem) {
  try {
    neoDapi.invoke(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}

function invokeMulti(inputElement, resultElem) {
  try {
    neoDapi.invokeMulti(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}


function send(inputElement, resultElem) {
  try {
    neoDapi.send(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}

function signMessage(inputElement, resultElem) {
  try {
    neoDapi.signMessage(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}


function verifyMessage(inputElement, resultElem) {
  try {
    neoDapi.verifyMessage(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}

function getBlock(inputElement, resultElem) {
  try {
    neoDapi.getBlock(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}

function getBlockHeight(inputElement, resultElem) {
  try {
    neoDapi.getBlockHeight(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}

function getTransaction(inputElement, resultElem) {
  try {
    neoDapi.getTransaction(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}

function getApplicationLog(inputElement, resultElem) {
  try {
    neoDapi.getApplicationLog(JSON.parse(document.getElementById(inputElement).value))
      .then(function (data) {
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function (error) {
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });
  } catch (err) {
    document.getElementById(resultElem).innerHTML = 'invalid JSON input';
  }
}
