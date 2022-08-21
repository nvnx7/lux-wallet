import { Box, Image } from '@chakra-ui/react';
import luksologo from 'assets/images/lukso.png';

const LuksoLogo = ({ size, ...props }) => {
  return (
    <Box boxSize={size} {...props}>
      <Image src={luksologo} w="full" h="full" alt="Lukso Logo" />
    </Box>
  );
};

export default LuksoLogo;
