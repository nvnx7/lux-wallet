import { useQuery } from 'react-query';
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import web3 from 'lib/web3';
import { QueryKey } from 'api/utils/query';

/**
 * Lists all token (nft) ids owned by an address
 */
export const listNfts = async ({ nftAddress, ownerAddress }) => {
  const nft = new web3.eth.Contract(LSP8IdentifiableDigitalAsset.abi, nftAddress);
  const bytes32Ids = await nft.methods.tokenIdsOf(ownerAddress).call();
  const ids = bytes32Ids.map(id => web3.utils.toBN(id).toString());
  return ids;
};

export const useListNfts = ({ nftAddress, ownerAddress }) => {
  return useQuery(
    [QueryKey.NFTS_LIST, { nftAddress, ownerAddress }],
    () => listNfts({ nftAddress, ownerAddress }),
    { enabled: !!nftAddress && !!ownerAddress }
  );
};
