import { useQuery } from 'react-query';
import ERC725 from '@erc725/erc725.js';
import web3 from 'lib/web3';
import receivedVaultsSchema from '@erc725/erc725.js/schemas/LSP10ReceivedVaults.json';
import { ipfsGateway } from 'settings/config';
const config = { ipfsGateway };

/**
 * Lists all vaults owned by the universal profile
 */
export const listVaults = async ({ upAddress }) => {
  const vaults = new ERC725(receivedVaultsSchema, upAddress, web3.currentProvider, config);
  return vaults.fetchData('LSP10Vaults[]').then(v => v.value);
};

export const useListVaults = ({ upAddress }) => {
  return useQuery(
    ['LSP8IdentifiableDigitalAssetsX', { upAddress }],
    () => listVaults({ upAddress }),
    { enabled: !!upAddress }
  );
};
