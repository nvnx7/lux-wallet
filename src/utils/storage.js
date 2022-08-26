export const KEY_VAULTS = 'vaults';
export const KEY_ACCOUNTS_DATA = 'accounts';
export const KEY_PREFERENCES = 'preferences';
export const KEY_IMPORTED_LEGACY_ASSETS = 'legacyAssets';

export const getItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

export const storeItem = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getVault = () => {
  return getItem(KEY_VAULTS);
};

export const storeVault = vault => {
  return storeItem(KEY_VAULTS, vault);
};

export const getAccountsData = () => {
  const data = getItem(KEY_VAULTS);
  JSON.parse(data);
};

export const storeAccountData = data => {
  return storeItem(KEY_ACCOUNTS_DATA, data);
};
