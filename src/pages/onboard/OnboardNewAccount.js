import { Heading } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { NewWalletForm } from 'components/wallet';
import { useTranslation } from 'react-i18next';

const OnboardNewAccount = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Heading textAlign="center" my={4}>
        {t('form:create-new-account')}
      </Heading>
      <NewWalletForm my={4} />
    </Layout>
  );
};

export default OnboardNewAccount;
