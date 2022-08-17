import { Box } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children, ...props }) => {
  return (
    <Box>
      <Header />
      <Box p={4} {...props}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
