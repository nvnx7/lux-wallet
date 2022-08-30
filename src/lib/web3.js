import Web3 from 'web3';
import { rpcEndpoint } from 'settings/config';

/**
 * Export of web3 object with provider set up
 */
export const web3Provider = new Web3.providers.HttpProvider(rpcEndpoint);
const web3 = new Web3(web3Provider);

export default web3;
