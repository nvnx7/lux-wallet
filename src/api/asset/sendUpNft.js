import { signAndSendTx } from 'api/utils/tx';
import { useMutation } from 'react-query';
import web3 from 'scripts/web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

/**
 * Send LSP8 Identifiable Digital Asset (nft) from Universal Profile contract
 */
const sendUpNft = async params => {
  const { accountAddress, nftAddress, from, to, tokenId, force } = params;

  // Expect `from` to be UP
  const upAddress = from;

  // Contracts
  const up = new web3.eth.Contract(UniversalProfile.abi, upAddress);
  const nft = new web3.eth.Contract(LSP8IdentifiableDigitalAsset.abi, nftAddress);
  const kmAddress = await up.methods.owner().call();
  const km = new web3.eth.Contract(KeyManager.abi, kmAddress);

  // Payloads
  const nftPayload = await nft.methods.transfer(upAddress, to, tokenId, !!force, '0x').encodeABI();
  const upPayload = await up.methods.execute(0, nftAddress, 0, nftPayload).encodeABI();
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

export const useSendUpNft = () => {
  return useMutation(params => sendUpNft(params), {
    onSuccess: () => {},
  });
};