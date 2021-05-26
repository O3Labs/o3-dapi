import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

interface BalanceRequest {
  address: string; // Address to check balance(s)
  assets?: string[]; // Asset symbol or script hash to check balance
  fetchUTXO?: boolean;
}

export interface GetBalanceArgs {
  params: BalanceRequest|BalanceRequest[];
  network?: string;
}

export interface BalanceResults {
  [address: string]: Balance[];
}

interface Balance {
  assetID: string;
  symbol: string;
  amount: string;
}

export function getBalance(data: GetBalanceArgs): Promise<BalanceResults> {
  if (!Array.isArray(data.params)) {
    data.params = [data.params];
  }

  data.params.forEach(({address, assets, fetchUTXO}, index) => {
    if (assets && !Array.isArray(assets)) {
      data.params[index] = {
        address,
        assets: [assets],
        fetchUTXO,
      };
    }
  });

  return sendMessage({
    command: Command.getBalance,
    data,
  })
  .then(data => (
    // Update to dapi protocol, change scriptHash to assetID
    // can be removed in the case that all wallets update to assetID,
    // and none left using scriptHash, including already deployed versions
    Object.keys(data).reduce((accum, key) => {
      accum[key] = data[key].map(({assetID, scriptHash, symbol, amount, unspent}) => ({
        assetID: assetID || scriptHash,
        symbol,
        amount,
        unspent,
      }));
      return accum;
    }, {})
  ));
}
