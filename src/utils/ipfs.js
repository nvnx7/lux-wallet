const { ipfsGateway } = require('settings/config');

/**
 * Return corresponding https url give an ipfs url/hash
 */
export const ipfsToUrl = ipfsUrl => {
  if (!ipfsUrl) return;
  const hash = ipfsUrl.split('/').pop();
  return `${ipfsGateway}/${hash}`;
};
