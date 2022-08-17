import Web3 from 'web3';
import { rpcEndpoint } from 'settings/config';

export const web3Provider = new Web3.providers.HttpProvider(rpcEndpoint);
const web3 = new Web3(web3Provider);

export const weiToEth = wei => {
  return web3.utils.fromWei(wei, 'ether');
};

export default web3;

export const abbreviateAddress = (address, length = 9) => {
  const startIdx = Math.ceil(length / 2);
  const endIdx = Math.floor(length / 2);

  return address.slice(0, startIdx) + '...' + address.slice(-endIdx);
};
