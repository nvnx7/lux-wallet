import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { logDebug } from 'utils/logger';

/**
 * Query keys to identify & invalidate queries
 * after a tx
 */
export const QueryKey = {
  BALANCE: 'balance', // native token (LYX) balance
  ASSETS_LIST: 'assets',
  ASSET_DATA: 'assetData',
  NFTS_LIST: 'listNfts',
  UP_METADATA: 'upMetadata',
  UP_PERMISSIONED: 'upPermissioned',
  TX_RECEIPT: 'txReceipt',
  VAULTS_LIST: 'vaults',
  LEGACY_ASSET_DATA: 'legacyAssetData',
};

/**
 * Milliseconds after a sent tx after which a query cache is invalidated.
 */
export const INVALIDATE_TIMEOUT = 13500;

/**
 * Custom hook to invalidate queries/caches after sent tx
 * @note Need to wait for invalidation instead of doing immediately
 * as tx is not mined immediately but after a certain interval of time
 */
export const useInvalidateQuery = () => {
  const qc = useQueryClient();

  const invalidateQueries = useCallback(
    (queryKey, timeoutMs = INVALIDATE_TIMEOUT) => {
      return setTimeout(() => {
        logDebug('useInvalidateQuery:invalidateQueries', queryKey);
        qc.invalidateQueries(queryKey);
      }, timeoutMs);
    },
    [qc]
  );

  return { invalidateQueries };
};
