import { useListVaults } from 'api/vault/listVaults';
import { useCallback, useEffect, useMemo } from 'react';
import { KEY_UP_VAULTS } from 'utils/storage';
import { areEqualHex } from 'utils/web3';
import useLocalStorage from './useLocalStorage';

/**
 * Vaults item structure:
 * {
 *   upAddress: '0xa..',
 *   address: '0xb..',
 *   label: ''
 * }
 */
const defaultValue = [];

/**
 * Manages all vaults by active account's universal profile
 */
const useVaults = ({ upAddress }) => {
  const [vaults, setVaults] = useLocalStorage(KEY_UP_VAULTS, defaultValue);
  const { data, isFetching } = useListVaults({ upAddress });

  useEffect(() => {
    if (!data || !upAddress) return;
    setVaults(vaults => {
      const newData = vaults ? [...vaults] : [];
      // Fetch new vaults from universal profile & store, avoiding duplicates
      data?.forEach(address => {
        const isDup = newData.findIndex(v => areEqualHex(address, v.address)) >= 0;
        if (!isDup) {
          newData.push({ address, upAddress, label: '' });
        }
      });
      return newData;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, upAddress]);

  const addVault = useCallback(
    ({ address, label }) => {
      setVaults([...vaults, { address, label, upAddress }]);
    },
    [vaults, setVaults, upAddress]
  );

  const value = useMemo(() => {
    // Filter vaults by assoc. universal profile address
    console.log({ vaults });
    const upVaults = vaults?.filter(v => areEqualHex(upAddress, v.upAddress)) || [];
    const isLoading = isFetching && upVaults.length === 0;
    return {
      vaults: upVaults,
      addVault,
      isLoading,
    };
  }, [vaults, upAddress, addVault, isFetching]);

  return value;
};

export default useVaults;
