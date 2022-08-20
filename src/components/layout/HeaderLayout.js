import { Box, Center, Divider, HStack, IconButton, Text } from '@chakra-ui/react';
import { I18NText } from 'components/common/text';
import { ArrowLeftIcon } from 'components/icons';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const HeaderLayout = ({ children, title = '', ...props }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box height="100%" display="flex" flexDirection="column" position="relative">
      <Header />
      <Center py={3} position="relative">
        <IconButton
          icon={<ArrowLeftIcon />}
          variant="ghost"
          onClick={handleBack}
          position="absolute"
          left={4}
          top={0}
          bottom={0}
        />
        <Text fontWeight="semibold" textAlign="center" maxW="60%" noOfLines={1}>
          {title}
        </Text>
      </Center>
      <Divider m={0} p={0} />
      <Box p={2} {...props}>
        {children}
      </Box>
    </Box>
  );
};

export default HeaderLayout;
