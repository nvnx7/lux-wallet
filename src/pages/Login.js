import { Heading, VStack } from '@chakra-ui/react';
import { WalletLoginForm } from 'components/wallet';
import { Layout } from 'components/layout';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Layout height="75%">
      <VStack justify="center" height="100%">
        <Heading mb={8}>{t('common:welcome')}</Heading>
        <WalletLoginForm />
      </VStack>
    </Layout>
  );
};

export default Login;
