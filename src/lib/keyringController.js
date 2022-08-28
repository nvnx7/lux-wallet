import KeyringController from 'eth-keyring-controller';
import { KEY_KEYRING_VAULTS } from 'utils/storage';

export const KeyringType = {
  HD_KEYRING: 'HD Key Tree',
  SIMPLE_KEYRING: 'Simple Key Pair',
};

const getVault = () => {
  return localStorage.getItem(KEY_KEYRING_VAULTS);
};

const setVault = data => {
  localStorage.setItem(KEY_KEYRING_VAULTS, data);
};

const vault = getVault();

/**
 * Keyring controller to securely manage the keyrings containing
 * added account credentials
 */
const keyringController = new KeyringController({ initState: { vault } });
keyringController.fullUpdate();
keyringController.on('update', async () => {
  const state = keyringController.store.getState();
  setVault(state.vault);
});

export default keyringController;
