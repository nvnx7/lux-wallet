import { Button, Divider, Heading, VStack } from '@chakra-ui/react';
import { useWallet } from 'contexts/wallet';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import NetworkSelector from './NetworkSelector';

const SettingsView = ({ ...props }) => {
  const { t } = useTranslation();
  const { lockWallet } = useWallet();

  return (
    <VStack spacing={4} px={4} h="full" {...props}>
      <Heading fontWeight="semibold" fontSize="xl">
        {t('common:settings')}
      </Heading>
      <Divider />
      <NetworkSelector />
      <LanguageSelector />
      <Button variant="ghost" colorScheme="red" mt="auto" alignSelf="stretch" onClick={lockWallet}>
        {t('account:lock-account')}
      </Button>
    </VStack>
  );
};

export default SettingsView;
