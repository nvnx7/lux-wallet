import { Heading } from '@chakra-ui/react';
import { Layout } from 'components/layout';
import { ImportAccountForm } from 'components/account';
import { useTranslation } from 'react-i18next';

const OnboardImportAccount = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Heading fontSize="3xl" textAlign="center" my={4}>
        {t('account:import-account')}
      </Heading>
      <ImportAccountForm pt={4} px={2} />
    </Layout>
  );
};

export default OnboardImportAccount;
