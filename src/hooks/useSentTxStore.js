import { useLiveQuery } from 'dexie-react-hooks';
import db from 'lib/db';
import { logDebug, logError } from 'utils/logger';

/**
 * Custom hook to fetch stored list of sent tx & update the records
 * once the tx is confirmed - either succeeded or failed
 * @note This might be temporary as fetching transactions list from
 * L16 Explorer is not possible right now, as API does not work currently
 */
const useSentTxStore = ({ accountAddress }) => {
  const txList = useLiveQuery(
    () => db.transactions.where('from').equalsIgnoreCase(accountAddress).reverse().toArray(),
    [accountAddress]
  );
  const storeSentTx = async data => {
    try {
      const id = await db.transactions.add(data);
      logDebug('useSentTxStore:storeSentTx', accountAddress, data);
      return id;
    } catch (error) {
      logError('useSentTxStore:updateSentTx', error);
    }
  };

  const updateSentTx = async data => {
    try {
      const { id, ...updates } = data;
      const isUpdated = await db.transactions.update(id, updates);
      logDebug('useSentTxStore:updateSentTx', isUpdated);
      return isUpdated;
    } catch (error) {
      logError('useSentTxStore:updateSentTx', error);
    }
  };

  return {
    txList,
    storeSentTx,
    updateSentTx,
  };
};

export default useSentTxStore;
