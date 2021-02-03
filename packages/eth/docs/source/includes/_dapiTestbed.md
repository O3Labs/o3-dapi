## dAPI Testbed

After you deploy your smart contract, and would like to start building the interface to call your smart contract from your dApp, you can start by using the dAPI Testbed @ [neodapitestbed.o3.app](https://neodapitestbed.o3.app/). This is a free open source testbed which allows you to quickly explore all the different methods on the dAPI. It can make all the same calls related to getting a user address, getting asset balances, and even transferring assets. However, one of the most important features of this testbed is that it allows you to test out your smart contract code by invoking it via the dAPI.

![](/images/tutorials/testbed/testbedOverview.png)

In the testbed, you have a shortcut list for all the methods available on the dAPI. Each method has a simple form for any input variables that may be required or optionally provided. The requirement to using this dAPI testbed is that you have the O3 desktop app open in the background on the same computer. The dAPI JS package included in this testbed dApp will automatically communicate with the O3 wallet in the background.

### Connecting to Private Net

First, you will notice that at the top right hand corner, there is a network selector. The network will automatically be set to the network of your wallet. So in order to invoke our hello world smart contract on our private net, simply change the wallet network to "PrivateNet" from the network selector found on the bottom left of the wallet.

![](/images/tutorials/testbed/menuBarNetworkButton.png)

![](/images/tutorials/testbed/networkSelector.png)

Once you have set your wallet to PrivateNet, the dAPI testbed network selector should have automatically updated it's network to PrivateNet as well. If not, please simply refresh the site.

### Invoking read methods

When interacting with smart contracts there are generally two different types of interactions, one to ready information back from the smart contract, and the other to write data to the blockchain. For the first case, we can use a method on the dAPI called `invokeRead`. This method will create a invoke transaction, execute it against the RPC node, and return the result. This does not require any signature from the user, nor does it write any information to the blockchain.

For this case, lets call our hello world smart contract. First navigate to the dapi explorer, with your O3 wallet open in the background and your privatenet up.

[neodapitestbed.o3.app](https://neodapitestbed.o3.app/)

Navigate to the `invokeRead` method, either by scrolling down, or selecting it from the shortcut on the left side of the screen.

![](/images/tutorials/testbed/testbedInvokeRead.png)

Update the input object with the details for your invoke. In this case, we will update the script hash to be the one we got for our hello world contract when we deployed.

IMPORTANT: When using the dAPI please be sure to remove the `0x` prefix on your contract script hash. It will be displayed in neo-python with the `0x` prefix. Please remove it when referencing your contract in the dAPI `invokeRead` and `invoke` methods.

![](/images/tutorials/testbed/testbedInvokeReadInput.png)

After updating the correctly formatted script hash for your contract, you can fill in the operation and args just as we called it from the neo-python cli.

Another thing to note is that when using the dAPI you need to specify the data type of each argument that is passed into the smart contract as inputs. This is so that when the transaction is serialized, the data is correctly formatted.

Lastly, since we are executing against the PrivateNet, we need to update this input value.

![](/images/tutorials/testbed/testbedInvokeReadResult.png)

If all went correct, you should see a similar result. The `state` value is `HALT`, which means that the contract executed successfully; compared to the value `FAULT`, which indicates that there was an error.

The `stack` value is what was returned from the smart contract. In some cases, this may be a value such as an account balance or token symbol, but in our case it is just the Integer value `1` to indicate a returned value of `True`.

If you look back into your neo-python cli you will notice there there was no log event. This is because the `invokeRead` method just read the result of the execution, but did not actually execute the transaction.

### Invoke write methods

In the case where you want to execute a transaction on chain which would result in a change of state, you will use the `invoke` method on the dAPI instead. This method will require a signature from the user of the wallet, and will effect a change on your NEO private net.

Scroll down to the `invoke` method in the testbed, and simply copy the same input that you used for `invokeRead`, and click `Run`. This will execute the same invoke against your hello world smart contract, except that it will now broadcast the transaction to be processed in the next block after getting your signature.

![](/images/tutorials/testbed/testbedInvokeReadResult.png)

Upon clicking `Run`, a notification should pop up from the O3 wallet. Select an account to sign the transaction with and select `Connect`. In the case where your account isn't already authenticated, enter the passphrase to decrypt your account.

![](/images/tutorials/testbed/dapiConnectPopup.png)

You will now be presented with the standard notification for accepting or rejecting a transaction. You can click the `Show transaction details` dropdown to see a breakdown of the details included in the transaction that you will be signing with you selected wallet. By clicking `Approve`, the transaction will then be signed and broadcast to the network for processing.

![](/images/tutorials/testbed/dapiTxApprove.png)

The testbed will show you the transaction id that was sent to the network.

![](/images/tutorials/testbed/invokeTxid.png)

There are two ways to look at the result of your transaction.

First you can copy this value and look it up in the private net explorer to see the result.

![](/images/tutorials/testbed/invokeExploreTx.png)

For our hello world smart contract, this will not be all that useful, but for other transaction, mainly NEP5 transfers or main/test net invokes, this will start to become more useful.

The second way is to navigate back to your neo-python cli. There should be now be the same logged results just as we had invoked the smart contract from the neo-python cli in the previous tutorial.

![](/images/tutorials/testbed/invokeCliResult.png)

Here you can see the log of `Hello World!` concatenated with our input String, and the success message with an output of the Integer `1`, signifying a return of `True`.

Now that you know the basics of how to invoke both read and write methods on your smart contract, we can move into more advanced use cases.
