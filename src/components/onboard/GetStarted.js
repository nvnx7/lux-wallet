import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from 'components/common/ui';
import Path from 'router/paths';

const GetStarted = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(Path.ONBOARD_NEW_ACCOUNT);
  };

  return (
    <VStack {...props}>
      <Logo size={64} />
      <Heading>{t('common:get-started')}</Heading>
      <Text>{t('common:get-started-desc')}</Text>
      <Button onClick={handleStart} marginTop="auto">
        {t('common:lets-go')}
      </Button>
    </VStack>
  );
};

export default GetStarted;
