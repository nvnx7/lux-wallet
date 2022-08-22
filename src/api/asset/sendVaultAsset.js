import { signAndSendTx } from 'api/utils/tx';
import { useMutation } from 'react-query';
import web3 from 'scripts/web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

const sendVaultAsset = async params => {
  const { accountAddress, profileAddress, fromVaultAddress, to, assetAddress, amount } = params;
  const amountWei = web3.utils.toWei(`${amount}`, 'ether');

  // Contracts
  const up = new web3.eth.Contract(UniversalProfile.abi, profileAddress);
  const vault = new web3.eth.Contract(LSP9Vault.abi, fromVaultAddress);
  const token = new web3.eth.Contract(LSP7DigitalAsset.abi, assetAddress);
  const kmAddress = await up.methods.owner().call();
  const km = new web3.eth.Contract(KeyManager.abi, kmAddress);

  // Payloads
  const tokenPayload = await token.methods.transfer(to, amountWei).encodeABI();
  const vaultPayload = await vault.methods
    .execute(0, fromVaultAddress, 0, tokenPayload)
    .encodeABI();
  const upPayload = await up.methods.execute(0, profileAddress, 0, vaultPayload).encodeABI();
  const data = await km.methods.execute(upPayload).encodeABI();

  const txData = {
    from: accountAddress,
    to: kmAddress,
    data,
    gas: 30000,
  };

  const receipt = await signAndSendTx(txData, accountAddress);

  return receipt;
};

export const useSendVaultAsset = () => {
  return useMutation(params => sendVaultAsset(params), {
    onSuccess: () => {},
  });
};
