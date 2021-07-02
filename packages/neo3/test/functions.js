var app = new Vue({
  el: '#app',
  data: {
    network: "",
    getStorageInput: {
      scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      key: "bd097b2fcf70e1fd30a5c3ef51e662feeafeba01",
      network: "N3TestNet",
    },
    getBalanceInput: {
      params: [{
        "address": "NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM",
        "contracts": ["GAS"]
      }],
      network: "N3TestNet",
    },
    invokeReadInput: {
      scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      operation: "balanceOf",
      args: [{
        "type": "Address",
        "value": "NYxb4fSZVKAz8YsgaPK2WkT3KcAE9b3Vag"
      }],
      network: "N3TestNet",
    },
    invokeReadMultiInput: {
      invokeReadArgs: [
        {
          scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
          operation: "balanceOf",
          args: [{
            "type": "Address",
            "value": "NYxb4fSZVKAz8YsgaPK2WkT3KcAE9b3Vag"
          }],
        },
        {
          scriptHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
          operation: "balanceOf",
          args: [{
            "type": "Address",
            "value": "NZHf1NJvz1tvELGLWZjhpb3NqZJFFUYpxT"
          }]
        }
      ],
      network: "N3TestNet",
    },
    invokeInput: {
      scriptHash: "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      operation: "transfer",
      args: [{
        "type": "Address",
        "value": "NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM"
      }, {
        "type": "Address",
        "value": "NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ"
      }, {
        "type": "Integer",
        "value": "1"
      }, {
        "type": "String",
        "value": "NEO"
      }],
      signers: [
        {
          account: "0x85afbd7dcaa61d4ff1009912856abede476061db",
          scopes: 128
        }
      ],
      fee: "0.11",
      network: "N3TestNet",
      broadcastOverride: false,
    },
    invokeMultiInput: {
      invokeArgs: [{
          scriptHash: "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
          operation: "transfer",
          args: [{
            "type": "Address",
            "value": "NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM"
          }, {
            "type": "Address",
            "value": "NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ"
          }, {
            "type": "Integer",
            "value": "1"
          }, {
            "type": "String",
            "value": "NEO"
          }]
        },
        {
          scriptHash: "ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
          operation: "transfer",
          args: [{
            "type": "Address",
            "value": "NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM"
          }, {
            "type": "Address",
            "value": "NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ"
          }, {
            "type": "Integer",
            "value": "2"
          }, {
            "type": "String",
            "value": "NEO"
          }]
        }
      ],
      signers: [
        {
          account: "0x85afbd7dcaa61d4ff1009912856abede476061db",
          scopes: 128
        }
      ],
      fee: "0.11",
      network: "N3TestNet",
      broadcastOverride: false,
    },
    sendInput: {
      fromAddress: "NfuwpaQ1A2xaeVbxWe8FRtaRgaMa8yF3YM",
      toAddress: "NYMeJFcVKEkvG3Q89eBQCXqrYLHz4kTAdQ",
      asset: "NEO",
      amount: "1",
      fee: "0.011",
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
      blockHeight: 100,
      network: "N3TestNet",
    },
    getBlockHeightInput: {
      network: "N3TestNet",
    },
    getTransactionInput: {
      txid: "0x3174b6a05a110986d09dfb418652fd454a1109db5b56feee382d9fa3c80231bd",
      network: "N3TestNet",
    },
    getApplicationLogInput: {
      txid: "0x3174b6a05a110986d09dfb418652fd454a1109db5b56feee382d9fa3c80231bd",
      network: "N3TestNet",
    }
  },
  watch: {
    network: function (value) {
      this.getStorageInput.network = value;
      this.getBalanceInput.network = value;
      this.invokeReadInput.network = value;
      this.invokeReadMultiInput.network = value;
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
  neo3Dapi.getProvider()
    .then(function (data) {
      const formatted = syntaxHighlight(data);
      document.getElementById(elem).innerHTML = formatted;
    })
    .catch(function (error) {
      document.getElementById(elem).innerHTML = syntaxHighlight(error);
    });
}

function getNetworks(elem) {
  neo3Dapi.getNetworks()
    .then(function (data) {
      const formatted = syntaxHighlight(data);
      document.getElementById(elem).innerHTML = formatted;
    })
    .catch(function (error) {
      document.getElementById(elem).innerHTML = syntaxHighlight(error);
    });
}

function getAccount(elem) {
  neo3Dapi.getAccount()
    .then(accountData => {
      const formatted = syntaxHighlight(accountData);
      document.getElementById(elem).innerHTML = formatted;
    })
    .catch(function (error) {
      document.getElementById(elem).innerHTML = syntaxHighlight(error);
    });
}

function pickAddress(elem) {
  neo3Dapi.pickAddress()
    .then(accountData => {
      const formatted = syntaxHighlight(accountData);
      document.getElementById(elem).innerHTML = formatted;
    })
    .catch(function (error) {
      document.getElementById(elem).innerHTML = syntaxHighlight(error);
    });
}


function getPublicKey(elem) {
  neo3Dapi.getPublicKey()
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
    neo3Dapi.getBalance(JSON.parse(document.getElementById(inputElement).value))
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
  neo3Dapi.getStorage(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.invokeRead(JSON.parse(document.getElementById(inputElement).value))
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

function invokeReadMulti(inputElement, resultElem) {
  try {
    neo3Dapi.invokeReadMulti(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.invoke(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.invokeMulti(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.send(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.signMessage(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.verifyMessage(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.getBlock(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.getBlockHeight(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.getTransaction(JSON.parse(document.getElementById(inputElement).value))
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
    neo3Dapi.getApplicationLog(JSON.parse(document.getElementById(inputElement).value))
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
