import { useQuery } from 'react-query';
import ERC725 from '@erc725/erc725.js';
import digitalAssetMetadataSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import { ipfsGateway } from 'settings/config';
import { ipfsToUrl } from 'utils/ipfs';
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import web3, { web3Provider } from 'scripts/web3';

const config = { ipfsGateway };

export const getDigitalAsset = async params => {
  const { assetAddress, profileAddress } = params;

  const asset = new ERC725(digitalAssetMetadataSchema, assetAddress, web3Provider, config);
  const data = await asset.fetchData(['LSP4TokenName', 'LSP4TokenSymbol', 'LSP4Metadata']);

  const tokenData = {};
  data.forEach(d => {
    switch (d.name) {
      case 'LSP4TokenName':
        tokenData.name = d.value;
        break;
      case 'LSP4TokenSymbol':
        tokenData.symbol = d.value;
        break;
      case 'LSP4Metadata':
        tokenData.description = d.value?.['LSP4Metadata']?.description;
        tokenData.iconUrl = ipfsToUrl(d.value?.['LSP4Metadata']?.icon?.[0]?.url);
        break;
      default:
        break;
    }
  });

  const contract = new web3.eth.Contract(LSP7DigitalAsset.abi, assetAddress);
  const balance = await contract.methods.balanceOf(profileAddress).call();
  tokenData.balance = web3.utils.fromWei(balance, 'ether');

  return tokenData;
};

export const useGetDigitalAsset = ({ assetAddress, profileAddress }) => {
  return useQuery(
    ['LSP7DigitalAsset', { assetAddress, profileAddress }],
    () => getDigitalAsset({ assetAddress, profileAddress }),
    { enabled: !!assetAddress && !!profileAddress }
  );
};
