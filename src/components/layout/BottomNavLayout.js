import { Box } from '@chakra-ui/react';
import BottomNavigationTabs from 'components/common/BottomNavigationTabs';
import Header from './Header';

const BottomNavLayout = ({ children, ...props }) => {
  return (
    <Box h="100%" display="flex" flexDirection="column" position="relative">
      <Header />
      <Box p={2} flexGrow={1} {...props}>
        {children}
      </Box>
      <Box
        position="absolute"
        p={2}
        marginLeft="auto"
        marginRight="auto"
        left={0}
        right={0}
        bottom={2}
      >
        <BottomNavigationTabs />
      </Box>
    </Box>
  );
};

export default BottomNavLayout;
