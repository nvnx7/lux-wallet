import { Box } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children, ...props }) => {
  return (
    <Box display="flex" flexDirection="column" height="full">
      <Header />
      <Box p={4} flexGrow={1} {...props}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
