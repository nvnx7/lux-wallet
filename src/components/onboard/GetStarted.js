import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from 'components/common/ui';
import Path from 'router/paths';
import { RocketIcon } from 'components/icons/3d';

const GetStarted = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(Path.ONBOARD_NEW_WALLET);
  };

  return (
    <VStack w="full" spacing={0} px={2} {...props}>
      <Logo size={32} />
      <Heading fontSize="3xl">{t('common:get-started')}</Heading>
      <RocketIcon size={132} />
      <Text variant="body" textAlign="center" pt={2} pb={6}>
        {t('common:get-started-desc')}
      </Text>
      <Button onClick={handleStart} marginTop="auto">
        {t('common:lets-go')}
      </Button>
    </VStack>
  );
};

export default GetStarted;
