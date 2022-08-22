import { Box, HStack, Text } from '@chakra-ui/react';
import Logo from 'components/common/ui/Logo';
import { appName } from 'settings/constants';
import { WalletMenu } from 'components/wallet';
import { useAccount } from 'contexts/accounts';

const Header = ({ ...props }) => {
  const { isUnlocked } = useAccount();
  return (
    <HStack width="100%" justify="space-between" pl={0} pr={2} bgColor="blackAlpha.800" {...props}>
      <Logo />
      <Text fontWeight="bold" fontSize={24} letterSpacing={8} align="center" color="white">
        {appName}
      </Text>
      {isUnlocked ? <WalletMenu /> : <Box w={12} />}
    </HStack>
  );
};

export default Header;
