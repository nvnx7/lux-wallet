import useLocalStorage from 'hooks/useLocalStorage';
import React, { createContext, useContext, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
 * and updating it
 */
export const PreferencesProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [preferences, setPreferences] = useLocalStorage(KEY_PREFERENCES, initialState);

  useEffect(() => {
    i18n.changeLanguage(preferences.language || 'en');
  }, [preferences.language, i18n]);

  const setActiveAccountAddress = useCallback(
    activeAccountAddress => {
      setPreferences({ ...preferences, activeAccountAddress });
    },
    [preferences, setPreferences]
  );

  const setPreferredLanguage = useCallback(
    language => {
      setPreferences({ ...preferences, language });
    },
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
      setPreferredLanguage,
    }),
    [preferences, setActiveAccountAddress, network, setPreferredLanguage]
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
