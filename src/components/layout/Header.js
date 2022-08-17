import { HStack, Text, Menu, MenuButton } from '@chakra-ui/react';
import Logo from 'components/common/ui/Logo';
import { appName } from 'settings/constants';
import { BsFillGridFill } from 'react-icons/bs';

const Header = ({ ...props }) => {
  return (
    <HStack width="100%" justify="space-between" p={4} bgColor="primary.500" {...props}>
      <Logo />
      <Text fontWeight="bold" align="center" color="white">
        {appName}
      </Text>
      <Menu>
        <MenuButton>
          <BsFillGridFill color="white" />
        </MenuButton>
      </Menu>
    </HStack>
  );
};

export default Header;
