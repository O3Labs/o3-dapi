import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

export interface GetNetworksOutput {
  networks: string[];
  defaultNetwork: string;
}

export function getNetworks(): Promise<GetNetworksOutput> {
  return sendMessage({
    command: Command.getNetworks,
  });
}
