import { explorerEndpoint } from 'settings/config';
import { supportedNetworks } from 'settings/constants';

export const areEqualAddresses = (address1, address2) => {
  return address1.toLowerCase() === address2.toLowerCase();
};

export const isValidAddress = address => {
  if (!address) {
    return false;
  }

  const addressRegex = /^0x[A-Fa-f0-9]{40}$/i;
  return addressRegex.test(address);
};

export const abbreviateAddress = (address, length = 9) => {
  const startIdx = Math.ceil(length / 2);
  const endIdx = Math.floor(length / 2);

  return address.slice(0, startIdx) + '...' + address.slice(-endIdx);
};

export const getExplorerLink = address => {
  if (!address) return explorerEndpoint;
  return `${explorerEndpoint}/address/${address}`;
};

export const getNetworkInfo = chainId => {
  console.log({ chainId });
  return supportedNetworks.find(network => network.chainId === chainId);
};
