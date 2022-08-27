import { useMutation } from 'react-query';
import web3 from 'lib/web3';
import ERC725 from '@erc725/erc725.js';
import { ERC725YKeys } from '@lukso/lsp-smart-contracts/constants.js';
import UniversalReceiverDelegateVault from '@lukso/lsp-smart-contracts/artifacts/LSP1UniversalReceiverDelegateVault.json';
import Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import receivedVaultsSchema from '@erc725/erc725.js/schemas/LSP10ReceivedVaults.json';
import { sendSignedTxAndWait } from 'api/utils/tx';
import { ipfsGateway } from 'settings/config';
import { logError } from 'utils/logger';
const config = { ipfsGateway };

const URD_DATA_KEY = ERC725YKeys.LSP0.LSP1UniversalReceiverDelegate;

/**
 * Deploys URD for vault
 * Returns created contract address.
 */
const deployURD = async ({ accountAddress }) => {
  const urdVault = new web3.eth.Contract(UniversalReceiverDelegateVault.abi);
  const data = urdVault
    .deploy({
      data: UniversalReceiverDelegateVault.bytecode,
    })
    .encodeABI();
  const tx = {
    from: accountAddress,
    data,
    gas: 5_000_000,
  };

  const res = await sendSignedTxAndWait(tx, accountAddress);
  return res.contractAddress;
};

/**
 * Deploys Vault contract.
 * Returns created contract address.
 */
const deployVault = async ({ accountAddress, upAddress }) => {
  const vault = new web3.eth.Contract(Vault.abi);

  const encodedData = vault
    .deploy({
      data: Vault.bytecode,
      arguments: [upAddress],
    })
    .encodeABI();

  const txData = {
    from: accountAddress,
    data: encodedData,
    gas: 300_000,
  };

  console.log({ txData });

  const res = await sendSignedTxAndWait(txData, accountAddress);
  console.log({ res });

  return res.contractAddress;
};

/**
 * Manually register a vault to Universal Profile's LSP10Vaults[]
 * NOTE: This is used as temporary fix because of a bug that fails the
 * auto registering vaults
 */
const schema = receivedVaultsSchema.find(v => v.name === 'LSP10Vaults[]');
const registerVaultToUP = async ({ accountAddress, upAddress, vaultAddress }) => {
  const profile = new ERC725(schema, upAddress, web3.currentProvider, config);
  const encodedData = profile.encodeData({
    keyName: 'LSP10Vaults[]',
    value: [vaultAddress],
  });

  // Contracts
  const up = new web3.eth.Contract(UniversalProfile.abi, upAddress);
  const kmAddress = await up.methods.owner().call();
  const km = new web3.eth.Contract(KeyManager.abi, kmAddress);

  // Payloads
  const upPayload = await up.methods['setData(bytes32[],bytes[])'](
    encodedData.keys,
    encodedData.values
  ).encodeABI();

  const txPayload = await km.methods.execute(upPayload).encodeABI();
  const tx = {
    from: accountAddress,
    to: kmAddress,
    data: txPayload,
    gas: 300_000,
  };
  const res = await sendSignedTxAndWait(tx, accountAddress);
  return res;
};

const createVault = async params => {
  const { upAddress, accountAddress } = params;

  // Contracts
  const urdAddress = await deployURD({ accountAddress });
  console.log({ urdAddress });
  const vaultAddress = await deployVault({ accountAddress, upAddress });

  console.log({ vaultAddress, urdAddress });

  // Proceed to set URD to vault
  const vault = new web3.eth.Contract(Vault.abi, vaultAddress);
  const up = new web3.eth.Contract(UniversalProfile.abi, upAddress);
  const kmAddress = await up.methods.owner().call();
  const km = new web3.eth.Contract(KeyManager.abi, kmAddress);

  // Payloads
  const setDataPayload = await vault.methods['setData(bytes32,bytes)'](
    URD_DATA_KEY,
    urdAddress
  ).encodeABI();
  const executePayload = await up.methods.execute(0, vaultAddress, 0, setDataPayload).encodeABI();

  const data = await km.methods.execute(executePayload).encodeABI();
  const txData = { from: accountAddress, data, to: kmAddress, gas: 600_000 };
  const res = await sendSignedTxAndWait(txData, accountAddress);

  console.log({ res });

  // Register created vault to universal profile
  // NOTE: This is manually done for now due to an implementation
  // bug in LSP contracts
  // await registerVaultToUP({ accountAddress, upAddress, vaultAddress });

  return vaultAddress;
};

export const useCreateVault = () => {
  return useMutation(params => createVault(params), {
    onError: logError,
  });
};
