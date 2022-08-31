import useLocalStorage from 'hooks/useLocalStorage';
import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from 'react';
import keyringController, { KeyringType } from 'lib/keyringController';
import { logDebug, logError } from 'utils/logger';
import { KEY_ACCOUNTS_DATA } from 'utils/storage';
import { areEqualHex, privateKeyToAddress } from 'utils/web3';
import { usePreferences } from './preferences';
import { removeSessionToken, restoreSessionToken, saveSessionToken } from 'lib/session';

/**
 * Accounts data list storing non-sensitive account data
 * Structure:
 * [{
 *   address: '0xa..',
 *   universalProfile: '0xb..',
 * }]
 */
const defaultAccountsData = [];
const initialContextValue = {
  isUnlocked: false,
  accountsData: defaultAccountsData,
};
const WalletContext = createContext(initialContextValue);
WalletContext.displayName = 'AccountContext';

/**
 * Helper function to detect a newly created address
 * by looking at difference
 */
const getCreatedAddress = (before, after) => {
  return after.find(address => {
    return before.every(v => !areEqualHex(v, address));
  });
};

/**
 * Wallet context provider for access to accounts data,
 * manipulation of accounts data, access to active account,
 * lock/unlock wallet
 */
export const WalletProvider = ({ children }) => {
  const { activeAccountAddress, setActiveAccountAddress } = usePreferences();
  const [accountsData, setAccountsData] = useLocalStorage(KEY_ACCOUNTS_DATA, defaultAccountsData);
  const [isUnlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (isUnlocked) return;
    logDebug('WalletProvider', 'Trying to unlock by session');
    restoreSessionToken().then(data => {
      logDebug('WalletProvider', `Fetched data:`, data);
      const secret = data?.payload;
      logDebug('WalletProvider', `Fetched data: ${secret}`);
      if (secret) {
        unlockWallet(secret, false);
      }
    });
  }, [isUnlocked]);

  const lockWallet = async () => {
    await removeSessionToken();
    await keyringController.setLocked();
    setUnlocked(false);
  };

  const unlockWallet = async (password, save = true) => {
    const memState = await keyringController.memStore.getState();
    if (memState.isUnlocked) {
      setUnlocked(true);
      save && saveSessionToken(password);
      return { isValid: true };
    }

    if (!memState.isUnlocked && !password) {
      logError('Keyring is locked and no password provided');
      return { isValid: false };
    }

    try {
      await keyringController.unlockKeyrings(password);
      setUnlocked(true);
      save && saveSessionToken(password);
      return { isValid: true };
    } catch (error) {
      logError('AccountProvider:unlockAccount', error);
      return { isValid: false };
    }
  };

  /**
   * Update an account data
   */
  const updateAccount = useCallback(
    (address, data) => {
      const idx = accountsData?.findIndex(account => areEqualHex(account.address, address));
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

  /**
   * Returns currently selected account by user
   */
  const activeAccount = useMemo(() => {
    const account = accountsData?.find(acc => areEqualHex(acc.address, activeAccountAddress));
    if (!account) {
      logError(
        `AccountsProvider:activeAccount`,
        `account address not found '${activeAccountAddress}'`
      );
    }
    return account;
  }, [activeAccountAddress, accountsData]);

  /**
   * Adds & syncs an account to storage & state
   */
  const addAccount = useCallback(
    (account, activate) => {
      const updated = [...accountsData, account];
      logDebug('AccountsProvider:addAccount', account);
      setAccountsData(updated);
      activate && setActiveAccountAddress(account.address);
    },
    [accountsData, setAccountsData, setActiveAccountAddress]
  );
  /**
   * Removes & syncs an account to storage & state
   */
  const removeAccount = useCallback(
    address => {
      const updated = accountsData?.filter(v => !areEqualHex(address, v.address)) || [];
      logDebug('AccountsProvider:removeAccount', updated);
      setAccountsData(updated);
    },
    [accountsData, setAccountsData]
  );

  /**
   * Removes an account from wallet & switching to first wallet
   * Will not remove if there is only one account
   */
  const deleteAccount = async (password, address) => {
    try {
      await keyringController.verifyPassword(password);
      const addresses = await keyringController.getAccounts();
      if (address.length <= 1) {
        logError('AccountsProvider:deleteAccount', 'Trying to remove only account!');
        throw new Error('Trying to remove only account!');
      }

      await keyringController.removeAccount(address);
      removeAccount(address);

      // Set first available account as active
      setActiveAccountAddress(addresses[0]);
      return { isValid: true };
    } catch (error) {
      return { isValid: false };
    }
  };

  /**
   * Export private key of an address
   */
  const exportAccount = async (password, address) => {
    try {
      await keyringController.verifyPassword(password);
      const privateKey = await keyringController.exportAccount(address);
      return { isValid: true, privateKey };
    } catch (error) {
      return { isValid: false };
    }
  };

  /**
   * Import an account using private key
   */
  const importAccount = async (account, activate = true) => {
    try {
      const address = privateKeyToAddress(account.privateKey);
      await keyringController.addNewKeyring(KeyringType.SIMPLE_KEYRING, [account.privateKey]);
      logDebug('WalletProvider:importAccount', `Imported account: ${address}`);
      addAccount({ label: account.label, address }, activate);
      return { address, isSuccess: true };
    } catch (error) {
      // Might throw for duplicate import
      logError(error);
      return { isSuccess: false };
    }
  };

  /**
   * Creates a random account with an address & private key
   */
  const createNewAccount = async (account, activate = true) => {
    const keyring = await keyringController.getKeyringForAccount(activeAccountAddress);
    const beforeAddresses = await keyringController.getAccounts();
    await keyringController.addNewAccount(keyring);
    const afterAddresses = await keyringController.getAccounts();
    const createdAddress = getCreatedAddress(beforeAddresses, afterAddresses);
    logDebug('WalletProvider:createNewAccount', `Created new account: ${createdAddress}`);
    addAccount({ label: account.label, address: createdAddress }, activate);
    return {
      address: createdAddress,
    };
  };

  /**
   * Creates a new vault assoc. with keychain & adds and
   * initial account
   */
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
    logDebug('WalletProvider:createNewWallet', `Created new wallet with an account: ${address}`);
    addAccount({ label: account.label, address }, true);
    unlockWallet(password, true);
  };

  const value = useMemo(
    () => ({
      isUnlocked,
      lockWallet,
      unlockWallet,
      updateAccount,
      accountsData,
      activeAccount,
      createNewWallet,
      createNewAccount,
      importAccount,
      exportAccount,
      deleteAccount,
      switchAccount: setActiveAccountAddress,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isUnlocked, accountsData, activeAccount, addAccount]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

/**
 * Custom hook to access wallet context values
 */
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useAuthUser must be used in UserProvider');
  }
  return context;
};
