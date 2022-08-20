import React from 'react';
import { AccountProvider } from './accounts';
import { PreferencesProvider } from './preferences';
import { UIProvider } from './ui';
// import { UProfileMetadataProvider } from './uProfileMetadata';

const AppContext = ({ children }) => (
  <PreferencesProvider>
    <AccountProvider>
      <UIProvider>
        {children}
        {/* <UProfileMetadataProvider></UProfileMetadataProvider> */}
      </UIProvider>
    </AccountProvider>
  </PreferencesProvider>
);

export default AppContext;
