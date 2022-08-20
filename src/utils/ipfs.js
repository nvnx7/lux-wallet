const { ipfsGateway } = require('settings/config');

export const ipfsToUrl = ipfsUrl => {
  if (!ipfsUrl) return;
  const hash = ipfsUrl.split('/').pop();
  return `${ipfsGateway}/${hash}`;
};
