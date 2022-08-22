import useLocalStorage from 'hooks/useLocalStorage';
import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import keyringController, { KeyringType } from 'scripts/keyringController';
import { logDebug, logError } from 'utils/logger';
import { KEY_ACCOUNTS_DATA } from 'utils/storage';
import { areEqualAddresses } from 'utils/web3';
import { usePreferences } from './preferences';

// {
//   address: '0xa..',
//   universalProfile: '0xb..',
//   vaults: [{label: '', address: '0x..'}],
// }
const defaultAccountsData = [];
const initialContextValue = {
  isUnlocked: false,
  accountsData: defaultAccountsData,
};
const AccountContext = createContext(initialContextValue);
AccountContext.displayName = 'AccountContext';

export const AccountProvider = ({ children }) => {
  const { activeAccountAddress, setActiveAccountAddress } = usePreferences();
  const [accountsData, setAccountsData] = useLocalStorage(KEY_ACCOUNTS_DATA, defaultAccountsData);
  const [isUnlocked, setUnlocked] = useState(false);

  const lockAccount = async () => {
    await keyringController.setLocked();
    setUnlocked(false);
  };

  const unlockAccount = async password => {
    const memState = await keyringController.memStore.getState();
    if (memState.isUnlocked) {
      setUnlocked(true);
      return { isValid: true };
    }

    if (!memState.isUnlocked && !password) {
      logError('Keyring is locked and no password provided');
      return { isValid: false };
    }

    try {
      await keyringController.unlockKeyrings(password);
      setUnlocked(true);
      return { isValid: true };
    } catch (error) {
      logError('AccountProvider:unlockAccount', error);
      return { isValid: false };
    }
  };

  //TODO: Replace this with general updateAccount function
  const setUniversalProfileAddress = useCallback(
    (address, profileAddress) => {
      const idx = accountsData?.findIndex(account => account.address === address);
      if (idx === -1) {
        logError('AccountProvider:setProfileAddress', `${address} not found!`);
        return;
      }
      const updated = [...accountsData];
      updated[idx].universalProfile = profileAddress;
      setAccountsData(updated);
    },
    [setAccountsData, accountsData]
  );

  const updateAccount = useCallback(
    (address, data) => {
      const idx = accountsData?.findIndex(account => areEqualAddresses(account.address, address));
      if (idx === -1) {
        logError('AccountProvider:updateAccount', `${address} not found!`);
        return;
      }
      const updated = [...accountsData];
      updated[idx] = { ...updated[idx], ...data };
      setAccountsData(updated);
    },
    [setAccountsData, accountsData]
  );

  const addVault = useCallback(
    (address, vault) => {
      const idx = accountsData.findIndex(account => account.address === address);
      if (idx === -1) {
        logError('AccountProvider:setProfileAddress', `${address} not found!`);
        return;
      }
      const updated = [...accountsData];
      const dupIdx = updated[idx].vaults?.findIndex(v => v.address === vault.address);
      if (!updated[idx].vaults) updated[idx].vaults = [];

      if (dupIdx === -1) {
        updated[idx].vaults.push(vault);
      } else {
        updated[idx].vaults[dupIdx] = vault;
      }

      setAccountsData(updated);
    },
    [accountsData, setAccountsData]
  );

  const activeAccount = useMemo(
    () => accountsData?.find(acc => acc.address === activeAccountAddress),
    [activeAccountAddress, accountsData]
  );

  const addNewAccount = useCallback(
    (account, activate) => {
      const updated = [...accountsData, account];
      logDebug('AccountsProvider:addNewAccount', updated);
      setAccountsData(updated);
      activate && setActiveAccountAddress(account.address);
    },
    [accountsData, setAccountsData, setActiveAccountAddress]
  );

  const exportAccount = async (password, address) => {
    try {
      await keyringController.verifyPassword(password);
      const privateKey = await keyringController.exportAccount(address);
      return { isValid: true, privateKey };
    } catch (error) {
      return { isValid: false };
    }
  };

  const createNewAccount = async (account, activate) => {
    const addresses = await keyringController.getAccounts();
    if (addresses.length === 0) {
      logError('AccountProvider:createNewAccount', 'No accounts found');
      return;
    }
    const keyring = await keyringController.getKeyringForAccount(addresses[0]);
    await keyringController.addNewAccount(keyring);
    addNewAccount(account, activate);
  };

  const value = useMemo(
    () => ({
      isUnlocked,
      lockAccount,
      unlockAccount,
      setUniversalProfileAddress,
      updateAccount,
      addVault,
      accountsData,
      activeAccount,
      addNewAccount,
      exportAccount,
    }),
    [isUnlocked, setUniversalProfileAddress, addVault, accountsData, activeAccount, addNewAccount]
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAuthUser must be used in UserProvider');
  }
  return context;
};
