import { useQuery } from 'react-query';
import ERC725 from '@erc725/erc725.js';
import receivedVaultsSchema from '@erc725/erc725.js/schemas/LSP10ReceivedVaults.json';
import { web3Provider } from 'utils/web3';
import { ipfsGateway } from 'settings/config';

const config = { ipfsGateway };

export const listReceivedVaults = async params => {
  const { profileAddress } = params;
  const vaults = new ERC725(receivedVaultsSchema, profileAddress, web3Provider, config);
  const data = await vaults.fetchData('LSP10Vaults');
  return data.value;
};

export const useListReceivedVaults = ({ profileAddress }) => {
  return useQuery(
    ['LSP10ReceivedVaults', { profileAddress }],
    () => listReceivedVaults({ profileAddress }),
    { enabled: !!profileAddress }
  );
};
