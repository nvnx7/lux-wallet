import { Heading, VStack } from '@chakra-ui/react';
import LanguageSelector from './LanguageSelector';
import NetworkSelector from './NetworkSelector';

const SettingsView = ({ ...props }) => {
  return (
    <VStack {...props}>
      <Heading fontWeight="semibold" fontSize="xl">
        Settings
      </Heading>
      <NetworkSelector />
      <LanguageSelector />
    </VStack>
  );
};

export default SettingsView;
