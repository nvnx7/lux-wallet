import { Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const PermissionsView = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <VStack {...props}>
      <Text my={24} color="gray.600" fontWeight="bold" textAlign="center">
        {t('common:coming-soon')}
      </Text>
    </VStack>
  );
};

export default PermissionsView;
