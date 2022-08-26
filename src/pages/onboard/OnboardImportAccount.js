import { Heading } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { useTranslation } from 'react-i18next';
import { OnboardImportAccountForm } from 'components/onboard';

const OnboardImportAccount = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Heading fontSize="3xl" textAlign="center" my={4}>
        {t('account:import-account')}
      </Heading>
      <OnboardImportAccountForm pt={4} px={2} />
    </Layout>
  );
};

export default OnboardImportAccount;
