import { useEffect, useState } from 'react';
import { logDebug } from 'utils/logger';
import { getItem, storeItem } from 'utils/storage';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getItem(key, defaultValue);
  });

  useEffect(() => {
    logDebug('useLocalStorage:storeItem', key, value);
    storeItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
