import { Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PermissionsList from './PermissionsList';

const PermissionsView = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <VStack {...props}>
      <Text variant="body" noOfLines={2} fontSize="xs" alignSelf="stretch" pb={2}>
        {t('common:permissioned-addresses-desc')}
      </Text>
      <PermissionsList w="full" />
    </VStack>
  );
};

export default PermissionsView;
