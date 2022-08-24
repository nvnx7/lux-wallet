import { useQuery } from 'react-query';
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import web3 from 'scripts/web3';

/**
 * Lists all token (nft) ids owned by an address
 */
const listNfts = async ({ nftAddress, ownerAddress }) => {
  const nft = new web3.eth.Contract(LSP8IdentifiableDigitalAsset.abi, nftAddress);
  const bytes32Ids = await nft.methods.tokenIdsOf(ownerAddress).call();
  const ids = bytes32Ids.map(id => web3.utils.toBN(id).toString());
  return ids;
};

export const useListNfts = async ({ nftAddress, ownerAddress }) => {
  return useQuery(
    ['LSP8IdentifiableDigitalAssets', { nftAddress, ownerAddress }],
    () => listNfts({ nftAddress, ownerAddress }),
    { enabled: !!nftAddress && !!ownerAddress }
  );
};
