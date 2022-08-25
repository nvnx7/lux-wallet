import useLocalStorage from 'hooks/useLocalStorage';
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import keyringController, { KeyringType } from 'scripts/keyringController';
import { logDebug, logError } from 'utils/logger';
import { KEY_ACCOUNTS_DATA } from 'utils/storage';
import { areEqualAddresses } from 'utils/web3';
import { usePreferences } from './preferences';

/**
 * Accounts data list storing non-sensitive account data
 * Structure:
 * {
 *   address: '0xa..',
 *   universalProfile: '0xb..',
 * }
 */
const defaultAccountsData = [];
const initialContextValue = {
  isUnlocked: false,
  accountsData: defaultAccountsData,
};
const AccountContext = createContext(initialContextValue);
AccountContext.displayName = 'AccountContext';

/**
 * Account context provider for access to accounts data,
 * manipulation of accounts data, access to active account,
 * lock/unlock wallet
 */
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

  const activeAccount = useMemo(() => {
    const account = accountsData?.find(acc => areEqualAddresses(acc.address, activeAccountAddress));
    if (!account) {
      logError(
        `AccountsProvider:activeAccount`,
        `account address not found '${activeAccountAddress}'`
      );
    }
    return account;
  }, [activeAccountAddress, accountsData]);

  const addAccount = useCallback(
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
    addAccount(account, activate);
  };

  const createNewWallet = async (password, account) => {
    await keyringController.createNewVaultAndKeychain(password);
    // Clears auto created HD wallet
    await keyringController.clearKeyrings();
    await keyringController.addNewKeyring(KeyringType.SIMPLE_KEYRING, [account.privateKey]);
    const address = await keyringController.getAccounts().then(v => v?.[0]);
    if (!address) {
      logError(`Error creating wallet! Address not found!`);
      return;
    }
    logDebug(`Created new wallet with address`, address);
    addAccount({ label: account.label, address }, true);
    unlockAccount();
  };

  const value = useMemo(
    () => ({
      isUnlocked,
      lockAccount,
      unlockAccount,
      updateAccount,
      accountsData,
      activeAccount,
      addAccount,
      createNewWallet,
      exportAccount,
    }),
    [isUnlocked, accountsData, activeAccount, addAccount]
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

/**
 * Custom hook to access account context values
 */
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAuthUser must be used in UserProvider');
  }
  return context;
};
