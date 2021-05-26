## Sample dApp

Now that we have a token contract deployed on our private net, and we've tested it from the dAPI testbed, we can look into integrating this in to our own dApp. The code for the testbed is [open source](https://github.com/O3Labs/o3-dapi/blob/master/packages/neo/test/functions.js#L186), and can be used as an example. Or you can reference the [API documentation](https://neodapidocs.o3.network/#invoke) for usage examples.

Here we will use create a very simple dApp website which will interface with the token smart contract. This simple dApp will just be a basic website that imports the neo-dapi JS package from a CDN, and provides a user interface to interact with the contract.

### Fetch Token Name

```
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/neo-dapi@2.0.4/lib/neo-dapi.min.js"></script>
  </head>
  <body>
    <h1>Token testbed</h1>

    <div class="method-container">
      <h3>script hash</h3>
      <input type="text" id="scriptHash" name="scriptHash" placeholder="scriptHash" value="">
    </div>

    <div class="method-container">
      <h3>name</h3>
      <button type="button" name="button" onclick="handleName()">Run</button>
      <div class="result" id="nameResult"></div>
      <div class="error" id="nameError"></div>
    </div>
  </body>
  <script type="text/javascript">
    const scriptHashEle = document.getElementById("scriptHash");
    const nameResultEle = document.getElementById("nameResult");
    const nameErrorEle = document.getElementById("nameError");

    function handleName() {
      neoDapi.invokeRead({
        scriptHash: scriptHashEle.value,
        operation: 'name',
      })
      .then(res => res.stack[0].value)
      .then(res => neoDapi.utils.hex2str(res))
      .then(res => nameResultEle.innerHTML = res)
      .catch(err => nameErrorEle.innerHTML = err);
    }
  </script>
</html>
```

To start off, we will look into making a basic app, which will take an input of the contract hash, and return the name of the token from the smart contract via the dAPI. In order to accomplish this, we will set up a plain HTML website, and import the neo-dapi package into the website.

Once importing the JS package from the CDN, we can set up a few simple UI elements to help us to interact with the dAPI code. These are mostly comprised of a single text input where the user can paste in the script hash of their smart contract, and a button to execute the invoke to fetch the name of the token from the smart contract.

In the script tag, we will have a single function which will take the input script hash, and call the dAPI method `invokeRead`, with the `operation` set to the value `name`.

It's important to note that on the promise resolve, we are parsing the relevant information from the response, which is the `value` of the first object returned in the `stack` array. As we saw from the previous tutorial, using the testbed, the response value is returned as a hexstring.

So in our application, we will utilize the utils provided on the api in order to parse the return value to be human readable. For this we will use the method `hex2str` on the `utils` namespace.

Lastly we set the formatted output of the promise resolve or the raw value from the promise reject to their respective result and error div elements in the UI.

![](/images/tutorials/sampleDapp/getTokenName.png)

This is what our simple UI should look like. Upon entering the script hash for your token contract deployed on private net and clicking the `Run` button, you should see the following result. Where the token name `My First Token` is displayed just below the `Run` button. In the case that there is an error, make sure you have removed the `0x` from the contract script hash and have your O3 wallet open in the background with the network set to PrivateNet.

### Init Token Contract

```
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/neo-dapi@2.0.4/lib/neo-dapi.min.js"></script>
  </head>
  <body>
    <h1>Token testbed</h1>

    <div class="method-container">
      <h3>script hash</h3>
      <input type="text" id="scriptHash" name="scriptHash" placeholder="scriptHash" value="">
    </div>

    <div class="method-container">
      <h3>init</h3>
      <button type="button" name="button" onclick="handleInit()">Run</button>
      <div class="result" id="initResult"></div>
      <div class="error" id="initError"></div>
    </div>
  </body>
  <script type="text/javascript">
    const scriptHashEle = document.getElementById("scriptHash");
    const initResultEle = document.getElementById("initResult");
    const initErrorEle = document.getElementById("initError");

    function handleInit() {
      neoDapi.invoke({
        scriptHash: scriptHashEle.value,
        operation: 'init'
      })
      .then(res => JSON.stringify(res))
      .then(res => initResultEle.innerHTML = res)
      .catch(err => initErrorEle.innerHTML = err);
    }
  </script>
</html>
```

If you remember from the last tutorial, the sample token contract has a non-standard method called `init`, which allows us to distribute the entire supply of tokens to the owner of the contract. In this case, we have set the owner of the token to be the master account on the private net. So in order to call this method, we need to submit a transaction to the chain to write the new state to the blockchain. Therefore, we need to use the `invoke` method instead of the `invokeRead` method, and this will require the user to sign the transaction from the wallet interface.

