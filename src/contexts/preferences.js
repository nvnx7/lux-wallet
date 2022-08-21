import useLocalStorage from 'hooks/useLocalStorage';
import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { KEY_PREFERENCES } from 'utils/storage';
import { getNetworkInfo } from 'utils/web3';

const initialState = {
  activeAccountAddress: '',
  language: 'en',
  chainId: 2828, //L16
};

const PreferencesContext = createContext(initialState);
PreferencesContext.displayName = 'AuthContext';

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useLocalStorage(KEY_PREFERENCES, initialState);

  const setActiveAccountAddress = useCallback(
    activeAccountAddress => setPreferences({ activeAccountAddress, ...preferences }),
    [preferences, setPreferences]
  );

  const network = useMemo(() => {
    return getNetworkInfo(preferences.chainId);
  }, [preferences.chainId]);

  const value = useMemo(
    () => ({
      ...preferences,
      network,
      setActiveAccountAddress,
    }),
    [preferences, setActiveAccountAddress, network]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('useAuthUser must be used in UserProvider');
  }
  return context;
};
