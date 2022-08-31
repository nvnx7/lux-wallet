import { useQuery } from 'react-query';
import ERC725 from '@erc725/erc725.js';
import digitalAssetMetadataSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import { ipfsGateway } from 'settings/config';
import { ipfsToUrl } from 'utils/ipfs';
import DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import web3, { web3Provider } from 'lib/web3';
import QueryKey from 'api/utils/query';

const config = { ipfsGateway };

/**
 * Fetches a Digital Asset's metadata + balance of giver ownerAddress
 * & returns formatted data
 */
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

  const contract = new web3.eth.Contract(DigitalAsset.abi, assetAddress);
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
    [QueryKey.ASSET_DATA, { assetAddress, ownerAddress }],
    () => getDigitalAsset({ assetAddress, ownerAddress }),
    { enabled: !!assetAddress && !!ownerAddress }
  );
};
