import { Heading, VStack } from '@chakra-ui/react';
import { ImportAccountForm } from 'components/account';
import { Layout } from 'components/layout';
import { useTranslation } from 'react-i18next';

const Import = () => {
  const { t } = useTranslation();

  return (
    <Layout height="75%">
      <VStack justify="center" height="100%">
        <Heading mb={8}>{t('common:welcome')}</Heading>
        <ImportAccountForm />
      </VStack>
    </Layout>
  );
};

export default Import;
