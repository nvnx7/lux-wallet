import { useCallback, useMemo } from 'react';

const { KEY_IMPORTED_LEGACY_ASSETS } = require('utils/storage');
const { default: useLocalStorage } = require('./useLocalStorage');

const defaultValue = {
  tokens: [],
  nfts: [],
};

/**
 * For managing the imported legacy Tokens and NFTs
 */
const useImportedLegacyAssets = () => {
  const [assets, setAssets] = useLocalStorage(KEY_IMPORTED_LEGACY_ASSETS, defaultValue);

  const importAsset = useCallback(
    ({ type, address }) => {
      const updated = assets ? { ...assets } : defaultValue;
      if (type === 'token') {
        updated.tokens ? updated.tokens.push(address) : (updated.tokens = [address]);
      } else if (type === 'nft') {
        updated.nfts ? updated.nfts.push(address) : (updated.nfts = [address]);
      }
      setAssets(updated);
    },
    [assets, setAssets]
  );

  const value = useMemo(
    () => ({
      tokens: assets.tokens,
      nfts: assets.nfts,
      importAsset,
    }),
    [assets, importAsset]
  );

  return value;
};

export default useImportedLegacyAssets;
