/* eslint-disable no-undef */
console.log('Background script running!');

const KEY_SECRET = 'secret';

/**
 * In memory secret, persists only as long as browser is open.
 * This is to avoid forcing user to login with password every time user opens
 * extension popup
 * @note THIS IS FOR DEVELOPMENT ONLY. PROBABLY SHOULD BE REPLACED
 * WITH A MORE SECURE ALTERNATIVE
 */
chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  switch (req.type) {
    case 'set':
      chrome.storage.session.set({ [KEY_SECRET]: req.payload });
      return false;
    case 'get':
      chrome.storage.session.get(KEY_SECRET).then(data => sendRes({ payload: data[KEY_SECRET] }));
      return true;
    case 'remove':
      chrome.storage.session.remove(KEY_SECRET);
      return false;
    default:
      console.error('Unknown message');
      return false;
  }
});
