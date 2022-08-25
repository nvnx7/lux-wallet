import { Onboard, OnboardImportWallet, OnboardNewAccount } from 'pages';
import { Route, Routes } from 'react-router-dom';
import Path from './paths';

const OnboardRoutes = () => {
  return (
    <>
      <Route path={Path.ONBOARD} element={<Onboard />} />
      <Route path={Path.ONBOARD_NEW_WALLET} element={<OnboardNewAccount />} />
      <Route path={Path.ONBOARD_IMPORT_ACCOUNT} element={<OnboardImportWallet />} />
    </>
  );
};

export default OnboardRoutes;
