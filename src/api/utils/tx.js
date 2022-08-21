import keyringController from 'scripts/keyringController';
import web3 from 'scripts/web3';

export const signAndSendTx = async (txData, from) => {
  const pk = await keyringController.exportAccount(from);
  const signed = await web3.eth.accounts.signTransaction(txData, pk);
  const tx = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  return {
    transactionHash: tx.transactionHash,
    blockHash: tx.blockHash,
    blockNumber: tx.blockNumber,
    from: tx.from,
    to: tx.to,
    gasUsed: tx.gasUsed,
    contractAddress: tx.contractAddress,
    status: tx.status,
  };
};
