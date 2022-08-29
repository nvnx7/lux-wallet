import { Box } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children, ...props }) => {
  return (
    <Box h="100%" display="flex" flexDirection="column" height="full">
      <Header h="11%" />
      <Box p={4} h="89%" {...props}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
