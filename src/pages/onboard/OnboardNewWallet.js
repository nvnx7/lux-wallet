import { Center, Heading } from '@chakra-ui/react';
import { KeyIcon } from 'components/icons/3d';
import { Layout } from 'components/layout';
import { NewWalletForm } from 'components/wallet';
import { useTranslation } from 'react-i18next';

const OnboardNewWallet = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Heading fontSize="3xl" textAlign="center" my={2}>
        {t('form:create-new-account')}
      </Heading>
      <Center>
        <KeyIcon alignSelf="center" size={20} />
      </Center>
      <NewWalletForm my={2} />
    </Layout>
  );
};

export default OnboardNewWallet;
