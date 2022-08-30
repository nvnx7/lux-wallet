import React from 'react';
import { WalletProvider } from './wallet';
import { PreferencesProvider } from './preferences';
import { UIProvider } from './ui';

/**
 * Contexts specific to app combined
 */
const AppContext = ({ children }) => (
  <PreferencesProvider>
    <WalletProvider>
      <UIProvider>{children}</UIProvider>
    </WalletProvider>
  </PreferencesProvider>
);

export default AppContext;
