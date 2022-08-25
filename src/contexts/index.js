import React from 'react';
import { WalletProvider } from './wallet';
import { PreferencesProvider } from './preferences';
import { UIProvider } from './ui';

const AppContext = ({ children }) => (
  <PreferencesProvider>
    <WalletProvider>
      <UIProvider>{children}</UIProvider>
    </WalletProvider>
  </PreferencesProvider>
);

export default AppContext;
