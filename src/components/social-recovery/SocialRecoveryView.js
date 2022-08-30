import { Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const SocialRecoveryView = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <VStack h="100%" spacing={8} {...props}>
      <Text variant="body" textAlign="center">
        {t('common:social-recovery-desc')}
      </Text>

      <Text textAlign="center" fontWeight="semibold" color="gray.500">
        {t('common:coming-soon')}
      </Text>
    </VStack>
  );
};

export default SocialRecoveryView;
