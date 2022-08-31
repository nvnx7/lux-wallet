import { useQuery } from 'react-query';
import ERC725 from '@erc725/erc725.js';
import keyManagerSchema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { web3Provider } from 'lib/web3';
import { ipfsGateway } from 'settings/config';
import QueryKey from 'api/utils/query';
const config = { ipfsGateway };

/**
 * Fetches list of permissioned addresses of a universal profile
 * & each address's allowed permissions
 */
const listPermissionedAddresses = async ({ upAddress }) => {
  const erc725 = new ERC725(keyManagerSchema, upAddress, web3Provider, config);
  const addresses = await erc725.getData('AddressPermissions[]').then(v => v.value);

  if (addresses?.length === 0) {
    return [];
  }

  const promises = addresses.map(address => {
    return erc725
      .getData({
        keyName: 'AddressPermissions:Permissions:<address>',
        dynamicKeyParts: address,
      })
      .then(perm => erc725.decodePermissions(perm.value))
      .then(permItem => {
        // Filter enabled permissions
        const permNames = Object.keys(permItem).filter(v => permItem[v]);
        return { address, permissions: permNames };
      });
  });

  const permList = await Promise.all(promises);

  return permList;
};

export const useListPermissionedAddresses = ({ upAddress }) => {
  return useQuery(
    [QueryKey.UP_PERMISSIONED, { upAddress }],
    () => listPermissionedAddresses({ upAddress }),
    {
      enabled: !!upAddress,
    }
  );
};
