import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

interface BalanceRequest {
  address: string; // Address to check balance(s)
  assets?: string[]; // Asset symbol or script hash to check balance
  fetchUTXO?: boolean;
}

interface GetBalanceArgs {
  params: BalanceRequest|BalanceRequest[];
  network?: string;
}

interface BalanceResults {
  [address: string]: Balance[];
}

interface Balance {
  scriptHash: string;
  symbol: string;
  amount: string;
}

export function getBalance(data: GetBalanceArgs): Promise<BalanceResults> {
  if (!Array.isArray(data.params)) {
    data.params = [data.params];
  }

  data.params.forEach(({address, assets}, index) => {
    if (assets && !Array.isArray(assets)) {
      data.params[index] = {
        address,
        assets: [assets],
      };
    }
  });

  return sendMessage({
    command: Command.getBalance,
    data,
  });
}
