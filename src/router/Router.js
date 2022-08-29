import React, { useEffect, useState } from 'react';
import { useWallet } from 'contexts/wallet';
import {
  AddUniversalProfile,
  DigitalAssets,
  Home,
  Loading,
  Login,
  Onboard,
  OnboardImportAccount,
  OnboardNewWallet,
  SendToken,
  SendLyx,
  SendNft,
  Settings,
  VaultDetail,
  VaultManager,
  Activity,
  SocialRecovery,
} from 'pages';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Path from './paths';
import keyringController from 'lib/keyringController';
import { logDebug } from 'utils/logger';
import { wait } from 'utils/datetime';
import { ManagedModal } from 'components/common/ui';

const MemoryRoutes = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const { isUnlocked } = useWallet();

  useEffect(() => {
    const state = keyringController.store.getState();
    const hasVault = !!state.vault;
    wait(2000).then(() => setLoading(false));
    logDebug('Router:', { isLoading, isUnlocked, hasVault });
    if (isUnlocked && hasVault) navigate(Path.HOME);
    else if (!hasVault) navigate(Path.ONBOARD);
    else navigate(Path.LOGIN);
  }, [isUnlocked]);

  return (
    <Routes>
      <Route path={Path.LOADING} element={<Loading />} />
      <Route path={Path.HOME} element={<Home />} />
      <Route path={Path.LOGIN} element={<Login />} />
      {/* Onboard pages */}
      <Route path={Path.ONBOARD} element={<Onboard />} />
      <Route path={Path.ONBOARD_NEW_WALLET} element={<OnboardNewWallet />} />
      <Route path={Path.ONBOARD_IMPORT_ACCOUNT} element={<OnboardImportAccount />} />
      {/* Profile pages */}
      <Route path={Path.PROFILE_ADD} element={<AddUniversalProfile />} />
      {/* Assets pages */}
      <Route path={Path.DIGITAL_ASSETS} element={<DigitalAssets />} />
      {/* Vaults pages */}
      <Route path={Path.VAULT_MANAGER} element={<VaultManager />} />
      <Route path={Path.VAULT_DETAIL} element={<VaultDetail />} />
      {/* Settings pages */}
      <Route path={Path.SETTINGS} element={<Settings />} />
      {/* Tx Pages */}
      <Route path={Path.TX_SEND_LYX} element={<SendLyx />} />
      <Route path={Path.TX_SEND_TOKEN} element={<SendToken />} />
      <Route path={Path.TX_SEND_NFT} element={<SendNft />} />
      {/* Activity pages */}
      <Route path={Path.ACTIVITY} element={<Activity />} />
      {/* Social Recovery pages */}
      <Route path={Path.SOCIAL_RECOVERY} element={<SocialRecovery />} />
    </Routes>
  );
};

const Router = () => {
  return (
    <MemoryRouter>
      <MemoryRoutes />
      <ManagedModal />
    </MemoryRouter>
  );
};

export default Router;
