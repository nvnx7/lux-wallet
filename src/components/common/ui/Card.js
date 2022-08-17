import { Box } from '@chakra-ui/react';

const Card = ({ children, ...props }) => {
  return (
    <Box shadow="md" rounded="md" borderWidth="1px" flexDirection="column" {...props}>
      {children}
    </Box>
  );
};

export default Card;
