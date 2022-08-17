import { VStack } from '@chakra-ui/react';
import { I18NHeading, I18NText } from 'components/common/text';
import { HeaderLayout } from 'components/layout';
import { AddProfileForm } from 'components/profile';
import { useTranslation } from 'react-i18next';

const AddUniversalProfile = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={'form:add-profile'}>
      <VStack>
        <I18NHeading text="common:universal-profile" textAlign="center" />
        <I18NText text="form:add-profile-description" textAlign="center" variant="body" pt={4} />
        <AddProfileForm py={12} />
      </VStack>
    </HeaderLayout>
  );
};

export default AddUniversalProfile;
