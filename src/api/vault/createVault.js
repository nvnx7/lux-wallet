import { useMutation } from 'react-query';
import web3 from 'utils/web3';
import { LSP9Vault } from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';

const createVault = async params => {
  const { profileAddress, eoaAddress } = params;
  const vault = web3.eth.Contract(LSP9Vault.abi);

  const contracts = vault
    .deploy({
      data: LSP9Vault.bytecode,
      arguments: [profileAddress],
    })
    .send({
      from: eoaAddress,
    });

  return contracts;
};

export const useCreateVault = ({ profileAddress, eoaAddress }) => {
  return useMutation(() => createVault({ profileAddress, eoaAddress }), {
    onSuccess: () => {},
  });
};
