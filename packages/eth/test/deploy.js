
var app = new Vue({
  el: '#app',
  data: {
    network:"TestNet",
    deployInput: {
      network: "TestNet",
      name: "Smart Contract Name",
      version: "v.1",
      author: "John",
      email: "contact@",
      description: "A description of the smart contract",
      needsStorage: false,
      dynamicInvoke: false,
      isPayable: false,
      returnType: "05",
      parameterList: "0710",
      code: "54c56b6c766b00527ac46c766b51527ac46c766b00c36c766b51c3936c766b52527ac46203006c766b52c3616c7566",
      networkFee: 0.11,
      broadcastOverride: false,
    }
  },
  watch: {
    network:function(value){
      this.deployInput.network = value;
    }
  },
  methods: {
    deploy(resultElem){
      neoDapi.deploy(this.deployInput)
      .then(function(data){
        const formatted = syntaxHighlight(data);
        document.getElementById(resultElem).innerHTML = formatted;
      })
      .catch(function(error){
        document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
      });

    },
    readAVM(e) {
      var self = this;
      var f = e.target.files[0];
      if (f) {
        var r = new FileReader();
        r.onload = function(e) {
          var contents = e.target.result;
          self.deployInput.code = Array.prototype.map.call(new Uint8Array(contents), x => ('00' + x.toString(16)).slice(-2)).join('');
        }
        r.readAsArrayBuffer(f);
      } else {
        alert("Failed to load file");
      }
    }
  },
  mounted(){

  }
})
