declare const global: any;
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : global;
import * as assets from './modules/assets';
import * as identity from './modules/identity';
import * as message from './modules/message';
import * as sc from './modules/sc';
import * as tx from './modules/tx';
import * as network from './modules/network';
import * as stake from './modules/stake';
import * as oep4 from './modules/oep4';

import { getProvider } from './modules/getProvider';
import { getAccount, getPublicKey } from './modules/account';
import { getNetworks } from './modules/getNetworks';
import { disconnect } from './modules/disconnect';

import { ParameterType } from './modules/sc/common';

import { addEventListener, removeEventListener } from './modules/eventListener';

import {
  EventName,
  BLOCKCHAIN,
} from './constants';

import { initMessaging } from './messaging';

class O3dapiOnt {

  static blockchain = BLOCKCHAIN;

  isAvailable = Boolean(safeWindow._o3dapi.isAvailable);
  getProvider = getProvider;
  getNetworks = getNetworks;
  getAccount = getAccount;
  getPublicKey = getPublicKey;
  disconnect = disconnect;

  identity = {
    getIdentity: identity.getIdentity,
    getDDO: identity.getDDO,
    addAttributes: identity.addAttributes,
    removeAttribute: identity.removeAttribute,
  };

  message = {
    signMessage: message.signMessage,
    verifyMessage: message.verifyMessage,
    // signMessageHash: message.signMessageHash,
    // verifyMessageHash: message.verifyMessageHash,
  };

  network = {
    getNodeCount: network.getNodeCount,
    getBlockHeight: network.getBlockHeight,
    getMerkleProof: network.getMerkleProof,
    getBlock: network.getBlock,
    getBlockHash: network.getBlockHash,
    getVersion: network.getVersion,
  };

  tx = {
    getBlockHeightByTxHash: tx.getBlockHeightByTxHash,
    getMempoolTxCount: tx.getMempoolTxCount,
    getMempoolTxState: tx.getMempoolTxState,
    getSmartCodeEvent: tx.getSmartCodeEvent,
    getGasPrice: tx.getGasPrice,
    getBlockTxsByHeight: tx.getBlockTxsByHeight,
    getTransaction: tx.getTransaction,
  };

  assets = {
    getAllowance: assets.getAllowance,
    getBalance: assets.getBalance,
    getGrantOng: assets.getGrantOng,
    getUnboundOng: assets.getUnboundOng,
    send: assets.send,
  };

  sc = {
    getContract: sc.getContract,
    getStorage: sc.getStorage,
    invoke: sc.invoke,
    invokeRead: sc.invokeRead,
    deploy: sc.deploy,
  };

  stake = {
    getStakeRoundInfo: stake.getStakeRoundInfo,
    getNodeList: stake.getNodeList,
    getTotalStake: stake.getTotalStake,
    getNodeStakeInfo: stake.getNodeStakeInfo,
    getStakedClaimableOng: stake.getStakedClaimableOng,
    getStakedClaimableOngRewards: stake.getStakedClaimableOngRewards,

    addStake: stake.addStake,
    requestStakeWithdraw: stake.requestStakeWithdraw,
    withdrawStake: stake.withdrawStake,
    claimStakedOng: stake.claimStakedOng,
    claimStakedOngRewards: stake.claimStakedOngRewards,
  };

  oep4 = {
    getAllowance: oep4.getAllowance,
    getBalanceOf: oep4.getBalanceOf,
    getTotalSupply: oep4.getTotalSupply,
    getSymbol: oep4.getSymbol,
    getDecimals: oep4.getDecimals,
    getName: oep4.getName,
    getTokenDetails: oep4.getTokenDetails,

    init: oep4.init,
    transfer: oep4.transfer,
    transferMulti: oep4.transferMulti,
    approve: oep4.approve,
    transferFrom: oep4.transferFrom,
  };

  addEventListener = addEventListener;
  removeEventListener = removeEventListener;

  Constants = {
    EventName,
    ParameterType,
  };

  constructor(sendMessageMethod, addEventListenerMethod) {
    initMessaging(sendMessageMethod, addEventListenerMethod);
  }
}

export default O3dapiOnt;
