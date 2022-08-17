import KeyringController from 'eth-keyring-controller';
import { KEY_VAULTS } from 'utils/storage';

export const KeyringType = {
  HD_KEYRING: 'HD Key Tree',
  SIMPLE_KEYRING: 'Simple Key Pair',
};

const getVault = () => {
  return localStorage.getItem(KEY_VAULTS);
};

const setVault = data => {
  localStorage.setItem(KEY_VAULTS, data);
};

// let keyringController = null;

const vault = getVault();
// console.log('kc:vault:', vault);
const keyringController = new KeyringController({ initState: { vault } });
keyringController.fullUpdate();
keyringController.on('update', async (...args) => {
  console.log('persisted state');
  const state = keyringController.store.getState();
  // console.log({ args });
  // console.log(state);
  setVault(state.vault);
});

export default keyringController;
