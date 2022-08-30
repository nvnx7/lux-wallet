export const env = 'development';

export const isDev = env === 'development';
export const isExtension = !!(window.chrome && window.chrome.runtime && window.chrome.runtime.id);

console.log('Environments');
console.log('isDev', isDev);
console.log('isExtension', isExtension);

export const rpcEndpoint = 'https://rpc.l16.lukso.network';
export const ipfsGateway = 'https://2eff.lukso.dev/ipfs';
export const explorerEndpoint = 'https://explorer.execution.l16.lukso.network';
