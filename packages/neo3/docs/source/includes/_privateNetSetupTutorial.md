## Setting up a private net

In the case that you would like to start developing your own smart contracts, you will want to use a private net.

In order to get this setup, you will need to have [Docker](https://store.docker.com/search?type=edition&offering=community) installed on your computer.

Clone down the O3 provided private net.
https://github.com/O3Labs/neo-privatenet-docker

```
make
```
Once cloned, navigate to the repo in your terminal, and simply execute the command:

This will trigger the Docker image to be downloaded to your machine, and will spin up your private net.

Upon starting up, your terminal should be in the NEO Python CLI.

![](/images/tutorials/privateNet/neoPythonCli.png)

This is the command line interface that you will be using to compile and deploy your smart contract files.

### Open up master wallet
```
wallet open wallets/privnet.wallet
```
First open up the master wallet by executing the command:

When prompted for a password, type in `o3.network`.

### Sync up wallet
```
wallet rebuild
```
Upon opening the wallet you will need to rebuild the wallet by executing the command:

This will resync the wallet from the genesis block.


### Make GAS claimable
```
wallet send NEO AVFobKv2y7i66gbGPAGDT67zv1RMQQj9GB 1
```
In order to start deploying smart contracts, you will need GAS, so to start claiming the GAS for the wallet, you need to sync the claim. The way you can do this is by sending any amount of NEO back to yourself. By executing this command, you will be sending 1 NEO back to the wallet itself, and the GAS will then become claimable.

Upon entering the command, you will need to enter the wallet password again `o3.network`.

It's important to node that GAS is allocated per NEO after every block, but they blocks in the private net run every 1 second so it shouldn't take long to accumulate a lot of GAS.


### Claim GAS
```
wallet claim
```

This command will claim any available GAS to your wallet.

Upon entering the command, you will need to enter the wallet password again `o3.network`.


### Private net explorer
The private net also comes with it's own instance of the O3 explorer to monitor your contracts and transactions. To access the explorer, simply navigate in your web browser to `http://localhost:3333`.

![](/images/tutorials/privateNet/o3Explorer.png)
