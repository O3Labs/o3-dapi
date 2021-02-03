## Hello World Smart Contract

Included in the neo-privatenet-docker repo is a hello world smart contract called `hello.py`, which can be found in the `smartContracts` folder. When you start up the private net the Docker instance will automatically connect to this folder, so any smart contract files that you write should be placed in this `smartContract` folder when working with the private net.

### Contract overview

```
from boa.interop.Neo.Runtime import Log
from boa.builtins import concat

def Main(operation, args):
    if operation == 'hello':
        return hello(args[0])
    return False

def hello(input):
    Log(concat('Hello World! ', input))
    return True

```

From the neo python cli which was started up in your docker instance, you can interact with the `hello.py` smart contract file. This simple contract has a single method called `hello`. Upon invoking this smart contract, it will print log our the string `Hello World!`, along with an input which you provide.

From the neo python cli, there are a couple options for compiling a smart contract from python code to NEOVM code. One option will simply compile the python file to an `avm` file containing the NEOVM code. The second option will also compile the pythong file to the `avm` file, but will also allow you to simultaneously run the smart contract without deploying.

### Testing & compiling
```
sc build_run {path} {storage} {dynamic_invoke} {payable} {params} {returntype} (inputs) (--no-parse-addr) (--from-addr) (--owners) (--tx-attr)
```
In most cases while developing, you will want to use the compile and run operation so that you can continuously iterate on the development of your contract methods. In this example, we will go ahead an build and run the contract using the command `sc build_run`. This command takes several parameters which will simulate how the contract would be deployed and the operation/arguments you would like to pass to the contract upon test invoke.

```
sc build_run smartContracts/hello.py false false false 0507 10 hello ['Good Bye']
```

Here is the full command that we will be running with a short description of each field below:

#### path
The relative path to the smart contract file. In our case, it will always start with `smartContracts/`, followed by the name of the python file. So for the hello world smart contract the path value will be `smartContracts/hello.py`

#### storage
This is a Boolean flag which wich is set on deployment to tell the platform if your contract requires storage in the VM. For this simple contract we will not use storage, so we can return the value `False`

#### dynamic_invoke
This is a Boolean flag which wich is set on deployment to tell the platform if your contract would like to be able to invoke other smart contracts, whose contract hash is not hardcoded into your contract. For this simple contract we will not use dynamic invokes, so we can return the value `False`.

#### payable
This is a Boolean flag which wich is set on deployment to tell the platform if your contract would like to be able to accept payments of NEO or GAS. For this simple contract we will not be accepting payments of NEO or GAS, so we can return the value `False`.

#### params
A list of data types which your contracts expect to be passed into the `Main` function of the contract. A full list of the data types can be found [here](https://github.com/CityOfZion/neo-smart-contract-examples/blob/master/docs/contract-parameter-type.md). The most common pattern is to accept an `operation` and `args`, where the `operation` is a string, and the `args` are an array of parameters. So for this, we will use the value `0710`, `07` for String, and `10` for Array.

#### returntype
The data type which the contract will return. For most contracts, this value will be `05` for Bytearry. The allows the contract to return various data types, all in the form of a hex string when returned by via RPC node.

#### inputs
This will be a list of the input arguments to your `Main` function, separated by spaces. So for our example we will be calling the operation `hello`, and be passing in a single argument `Good Bye`. Which will look like `hello ['Good Bye']`.

#### Other flags
The are some additional flags that can be set at the end of the execution, but we will go over those in a later tutorial, as they are not applicable to our example.


Upon running the command, you should get the following result:
![](/images/tutorials/helloWorld/buildTest.png)

`[test_mode][SmartContract.Contract.Create]` Confirms the contract was compiled and setup with the parameters you provided.

`[test_mode][SmartContract.Runtime.Log]` is the output of the `Log` method in our `hello` operation (`Log(concat('Hello World! ', input))`). Here you can see that the test invoke of the contract operates as expected, and the following was logged `{'type': 'String', 'value': 'Hello World! Good Bye'}`

`[test_mode][SmartContract.Execution.Success]` Communicates whether the contract invoke was successful or not. In your smart contract, if the logic of the contract completes successfully, then the contract should return the value `True`, and `False` if not. In this case, we can see that the Integer value of `1` was returned, which represents the value `True`. So we know that the contract was test invoked successfully.

### Deploying

```
sc deploy {path} {storage} {dynamic_invoke} {payable} {params} (returntype) (--fee)
```
Now that you have successfully compiled and tested your contract, it's time to actually deploy the contract onto your private net. Unlike the previous build and run, deploying the contract will acutally store your contract code on the platform, and it's operations can then be invoked by dApps.

You can use the `sc deploy` command, which as very similar parameters as `sc build_run`, except without the input arguments to test at the end. You can add an addtional network fee with the `--fee` parameter. But since we are on a private net, this is not required. If deploying to test net or main net, please be sure to include a network fee.

```
sc deploy smartContracts/hello.avm False False False 0710 05
```
Here an important thing to note is that you want to reference the compiled file with the extention `.avm`, rather than the source `.py` file.

Upon execution, you will be asked for some details about your contract. These will be more useful for deployments to testnet or mainnet, but for now you can just use arbitrary values.

```
Creating smart contract....
                 Name: hello1
              Version:
               Author:
                Email:
          Description:
        Needs Storage: False
 Needs Dynamic Invoke: False
           Is Payable: False
{
    "hash": "0xcefb4b90edd232bcebb689064c50dc1e0aac00d5",
    "script": "57c56b6a00527ac46a51527ac46a00c30568656c6c6f87640e006a51c300c3650b006c756661006c756655c56b6a00527ac40d48656c6c6f20576f726c6421206a00c37e680f4e656f2e52756e74696d652e4c6f6761516c75665ec56b6a00527ac46a51527ac46a51c36a00c3946a52527ac46a52c3c56a53527ac4006a54527ac46a00c36a55527ac461616a00c36a51c39f6433006a54c36a55c3936a56527ac46a56c36a53c36a54c37bc46a54c351936a54527ac46a55c36a54c3936a00527ac462c8ff6161616a53c36c7566",
    "parameters": [
        "String",
        "Array"
    ],
    "returntype": "ByteArray"
}
```
In the output upon deploying, you can find the script hash of your contract, in the `hash` attribute. In this case the contract hash is `0xcefb4b90edd232bcebb689064c50dc1e0aac00d5`.

### Invoking via CLI

```
sc invoke {contract} (inputs) (--attach-neo) (--attach-gas) (--no-parse-addr) (--from-addr) (--fee) (--owners) (--tx-attr)
```
Once the contract is deployed, you can now start to invoke the contract. We can do this directly from the neo python cli using the command `sc invoke`. It has very similar parameters to the `sc build_run` command, except that instead of referencing the contract file, we will reference the contract hash we got on deployment, and there is no need to specify the datatypes of the input and output arguments.

```
sc invoke 0xcefb4b90edd232bcebb689064c50dc1e0aac00d5 hello ['Good Bye']
```
In our case, the invoke command will look like this. Upon submitting the command, it will produce the test invoke results. These should be the same as when we tested the contract with the `sc build_run` command, with the exclusion of the `SmartContract.Crate` log.

This invoke command also will prompt you for the wallet password. If entered, this transaction will be processed in the next block and recorded on chain. For cases where you are looking to perform a "read" operation from your smart contract, there is no need to sign and broadcast the information, as the return data has already been provided. In later examples, we will go over other contracts which you will want the transaction to be executed on chain (for example a transfer of NEP5 tokens).
