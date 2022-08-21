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

const vault = getVault();
const keyringController = new KeyringController({ initState: { vault } });
keyringController.fullUpdate();
keyringController.on('update', async (...args) => {
  const state = keyringController.store.getState();
  setVault(state.vault);
});

export default keyringController;
