import { sendSignedTx } from 'api/utils/tx';
import { useMutation } from 'react-query';
import web3 from 'lib/web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import { logError } from 'utils/logger';
import useSentTxStore from 'hooks/useSentTxStore';

/**
 * Send LSP7 Digital Asset (token) from Universal Profile contract
 */
const sendUpToken = async params => {
  const { accountAddress, tokenAddress, from, to, amount, force } = params;
  const amountWei = web3.utils.toWei(`${amount}`, 'ether');

  // Expect from to be UP
  const upAddress = from;

  // Contracts
  const up = new web3.eth.Contract(UniversalProfile.abi, upAddress);
  const token = new web3.eth.Contract(LSP7DigitalAsset.abi, tokenAddress);
  const kmAddress = await up.methods.owner().call();
  const km = new web3.eth.Contract(KeyManager.abi, kmAddress);

  // Payloads
  const tokenPayload = await token.methods
    .transfer(upAddress, to, amountWei, !!force, '0x')
    .encodeABI();
  const upPayload = await up.methods.execute(0, tokenAddress, 0, tokenPayload).encodeABI();
  const txPayload = await km.methods.execute(upPayload).encodeABI();
  const txData = {
    from: accountAddress,
    to: kmAddress,
    data: txPayload,
    gas: 600_000,
  };

  const data = await sendSignedTx(txData, accountAddress);

  return data;
};

export const useSendUpToken = ({ accountAddress }) => {
  const { storeSentTx } = useSentTxStore({ accountAddress });
  return useMutation(params => sendUpToken(params), {
    onSuccess: tx => storeSentTx(tx),
    onError: logError,
  });
};