In order to accomplish this, we have edited the simple dApp to call the `invoke` method on the dAPI as opposed to the `invokeRead` method, and updated some of the UI text. The handling for the promise resolve has also been updated to simply update the UI with the return object, which will contain the transaction id for the invocation which can be checked on the local explorer.

Upon entering the contract script hash and clicking `Run`, the user will be prompted for their signature on the transaction, and it should be signed by the master account of the privatenet. So if you haven't already added this account to your O3 wallet, please be sure to do so before running.

In the neopython cli, this can be done with the command:
`wallet export wif AVFobKv2y7i66gbGPAGDT67zv1RMQQj9GB`

Take the return value and paste it into import section of the O3 wallet.

![](/images/tutorials/sampleDapp/initTokenContract.png)

Upon approving the transaction, the dApp UI will update with the txid for the transaction, and on the next block, all tokens will have been issued.

At this point it would be a good time to practice implementing the integration for the remainder of the methods on your own. Don't worry, the full dApp will be linked at the end just in case.

### Transferring Tokens

Now that you have initialized the token contract, all the tokens should be in your account. From here we can implement the most important method for your token contract, the transfer operation.

```
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/neo-dapi@2.0.4/lib/neo-dapi.min.js"></script>
  </head>
  <body>
    <h1>Token testbed</h1>

    <div class="method-container">
      <h3>script hash</h3>
      <input type="text" id="scriptHash" name="scriptHash" placeholder="scriptHash" value="">
    </div>

    <div class="method-container">
      <h3>transfer</h3>
      <input type="text" id="transfer-addr-from" name="from address" placeholder="from address" value="">
      <input type="text" id="transfer-addr-to" name="to address" placeholder="to address" value="">
      <input type="number" id="transfer-amount" name="amount" placeholder="amount" value="">
      <button type="button" name="button" onclick="handleTransfer()">Run</button>
      <div class="result" id="transferResult"></div>
      <div class="error" id="transferError"></div>
    </div>
  </body>
  <script type="text/javascript">
    const scriptHashEle = document.getElementById("scriptHash");
    const transferAddrFromEle = document.getElementById("transfer-addr-from");
    const transferAddrToEle = document.getElementById("transfer-addr-to");
    const transferAmountEle = document.getElementById("transfer-amount");
    const transferResultEle = document.getElementById("transferResult");
    const transferErrorEle = document.getElementById("transferError");

    function handleTransfer() {
      neoDapi.invoke({
        scriptHash: scriptHashEle.value,
        operation: 'transfer',
        args: [
          {
            type: neoDapi.Constants.ArgumentDataType.ADDRESS,
            value: transferAddrFromEle.value,
          },
          {
            type: neoDapi.Constants.ArgumentDataType.ADDRESS,
            value: transferAddrToEle.value,
          },
          {
            type: neoDapi.Constants.ArgumentDataType.INTEGER,
            value: transferAmountEle.value,
          }
        ]
      })
      .then(res => JSON.stringify(res))
      .then(res => transferResultEle.innerHTML = res)
      .catch(err => transferErrorEle.innerHTML = err);
    }
  </script>
</html>
```

In the updated simple dApp, we again updated the UI with text relevant to the transfer, and added in a few new input fields. Here the user can enter the to and from addresses, along with the amount of tokens to be transferred. For the dAPI interaction, we just updated the operation to `transfer`, and added in the arguments for the operation.

For the `transfer` operation, we need to pass in 3 arguments, the from address, to address, and amount. The first two will be of type `Address`, with the amount being of type `Integer`.

Once the user has populated all the fields and clicked `Run`, the wallet should notify them of a new transaction for approval. Upon successful submission, you can lookup the txid in the local explorer for your private net.

Notice anything strange?

The amount sent is actually far less that the integer amount that we specified in the UI. This is because the contract can only handle integers, so when passed a argument, it must also be formatted as such. So if you want to send 10 tokens, you would need to enter an input of `1000000000`, to accommodate the amount of decimal places the token has.

Since the contract provides a method to get the number of decimal places the token has, can you update the existing dApp to automatically convert the UI input to accept decimal numbers? Meaning if a user inputs a value of 10, it should pass an argument of value `1000000000`, or `3` for an user input of `0.00000003`.

### Full Sample dApp

Once you have completed implementing all of the methods into your sample dApp, you can check your implementation [here](https://github.com/O3Labs/o3-dapi/blob/master/packages/neo/docs/source/files/test.html). It has automatic parsing for the read methods, but we have left the auto conversion of the user input for the `transfer` method as a challenge.
