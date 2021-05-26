## Token Smart Contract

```
from boa.interop.Neo.Runtime import CheckWitness
from boa.interop.Neo.Storage import GetContext, Get, Put
from boa.interop.Neo.Action import RegisterAction

# AVFobKv2y7i66gbGPAGDT67zv1RMQQj9GB
TOKEN_OWNER = b'\x93\xe1\xe5\xbe\xd9\x15\x96\x84\xac\x8c.\xe4\r w\xfb\xcf\xac\xf7\n'
TOTAL_SUPPLY = 10000000 * 100000000
TOKEN_NAME = 'My First Token'
TOKEN_SYMBOL = 'MFT'
TOKEN_DECIMALS = 8

TOTAL_SUPPLY_KEY = 'TOTAL_SUPPLY'
INIT_KEY = 'DEPLOYED'

ctx = GetContext()
OnTransfer = RegisterAction('transfer', 'addr_from', 'addr_to', 'amount')

def Main(operation, args):

    if operation == 'totalSupply':
        return Get(ctx, TOTAL_SUPPLY_KEY)

    if operation == 'name':
        return TOKEN_NAME

    if operation == 'symbol':
        return TOKEN_SYMBOL

    if operation == 'decimals':
        return TOKEN_DECIMALS

    if operation == 'balanceOf':
        if len(args) == 1:
            return Get(ctx, args[0])

    if operation == 'transfer':
        if len(args) == 3:
            return transfer(args[0], args[1], args[2])

    if operation == 'init':
        return init()

    return False

def transfer(addr_from, addr_to, amount):

    if amount <= 0:
        return False

    if len(addr_to) != 20:
        print("not a valid to address")
        return False

    if not CheckWitness(addr_from):
        print("from address is not the tx sender")
        return False

    if addr_from == addr_to:
        print("transfer to self!")
        return True

    from_val = Get(ctx, addr_from)

    if from_val < amount:
        print("insufficient funds")
        return False

    if from_val == amount:
        Delete(ctx, addr_from)
    else:
        difference = from_val - amount
        Put(ctx, addr_from, difference)

    to_value = Get(ctx, addr_to)

    to_total = to_value + amount

    Put(ctx, addr_to, to_total)

    OnTransfer(addr_from, addr_to, amount)

    return True

def init():
    if not CheckWitness(TOKEN_OWNER):
        print("Must be token owner to init")
        return False

    if Get(ctx, INIT_KEY):
        print("Token already init")
        return False

    Put(ctx, INIT_KEY, 1)
    Put(ctx, TOTAL_SUPPLY_KEY, TOTAL_SUPPLY)
    Put(ctx, TOKEN_OWNER, TOTAL_SUPPLY)
    OnTransfer(None, TOKEN_OWNER, TOTAL_SUPPLY)
    return True
```
One of the first smart contracts that many developers want to test out deploying a a token contract. In the NEO ecosystem the standard for token contracts is called NEP5, and you will find a template of this smart contract in the neo-privatenet-docker, similar to how there was already a hello world smart contract.

