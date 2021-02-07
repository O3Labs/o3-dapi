# o3-dapi
Decentralized API messaging protocol with blockchain plugins

## Standalone Packages

### eth-dapi

A single bundle for interfacing with the ETH blockchain.

When to use:
- Your app only interfaces with the ETH blockchain, not Ontology.
- You would like to have the clientside logic to make calls to the NEO blockchain without a O3 wallet open.
  - Results in larger package size, but more functionality

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-eth/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-eth)

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-eth.svg)](https://badge.fury.io/js/o3-dapi-eth)


### neo-dapi

A single bundle for interfacing with the NEO blockchain.

When to use:
- Your app only interfaces with the NEO blockchain, not Ontology.
- You would like to have the clientside logic to make calls to the NEO blockchain without a O3 wallet open.
  - Results in larger package size, but more functionality

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/neo-dapi/badge)](https://www.jsdelivr.com/package/npm/neo-dapi)

Install via npm [![npm version](https://badge.fury.io/js/neo-dapi.svg)](https://badge.fury.io/js/neo-dapi)


### ont-dapi

A single bundle for interfacing with the Ontology blockchain

When to use:
- Your app only interfaces with the Ontology blockchain, not NEO.
- You would like to have the clientside logic to make calls to the Ontology blockchain without a O3 wallet open.
  - Results in larger package size, but more functionality

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/ont-dapi/badge)](https://www.jsdelivr.com/package/npm/ont-dapi)

Install via npm [![npm version](https://badge.fury.io/js/ont-dapi.svg)](https://badge.fury.io/js/ont-dapi)


## Individual Modules

### o3-dapi-core

The core messaging protocol to facilitate secure communications between dApps and O3 wallets.

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-core/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-core)

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-core.svg)](https://badge.fury.io/js/o3-dapi-core)

### o3-dapi-neo (o3-dapi-core plugin)

NEO dAPI interface plugin for o3-dapi-core

When to use:
- You would like a lightweight client, that does not include all the code required to make calls to the NEO blockchain
  - Smaller package size, but requires a O3 wallet open to make any calls
- Your app interfaces with more than one chain (eg. NEO & Ontology)

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-neo/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-neo)

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-neo.svg)](https://badge.fury.io/js/o3-dapi-neo)


### o3-dapi-neoclient (o3-dapi-neo plugin)

Client side bundle to make read calls to NEO blockchain via NEO dAPI methods

When to use:
- You would like to have the clientside logic to make calls to the NEO blockchain without a O3 wallet open.
  - Results in larger package size, but more functionality
- Your app interfaces with more than one chain (eg. NEO & Ontology)

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-neoclient/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-neoclient)

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-neoclient.svg)](https://badge.fury.io/js/o3-dapi-neoclient)

### o3-dapi-ont (o3-dapi-core plugin)

Ontology dAPI interface plugin for o3-dapi-core

When to use:
- You would like a lightweight client, that does not include all the code required to make calls to the Ontology blockchain
  - Smaller package size, but requires a O3 wallet open to make any calls
- Your app interfaces with more than one chain (eg. NEO & Ontology)

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-ont/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-ont)

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-ont.svg)](https://badge.fury.io/js/o3-dapi-ont)


### o3-dapi-ontclient (o3-dapi-ont plugin)

Client side bundle to make read calls to Ontology blockchain via Ontology dAPI methods

When to use:
- You would like to have the clientside logic to make calls to the NEO blockchain without a O3 wallet open.
  - Results in larger package size, but more functionality
- Your app interfaces with more than one chain (eg. NEO & Ontology)

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-ontclient/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-ontclient)

Install via npm [![npm version](https://badge.fury.io/js/o3-dapi-ontclient.svg)](https://badge.fury.io/js/o3-dapi-ontclient)

### o3-dapi-pay

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-pay/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-pay)

### o3-dapi-coinbase

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/o3-dapi-coinbase/badge)](https://www.jsdelivr.com/package/npm/o3-dapi-coinbase)
