import Dexie from 'dexie';

export const DB_VERSION = 1;
export const DB_NAME = 'lux-db';

/**
 * Using IndexDB to store sent transactions form wallet
 * @note This might be temporary as fetching transactions list from
 * L16 Explorer is not possible right now, as API does not work currently
 */
const db = new Dexie(DB_NAME);
export default db;
db.version(DB_VERSION).stores({
  transactions: '++id, timestamp, hash, value, from, to, status, gasUsed',
});
