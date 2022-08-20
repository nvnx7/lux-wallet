import { HStack, Text } from '@chakra-ui/react';
import Logo from 'components/common/ui/Logo';
import { appName } from 'settings/constants';
import { WalletMenu } from 'components/wallet';

const Header = ({ ...props }) => {
  return (
    <HStack width="100%" justify="space-between" px={4} py={2} bgColor="primary.500" {...props}>
      <Logo />
      <Text fontWeight="bold" align="center" color="white">
        {appName}
      </Text>
      <WalletMenu />
    </HStack>
  );
};

export default Header;
