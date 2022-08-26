import keyringController from 'lib/keyringController';
import web3 from 'lib/web3';
import { now } from 'utils/datetime';

/**
 * Signs the tx data & sends it, returning tx hash
 */
export const signAndSendTx = async (txData, eoaAddress) => {
  const pk = await keyringController.exportAccount(eoaAddress);
  const signed = await web3.eth.accounts.signTransaction(txData, pk);
  return new Promise((resolve, reject) => {
    web3.eth
      .sendSignedTransaction(signed.rawTransaction)
      .once('transactionHash', txHash => {
        resolve({
          hash: txHash,
          from: txData.from,
          to: txData.to,
          value: txData.value || '0',
          status: 'pending',
          timestamp: now(),
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
};
