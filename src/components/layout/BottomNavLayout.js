import { Box } from '@chakra-ui/react';
import BottomNavigationTabs from 'components/common/BottomNavigationTabs';
import Header from './Header';

const BottomNavLayout = ({ children, ...props }) => {
  return (
    <Box h="100%" maxH="100%" display="flex" flexDirection="column" position="relative">
      <Header h="10%" />
      <Box p={2} h="77%" {...props}>
        {children}
      </Box>
      <Box px={2} h="13%">
        <BottomNavigationTabs />
      </Box>
    </Box>
  );
};

export default BottomNavLayout;
