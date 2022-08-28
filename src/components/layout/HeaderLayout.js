import { Box, Center, Divider, HStack, IconButton, Text } from '@chakra-ui/react';
import { ArrowLeftIcon } from 'components/icons';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const HeaderLayout = ({ children, title = '', icon, ...props }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box height="100%" display="flex" flexDirection="column" position="relative">
      <Header h="11%" />
      <HStack justify="center" py={3} position="relative" h="8%">
        <IconButton
          icon={<ArrowLeftIcon />}
          variant="ghost"
          onClick={handleBack}
          position="absolute"
          left={4}
          top={1}
          bottom={0}
        />
        {!!icon && icon}
        <Text fontWeight="semibold" textAlign="center" maxW="60%" noOfLines={1}>
          {title}
        </Text>
      </HStack>
      <Divider m={0} p={0} />
      <Box p={2} h="88%" {...props}>
        {children}
      </Box>
    </Box>
  );
};

export default HeaderLayout;
