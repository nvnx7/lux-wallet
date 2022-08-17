import { Heading, VStack } from '@chakra-ui/react';
import { NewWalletForm } from 'components/wallet';
import { Layout } from 'components/layout';
import { useTranslation } from 'react-i18next';

const NewWallet = () => {
  const { t } = useTranslation();

  return (
    <Layout height="75%">
      <VStack justify="center" height="100%">
        <Heading mb={8}>{t('common:welcome')}</Heading>
        <NewWalletForm />
      </VStack>
    </Layout>
  );
};

export default NewWallet;
