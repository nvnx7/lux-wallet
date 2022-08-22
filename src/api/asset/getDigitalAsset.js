import { useQuery } from 'react-query';
import ERC725 from '@erc725/erc725.js';
import digitalAssetMetadataSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import { ipfsGateway } from 'settings/config';
import { ipfsToUrl } from 'utils/ipfs';
import LSP4DigitalAssetMetadata from '@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json';
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants.js';
import web3, { web3Provider } from 'scripts/web3';
const config = { ipfsGateway };

const isAssetNft = async assetAddress => {
  const asset = new web3.Contract(LSP4DigitalAssetMetadata.abi, assetAddress);
  const isNft = await asset.methods
    .supportsInterface(INTERFACE_IDS['LSP8IdentifiableDigitalAsset'])
    .call();
  return isNft;
};

export const getDigitalAsset = async params => {
  const { assetAddress, ownerAddress } = params;

  const asset = new ERC725(digitalAssetMetadataSchema, assetAddress, web3Provider, config);
  const data = await asset.fetchData(['LSP4TokenName', 'LSP4TokenSymbol', 'LSP4Metadata']);

  const assetData = {};
  data.forEach(d => {
    switch (d.name) {
      case 'LSP4TokenName':
        assetData.name = d.value;
        break;
      case 'LSP4TokenSymbol':
        assetData.symbol = d.value;
        break;
      case 'LSP4Metadata':
        assetData.description = d.value?.['LSP4Metadata']?.description;
        assetData.iconUrl = ipfsToUrl(d.value?.['LSP4Metadata']?.icon?.[0]?.url);
        break;
      default:
        break;
    }
  });

  const isNft = await isAssetNft(assetAddress);

  const contract = new web3.eth.Contract(LSP7DigitalAsset.abi, assetAddress);
  let balance = {};
  if (ownerAddress) {
    balance.wei = await contract.methods.balanceOf(ownerAddress).call();
    balance.lyx = web3.utils.fromWei(balance.wei, 'ether');
  }

  assetData.balance = balance;

  return assetData;
};

export const useGetDigitalAsset = ({ assetAddress, ownerAddress }) => {
  return useQuery(
    ['LSP7DigitalAsset', { assetAddress, ownerAddress }],
    () => getDigitalAsset({ assetAddress, ownerAddress }),
    { enabled: !!assetAddress && !!ownerAddress }
  );
};
