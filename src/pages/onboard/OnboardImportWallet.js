import { Heading } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { ImportAccountForm } from 'components/account';
import { useTranslation } from 'react-i18next';

const OnboardImportWallet = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Heading textAlign="center" my={4}>
        {t('form:import-wallet')}
      </Heading>
      <ImportAccountForm />
    </Layout>
  );
};

export default OnboardImportWallet;
