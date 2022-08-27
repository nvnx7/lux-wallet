import web3 from 'lib/web3';
import { explorerEndpoint } from 'settings/config';
import { supportedNetworks } from 'settings/constants';

export const areEqualHex = (hex1, hex2) => {
  return hex1.toLowerCase() === hex2.toLowerCase();
};

export const isValidAddress = address => {
  if (!address) {
    return false;
  }

  const addressRegex = /^0x[A-Fa-f0-9]{40}$/i;
  return addressRegex.test(address);
};

export const abbreviateHex = (hex, length = 9) => {
  if (!hex) return '';
  const startIdx = Math.ceil(length / 2) + 1;
  const endIdx = Math.floor(length / 2) - 1;

  return hex.slice(0, startIdx) + '...' + hex.slice(-endIdx);
};

export const getExplorerLink = (hexString, type = 'address') => {
  if (!hexString) return explorerEndpoint;
  return `${explorerEndpoint}/${type}/${hexString}`;
};

export const getNetworkInfo = chainId => {
  return supportedNetworks.find(network => network.chainId === chainId);
};

export const padToBytes32Hex = hex => {
  if (!hex.startsWith('0x')) {
    hex = web3.utils.numberToHex(hex);
  }
  return '0x' + '0'.repeat(66 - hex.length) + hex.slice(2);
};

export const privateKeyToAddress = pk => {
  const account = web3.eth.accounts.privateKeyToAccount(pk);
  return account.address;
};

export const weiToLyx = amt => {
  if (!amt) return '0';
  return parseFloat(web3.utils.fromWei(`${amt}`, 'ether')).toFixed(2);
};
