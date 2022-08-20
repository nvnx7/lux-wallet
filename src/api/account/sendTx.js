import { useMutation } from 'react-query';
import keyringController from 'scripts/keyringController';
import web3 from 'utils/web3';

export const signAndSendTx = async ({ tx, address }) => {
  const signedTx = await keyringController.signTransaction(tx, address);
  const result = await web3.eth.sendSignedTransaction(signedTx);

  return result;
};

export const useSendTx = () => {
  return useMutation(data => signAndSendTx(data));
};
