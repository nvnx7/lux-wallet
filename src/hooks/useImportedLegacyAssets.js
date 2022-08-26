const { KEY_IMPORTED_LEGACY_ASSETS } = require('utils/storage');
const { default: useLocalStorage } = require('./useLocalStorage');

const defaultValue = {
  tokens: [],
  nfts: [],
};
const useImportedLegacyAssets = () => {
  const [assets, setAssets] = useLocalStorage(KEY_IMPORTED_LEGACY_ASSETS, defaultValue);

  const importAsset = ({ type, ...data }) => {
    const updated = assets ? { ...assets } : defaultValue;
    if (type === 'token') {
      updated.tokens ? updated.tokens.push(data) : (updated.tokens = [data]);
    } else if (type === 'nft') {
      updated.nfts ? updated.nfts.push(data) : (updated.nfts = [data]);
    }
    setAssets(updated);
  };

  return {
    tokens: assets.tokens,
    nfts: assets.nfts,
    importAsset,
  };
};

export default useImportedLegacyAssets;
