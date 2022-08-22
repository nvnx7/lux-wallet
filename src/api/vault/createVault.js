import { useMutation } from 'react-query';
import web3 from 'scripts/web3';
import constants from '@lukso/lsp-smart-contracts/constants.js';
import LSP1UniversalReceiverDelegateVault from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { signAndSendTx } from 'api/utils/tx';

const URD_DATA_KEY = constants.ERC725YKeys.LSP0.LSP1UniversalReceiverDelegate;

/**
 * Deploys UniversalReceiverDelegateVault contract.
 * Returns created contract address.
 */
const deployURD = async ({ from }) => {
  const urdVault = new web3.eth.Contract(LSP1UniversalReceiverDelegateVault.abi);
  const data = urdVault
    .deploy({
      data: LSP1UniversalReceiverDelegateVault.bytecode,
    })
    .encodeABI();
  const tx = {
    from,
    data,
    gas: 5_000_000,
  };

  const res = await signAndSendTx(tx, from);
  return res.contractAddress;
};

/**
 * Deploys LSP9Vault contract.
 * Returns created contract address.
 */
const deployVault = async ({ from, profileAddress }) => {
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

  const res = await signAndSendTx(txData, from);

  return res.contractAddress;
};

const createVault = async params => {
  const { profileAddress, from } = params;

  // Contracts
  const urdAddress = await deployURD({ from });
  const vaultAddress = await deployVault({ from, profileAddress });
  const vault = new web3.eth.Contract(LSP9Vault.abi, vaultAddress);
  const up = new web3.eth.Contract(UniversalProfile.abi, profileAddress);
  const kmAddress = await up.methods.owner().call();
  const km = new web3.eth.Contract(LSP6KeyManager.abi, kmAddress);

  // Payloads
  const setDataPayload = await vault.methods['setData(bytes32,bytes)'](
    URD_DATA_KEY,
    urdAddress
  ).encodeABI();
  const executePayload = await up.methods
    .execute(
      0, // OPERATION CALL
      vaultAddress,
      0, // value
      setDataPayload
    )
    .encodeABI();

  const data = await km.methods.execute(executePayload).encodeABI();
  const txData = { from, data, to: kmAddress, gas: 600_000 };
  const res = await signAndSendTx(txData, from);
  return res;
};

export const useCreateVault = () => {
  return useMutation(params => createVault(params), {
    onSuccess: () => {},
  });
};
