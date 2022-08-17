import React from 'react';
import { AccountProvider } from './accounts';
import { PreferencesProvider } from './preferences';
import { UProfileMetadataProvider } from './uProfileMetadata';

const AppContext = ({ children }) => (
  <PreferencesProvider>
    <AccountProvider>
      <UProfileMetadataProvider>{children}</UProfileMetadataProvider>
    </AccountProvider>
  </PreferencesProvider>
);

export default AppContext;
