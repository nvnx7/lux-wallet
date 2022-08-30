import log from 'loglevel';
import { env } from 'settings/config';

/**
 * Logger for debugging
 */
const level = env === 'development' ? 'trace' : 'error';
log.setLevel(level);

export const logInfo = log.info;
export const logWarn = log.warn;
export const logError = log.error;
export const logDebug = log.debug;
export const logTrace = log.trace;
export default log;
