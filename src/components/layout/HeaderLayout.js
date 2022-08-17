import { Box, Divider, HStack, IconButton } from '@chakra-ui/react';
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
      <HStack justify="space-between" maxW="60%" py={1}>
        <IconButton
          icon={<ArrowLeftIcon />}
          variant="ghost"
          onClick={handleBack}
          marginRight="auto"
        />
        <I18NText text={title} />
      </HStack>
      <Divider m={0} p={0} />
      <Box p={2} {...props}>
        {children}
      </Box>
    </Box>
  );
};

export default HeaderLayout;
