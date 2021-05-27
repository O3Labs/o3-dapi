import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

interface BalanceRequest {
  address: string; // Address to check balance(s)
  contracts?: string[]; // Asset symbol or script hash to check balance
}

export interface GetBalanceArgs {
  params: BalanceRequest | BalanceRequest[];
  network?: string;
}

export interface BalanceResults {
  [address: string]: Balance[];
}

interface Balance {
  contract: string;
  symbol: string;
  amount: string;
}

export function getBalance(data: GetBalanceArgs): Promise<BalanceResults> {
  if (!Array.isArray(data.params)) {
    data.params = [data.params];
  }

  data.params.forEach(({ address, contracts }, index) => {
    if (contracts && !Array.isArray(contracts)) {
      data.params[index] = {
        address,
        contracts: [contracts],
      };
    }
  });

  return sendMessage({
    command: Command.getBalance,
    data,
  });
}
