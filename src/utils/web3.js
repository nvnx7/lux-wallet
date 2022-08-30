import web3 from 'lib/web3';
import { explorerEndpoint } from 'settings/config';
import { supportedNetworks } from 'settings/constants';

/**
 * Determine if two hex values (e.g. addresses) are equal
 */
export const areEqualHex = (hex1, hex2) => {
  return hex1.toLowerCase() === hex2.toLowerCase();
};

/**
 * Regex check an address format
 */
export const isValidAddress = address => {
  if (!address) {
    return false;
  }

  const addressRegex = /^0x[A-Fa-f0-9]{40}$/i;
  return addressRegex.test(address);
};

/**
 * Abbreviates a hex string in the middle &
 * returns abbreviated string
 */
export const abbreviateHex = (hex, length = 9) => {
  if (!hex) return '';
  const startIdx = Math.ceil(length / 2) + 1;
  const endIdx = Math.floor(length / 2) - 1;

  return hex.slice(0, startIdx) + '...' + hex.slice(-endIdx);
};

/**
 * Helper to get url to an address/transaction on the block explorer
 */
export const getExplorerLink = (hexString, type = 'address') => {
  if (!hexString) return explorerEndpoint;
  return `${explorerEndpoint}/${type}/${hexString}`;
};

/**
 * Get supported network data by chain id
 */
export const getNetworkInfo = chainId => {
  return supportedNetworks.find(network => network.chainId === chainId);
};

/**
 * Pads a hex/number string to 32 bytes & returns padded hex
 */
export const padToBytes32Hex = hex => {
  if (!hex.startsWith('0x')) {
    hex = web3.utils.numberToHex(hex);
  }
  return '0x' + '0'.repeat(66 - hex.length) + hex.slice(2);
};

/**
 * Extract public address from private key
 */
export const privateKeyToAddress = pk => {
  const account = web3.eth.accounts.privateKeyToAccount(pk);
  return account.address;
};

/**
 * Converts wei unit to lyx unit
 */
export const weiToLyx = amt => {
  if (!amt) return '0';
  return parseFloat(web3.utils.fromWei(`${amt}`, 'ether')).toFixed(2);
};
