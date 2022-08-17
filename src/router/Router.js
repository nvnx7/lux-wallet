import React, { useEffect, useState } from 'react';
import { useAccount } from 'contexts/accounts';
import {
  AddUniversalProfile,
  DigitalAssets,
  Home,
  Loading,
  Login,
  Onboard,
  OnboardImportWallet,
  OnboardNewAccount,
} from 'pages';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Path from './paths';
import keyringController from 'scripts/keyringController';
import { logDebug } from 'utils/logger';
import { wait } from 'utils/datetime';

const MemoryRoutes = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  // const [hasVault, setHasVault] = useState(false);
  const { isUnlocked } = useAccount();

  useEffect(() => {
    const state = keyringController.store.getState();
    // console.log('Router:', { state });
    // setHasVault(!!state.vault);
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
      <Route path={Path.ONBOARD_NEW_ACCOUNT} element={<OnboardNewAccount />} />
      <Route path={Path.ONBOARD_IMPORT_WALLET} element={<OnboardImportWallet />} />
      {/* Profile pages */}
      <Route path={Path.PROFILE_ADD} element={<AddUniversalProfile />} />
      {/* Assets pages */}
      <Route path={Path.DIGITAL_ASSETS} element={<DigitalAssets />} />
    </Routes>
  );
};

const Router = () => {
  return (
    <MemoryRouter>
      <MemoryRoutes />
    </MemoryRouter>
  );
};

export default Router;

{
  /* <Routes>
{!isUnlocked && <Route path={Path.Login} element={<Login />} />}

{isUnlocked && !hasVault && (
  <>
    <Route path={Path.ONBOARD} element={<Onboard />} />
    <Route path={Path.ONBOARD_NEW_ACCOUNT} element={<OnboardNewAccount />} />
    <Route path={Path.ONBOARD_IMPORT_WALLET} element={<OnboardImportWallet />} />
  </>
)}

{isUnlocked && hasVault && (
  <>
    <Route path={Path.HOME} element={<Home />} />
  </>
)}
</Routes> */
}
