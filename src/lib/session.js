import { isExtension } from 'settings/config';

const chrome = window.chrome;

// Dummy for non-extension dev environment
const noop = new Promise(res => res());

/**
 * These functions help maintain a session as long browser window is
 * open & user unlocked already the wallet. This is to avoid forcing user
 * to submit password every time user opens popup
 */
export const restoreSessionToken = () => {
  if (!isExtension) return noop;
  return chrome.runtime.sendMessage({ type: 'get' });
};

export const saveSessionToken = secret => {
  if (!isExtension) return noop;
  chrome.runtime.sendMessage({ type: 'set', payload: secret });
};

export const removeSessionToken = () => {
  if (!isExtension) return noop;
  chrome.runtime.sendMessage({ type: 'remove' });
};
