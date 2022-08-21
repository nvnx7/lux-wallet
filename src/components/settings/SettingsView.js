import { Heading, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import NetworkSelector from './NetworkSelector';

const SettingsView = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <VStack {...props}>
      <Heading fontWeight="semibold" fontSize="xl">
        {t('common:settings')}
      </Heading>
      <NetworkSelector />
      <LanguageSelector />
    </VStack>
  );
};

export default SettingsView;
