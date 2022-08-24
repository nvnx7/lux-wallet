import React from 'react';
import { AccountProvider } from './accounts';
import { PreferencesProvider } from './preferences';
import { UIProvider } from './ui';

const AppContext = ({ children }) => (
  <PreferencesProvider>
    <AccountProvider>
      <UIProvider>{children}</UIProvider>
    </AccountProvider>
  </PreferencesProvider>
);

export default AppContext;
