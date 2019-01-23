import { sendMessage } from '../../messaging';
import { Command } from '../../constants';

interface GetNetworksOutput {
  networks: string[];
  defaultNetwork: string;
}

export function getNetworks(): Promise<GetNetworksOutput> {
  return sendMessage({
    command: Command.getNetworks,
    timeout: 2500,
  });
}
