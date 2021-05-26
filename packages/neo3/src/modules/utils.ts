import { Network } from '../constants';

export const methodSelector = (self, methodName, dapiMethod, requireClientNetwork = true) => {
  return data => {
    const network = data && data.network;
    const isClientNetwork = !requireClientNetwork || network === Network.MainNet || network === Network.TestNet;
    const clientMethod = self.clientPlugin && self.clientPlugin[methodName];
    const method = isClientNetwork && clientMethod ? clientMethod : dapiMethod;
    return method(data);
  };
};
