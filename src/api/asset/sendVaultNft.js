import { signAndSendTx } from 'api/utils/tx';
import { useMutation } from 'react-query';
import web3 from 'scripts/web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

/**
 * Send LSP8 Identifiable Digital Asset (nft) from Universal Profile contract
 */
const sendVaultNft = async params => {
  const { accountAddress, upAddress, from, to, nftAddress, tokenId, force } = params;

  // Expect `from` to be vault
  const vaultAddress = from;

  // Contracts
  const up = new web3.eth.Contract(UniversalProfile.abi, upAddress);
  const vault = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
  const nft = new web3.eth.Contract(LSP8IdentifiableDigitalAsset.abi, nftAddress);
  const kmAddress = await up.methods.owner().call();
  const km = new web3.eth.Contract(KeyManager.abi, kmAddress);

  // Payloads
  const nftPayload = await nft.methods
    .transfer(vaultAddress, to, tokenId, !!force, '0x')
    .encodeABI();
  const vaultPayload = await vault.methods.execute(0, nftAddress, 0, nftPayload).encodeABI();
  const upPayload = await up.methods.execute(0, vaultAddress, 0, vaultPayload).encodeABI();
  const txPayload = await km.methods.execute(upPayload).encodeABI();

  const txData = {
    from: accountAddress,
    to: kmAddress,
    data: txPayload,
    gas: 600_000,
  };

  const data = await signAndSendTx(txData, accountAddress);
  return data;
};

export const useSendVaultNft = () => {
  return useMutation(params => sendVaultNft(params), {
    onSuccess: () => {},
  });
};
