import web3 from 'scripts/web3';
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
  const startIdx = Math.ceil(length / 2) + 1;
  const endIdx = Math.floor(length / 2) - 1;

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

export const makeBatchCall = (web3, calls) => {
  let batch = new web3.BatchRequest();

  let promises = calls.map(call => {
    return new Promise((res, rej) => {
      let req = call.request(null, (err, data) => {
        if (err) rej(err);
        else res(data);
      });
      batch.add(req);
    });
  });
  batch.execute();

  return Promise.all(promises);
};

export const padToBytes32Hex = hex => {
  if (!hex.startsWith('0x')) {
    hex = web3.utils.numberToHex(hex);
  }
  return '0x' + '0'.repeat(66 - hex.length) + hex.slice(2);
};
