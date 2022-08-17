import useLocalStorage from 'hooks/useLocalStorage';
import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { KEY_PREFERENCES } from 'utils/storage';

const initialState = {
  activeAccountAddress: '',
};
const PreferencesContext = createContext(initialState);
PreferencesContext.displayName = 'AuthContext';

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useLocalStorage(KEY_PREFERENCES, {});

  const setActiveAccountAddress = useCallback(
    activeAccountAddress => setPreferences({ activeAccountAddress, ...preferences }),
    [preferences, setPreferences]
  );

  const value = useMemo(
    () => ({
      ...preferences,
      setActiveAccountAddress,
    }),
    [preferences, setActiveAccountAddress]
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
