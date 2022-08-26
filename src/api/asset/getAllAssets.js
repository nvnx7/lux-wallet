import ERC725 from '@erc725/erc725.js';
import { useQuery } from 'react-query';
import receivedAssetsSchema from '@erc725/erc725.js/schemas/LSP5ReceivedAssets.json';
import issuedAssetsSchema from '@erc725/erc725.js/schemas/LSP12IssuedAssets.json';
import LSP4DigitalAssetMetadata from '@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants.js';
import web3, { web3Provider } from 'lib/web3';
import { ipfsGateway } from 'settings/config';
import { makeBatchCall } from 'utils/web3';
const config = { ipfsGateway };

/**
 * Batch call to distinguish b/w tokens & NFTs
 */
async function batchCallIsNft(assetAddresses) {
  if (assetAddresses.length === 0) return [];

  const calls = assetAddresses.map(assetAddress => {
    const asset = new web3.eth.Contract(LSP4DigitalAssetMetadata.abi, assetAddress);
    return asset.methods.supportsInterface(INTERFACE_IDS['LSP8IdentifiableDigitalAsset']).call;
  });
  const results = await makeBatchCall(web3, calls);
  return results;
}

/**
 * Get all assets - received and issued - for an address
 */
const allAssetsSchema = [...receivedAssetsSchema, ...issuedAssetsSchema];
export const getAllAssets = async ({ address }) => {
  const assets = new ERC725(allAssetsSchema, address, web3Provider, config);
  const data = await assets.fetchData(['LSP5ReceivedAssets[]', 'LSP12IssuedAssets[]']);

  const received = data.find(v => v.name === 'LSP5ReceivedAssets[]')?.value || [];
  const issued = data.find(v => v.name === 'LSP12IssuedAssets[]')?.value || [];

  const isReceivedNft = await batchCallIsNft(received);
  const isIssuedNft = await batchCallIsNft(issued);

  const result = {
    issued: { tokens: [], nfts: [] },
    received: { tokens: [], nfts: [] },
  };

  received.forEach((address, idx) => {
    if (isReceivedNft[idx]) result.received.nfts.push(address);
    else result.received.tokens.push(address);
  });

  issued.forEach((address, idx) => {
    if (isIssuedNft[idx]) result.issued.nfts.push(address);
    else result.issued.tokens.push(address);
  });

  return result;
};

export const useGetAllAssets = ({ address }) => {
  return useQuery(['LSP5LSP12Assets', { address }], () => getAllAssets({ address }), {
    enabled: !!address,
  });
};
