import { Heading, VStack } from '@chakra-ui/react';
import { WalletLoginForm } from 'components/wallet';
import { Layout } from 'components/layout';
import { useTranslation } from 'react-i18next';
import { Logo } from 'components/common/ui';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <VStack>
        <Logo size={64} />
        <Heading py={8}>{t('common:welcome')}</Heading>
        <WalletLoginForm />
      </VStack>
    </Layout>
  );
};

export default Login;
