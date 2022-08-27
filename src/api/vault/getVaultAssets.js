import ERC725 from '@erc725/erc725.js';
import { useQuery } from 'react-query';
import receivedAssetsSchema from '@erc725/erc725.js/schemas/LSP5ReceivedAssets.json';
import { web3Provider } from 'lib/web3';
import { ipfsGateway } from 'settings/config';
const config = { ipfsGateway };

const getVaultAssets = async ({ vaultAddress }) => {
  const assets = new ERC725(receivedAssetsSchema, vaultAddress, web3Provider, config);
  const result = await assets.fetchData('LSP5ReceivedAssets[]');
  return result.value || [];
};

export const useGetVaultAssets = ({ vaultAddress }) => {
  return useQuery(
    ['LSP5ReceivedAssets', { vaultAddress }],
    () => getVaultAssets({ vaultAddress }),
    {
      enabled: !!vaultAddress,
    }
  );
};