You can find details about all the methods on the NEP5 standard in the NEO proposals:
[https://github.com/neo-project/proposals/blob/master/nep-5.mediawiki](https://github.com/neo-project/proposals/blob/master/nep-5.mediawiki)

For this basic example template, we have all the base methods, with the addition of a non-standard `init` method. This method will initialize the token contract, sending all 10m tokens to the contract owner (which is set to the master account on the neo-privatenet-docker). If reviewing other smart contract for NEP5 tokens in the NEO ecosystem, you will find that many of them are much more complex, as they also contain the code to facilitate the automated token sale.

For the purpose of this tutorial, we kept it to the base methods so your can test out reading and writing information to the smart contract using the dAPI.

While reviewing the contract, you can see that most of the methods are what we refer to as "read" methods. This is because they do not require any writes into contract storage or handling of native asset UTXOs (NEO & GAS). For example, when calling the `name` operation, it will simply return a static string, for the name of the token. When using the dAPI method `invokeRead`, calling the method will return the value `My First Token`.

On the other hand, lets look at the operation `init`. This method makes calls to the `Put` method, which will write the specific key value pair to the storage allocated to your contract. In order to have these value be persisted on the blockchain, we need to use the dAPI method `invoke` instead of `invokeRead`. This will ensure that your transaction is signed by your wallet provider and broadcast to the network for processing in the next block.

### Deploying the contract

```
sc build smartContracts/token.py

sc deploy smartContracts/token.avm True False False 0710 05
```
Just like in the hello world tutorial, once you are in the neo-python cli, you can use the `sc build` and `sc deploy` commands to compile and deploy your contract.

Note that this time we set the first parameter in the `sc deploy` command, after the path to the `.avm` file, to `True`. This indicates that for our token contract we would like to use the contract storage feature. This will allow the contract to store data on the blockchain, but be aware that the cost of the deployment has now increased to 490 GAS.

### Invoke from testbed

Once deployed, grab the contract hash (minus the `0x` prefix), and head back to the [dAPI testbed](https://neodapitestbed.o3.app).

Update the input object with the reference to your new token contract script hash, and set the operation to `name`. We will not need any arguments, so leave the `args` array empty, or remove it from the object.

![](/images/tutorials/token/tokenInvokeRead.png)

After hitting `Run`, you should have a result as follows.

![](/images/tutorials/token/tokenInvokeReadResult.png)

### Making sense of results

But wait a minute, what is that weird looking value in the `stack` field. We specified that the return type of our contract as `05` on deployment, which means ByteArray. This will allow us to return various data types, formatted as hex strings. So in the dAPI client package, we've included utilities to convert these hex string results to numbers and string.

In this case, we know that the type that we want is a String. So in copy the `value`, and navigate to the `Hex to string` method in the testbed. Here you can paste the result and convert it to a human readable string.

![](/images/tutorials/token/tokenResultConverted.png)

Here we can see that the value returned should match the name of our token that we hardcoded into the contract.

### Init the contract

Now, in order to get rolling with making transfers we first need to initialize the contract by calling the `init` operation. Just like we did for the hello world smart contract, we need to use the `invoke` method on the dAPI. This will send all of the tokens to the private net master account, so that you can start sending your test tokens to other addresses.

![](/images/tutorials/token/tokenInit.png)

Once approving the transaction, you can then check the balance of the master private net account, with the `invokeRead` method, just like we called the `name` operation. This time we just need to add the input argument of the account address, with data type `Address`.

![](/images/tutorials/token/tokenInitResult.png)

You should get back a success result, which you can then convert from it's hex string value to a number in the utils at the bottom of the testbed.

Furthermore, you can even go into the private net explorer, and checkout your contract and master account balances.

![](/images/tutorials/token/tokenContractExplorer.png)

![](/images/tutorials/token/tokenMasterAccount.png)

### Transferring tokens

Now that we have the master account loaded up with our test token, we can proceed to send them to another test address.

Just update the `operation` and `args` in the `invoke` method, and follow the same steps as the `init`.

![](/images/tutorials/token/tokenInvokeTransfer.png)

One important thing to note is that for the third argument in the array, we have set the input value to `1`. Since smart contracts do not handle floating point numbers, we need to keep in mind the number of decimals our token has. So if we are transferring `1`, we are not transferring one whole token, but rather `0.00000001` of our token since it has 8 decimal places. This is a very important point when building your application, as you do not want to make the mistake of sending the wrong amount by a whole decimal place!

After submitting the `invoke` transaction, we can use the transaction (txid) in the results to look up the results in more detail in the explorer.

![](/images/tutorials/token/tokenTransferResults.png)

Here we can see that we successfully sent `0.00000001` of our MFT token to our test address.
