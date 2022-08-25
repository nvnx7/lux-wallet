import { Heading, Text, VStack } from '@chakra-ui/react';
import { HeaderLayout } from 'components/layout';
import { AddProfileForm } from 'components/profile';
import { useTranslation } from 'react-i18next';

const AddUniversalProfile = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('form:add-profile')}>
      <VStack>
        <Heading textAlign="center" fontSize="3xl">
          {t('common:universal-profile')}
        </Heading>
        <Text textAlign="center" variant="body" pt={4}>
          {t('form:add-profile-description')}
        </Text>
        <AddProfileForm py={12} />
      </VStack>
    </HeaderLayout>
  );
};

export default AddUniversalProfile;
