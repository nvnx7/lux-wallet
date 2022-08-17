const { ipfsGateway } = require('settings/config');

export const ipfsToUrl = ipfsUrl => {
  const hash = ipfsUrl.split('/').pop();
  return `${ipfsGateway}/${hash}`;
};
