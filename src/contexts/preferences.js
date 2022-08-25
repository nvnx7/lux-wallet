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

/**
 * Context provider for access to locally stored user preferences
 * and storing preferences
 */
export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useLocalStorage(KEY_PREFERENCES, initialState);

  const setActiveAccountAddress = useCallback(
    activeAccountAddress => {
      setPreferences({ ...preferences, activeAccountAddress });
    },
    [preferences, setPreferences]
  );

  const network = useMemo(() => {
    return getNetworkInfo(preferences.chainId);
  }, [preferences.chainId]);

  console.log({ preferences });

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

/**
 * Custom hook to access preference context values
 */
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('useAuthUser must be used in UserProvider');
  }
  return context;
};
