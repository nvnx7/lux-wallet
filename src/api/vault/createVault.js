import { useMutation } from 'react-query';
import web3 from 'scripts/web3';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import { signAndSendTx } from 'api/utils/tx';

const createVault = async params => {
  const { profileAddress, from } = params;
  const vault = new web3.eth.Contract(LSP9Vault.abi);

  const encodedData = vault
    .deploy({
      data: LSP9Vault.bytecode,
      arguments: [profileAddress],
    })
    .encodeABI();

  const txData = {
    from,
    data: encodedData,
    gas: 3_00_000,
  };

  const data = await signAndSendTx(txData, from);

  return data;
};

export const useCreateVault = () => {
  return useMutation(params => createVault(params), {
    onSuccess: () => {},
  });
};
