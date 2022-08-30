import { Center, Heading } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { useTranslation } from 'react-i18next';
import { OnboardImportAccountForm } from 'components/onboard';
import { WalletIcon } from 'components/icons/3d';

const OnboardImportAccount = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Heading fontSize="3xl" textAlign="center" my={2}>
        {t('account:import-account')}
      </Heading>
      <Center>
        <WalletIcon size={20} />
      </Center>
      <OnboardImportAccountForm pt={0} px={2} />
    </Layout>
  );
};

export default OnboardImportAccount;
