const COINBASE_ASSETS_TAG_REQUIRED = ['XRP', 'XLM', 'EOS'];
const initialState = {
  selectedTab: '',
  assets: [],
  sendInput: {
    asset: 'default',
    toAddress: '',
    tag: '',
    amount: '',
  },
  sendSuccess: null,
  sendError: null,
  receiveInput: {
    asset: 'default',
  },
  receiveSuccess: {
    address: '',
    tag: '',
  },
  receiveError: null,
  copiedToClipboard: {
    receiveAddress: false,
    receiveTag: false,
  },
};

const app = new Vue({
  el: '#app',
  data: {...initialState},
  computed: {
    sendAmountShowing() {
      return this.sendInput && this.sendInput.asset !== 'default' && this.sendInput.toAddress && this.sendInput.toAddress.length > 5
    },
    sendTagRequired() {
      return this.sendAmountShowing && COINBASE_ASSETS_TAG_REQUIRED.includes(this.sendInput.asset) && this.sendInput.toAddress && !this.sendInput.toAddress.includes('@')
    },
    canSend() {
      return this.sendAmountShowing && (!this.sendTagRequired || (this.sendTagRequired && this.sendInput.tag)) && this.sendInput.amount
    }
  },
  watch: {
    sendSuccess() {
      setTimeout(() => {
        var animation = bodymovin.loadAnimation({
          container: document.getElementById('lottie'), // Required
          path: './assets/sent.json', // Required
          renderer: 'svg', // Required
          loop: true, // Optional
          autoplay: true, // Optional
          name: "Sent", // Name for future reference. Optional.
        });
      });
    },
    selectedTab(value) {
      if (value === 'SEND' && !!this.sendSuccess) {
        setTimeout(() => {
          var animation = bodymovin.loadAnimation({
            container: document.getElementById('lottie'), // Required
            path: './assets/sent.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: true, // Optional
            name: "Sent", // Name for future reference. Optional.
          });
        });
      }

      if (value === 'RECEIVE' && !!this.receiveSuccess.address) {
        this.renderQR(this.receiveSuccess.address);
      }
    },
    receiveInput: {
      handler(val){
        this.getAccount();
      },
      deep: true,
    },
  },
  methods: {
    send() {
      if (!this.canSend) {
        return;
      }
      const { asset, toAddress, tag, amount } = this.sendInput;
      const params = {
        asset: o3dapi.PAY.assets[asset],
        to: toAddress,
        amount: amount,
      };
      if (!!tag) {
        params.tag = tag;
      }

      this.sendError = null;
      o3dapi.PAY.send(params)
      .then(res => {
        const {result, txid} = res;
        this.sendSuccess = res;
      })
      .catch(err => {
        this.sendError = err && err.description ? err.description : JSON.stringify(err);
      });
    },
    getAccount() {
      const params = {
        asset: o3dapi.PAY.assets[this.receiveInput.asset],
      };

      this.receiveSuccess = initialState.receiveSuccess;
      this.receiveError = null;
      o3dapi.PAY.getAccount(params)
      .then(res => {
        const { address, tag } = res;
        this.receiveSuccess = res;
        this.renderQR(address);
      })
      .catch(err => {
        this.receiveError = err && err.description ? err.description : JSON.stringify(err);
      });
    },
    renderQR(text) {
      setTimeout(() => {
        const parentEle = document.getElementById("receiveQrCode");
        parentEle.innerHTML = '';
        const qrcode = new QRCode(document.getElementById("receiveQrCode"), {
          text: text,
          width: 150,
          height: 150,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
        });
      });
    },
    copyToClipboard(field, copyText) {
      if (navigator.userAgent.match(/ipad|iphone/i)) {
        var textArea = document.createElement('textArea');
        textArea.value = copyText;
        document.body.appendChild(textArea);
        var range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } else {
        var copyEle = document.createElement('input');
        copyEle.contentEditable = true;
        document.body.append(copyEle);
        copyEle.value = copyText;
        copyEle.select();
        document.execCommand("copy");
        document.body.removeChild(copyEle);
      }

      this.copiedToClipboard[field] = true;
      setTimeout(() => {this.copiedToClipboard[field] = false}, 2500);
    },
    resetSend() {
      this.sendInput = initialState.sendInput;
      this.sendSuccess = initialState.sendSuccess;
      this.sendError = initialState.sendError;
    },
  },
  mounted(){
    o3dapi.initPlugins([o3dapiPay]);
    this.assets = o3dapi.PAY.assets;
    this.selectedTab = 'SEND';
  }
});
