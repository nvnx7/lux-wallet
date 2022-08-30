export const KEY_KEYRING_VAULTS = 'krVaults';
export const KEY_ACCOUNTS_DATA = 'accounts';
export const KEY_PREFERENCES = 'preferences';
export const KEY_IMPORTED_LEGACY_ASSETS = 'legacyAssets';
export const KEY_UP_VAULTS = 'upVaults';
/**
 * @note Using localStorage for simple stores for development version only.
 * Will be replaced by chrome.storage api later
 */
export const getItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

export const storeItem = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
