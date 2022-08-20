import { Button, Text, VStack } from '@chakra-ui/react';
import { AddIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';

const EmptyProfileView = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <VStack alignItems="center" spacing={4} {...props}>
      <Text fontSize="sm" color="gray.400" textAlign="center" px={8}>
        {t('form:add-profile-description')}
      </Text>
      <Button
        leftIcon={<AddIcon />}
        variant="ghost"
        colorScheme="gray"
        textColor="gray.400"
        onClick={() => navigate(Path.PROFILE_ADD)}
      >
        {t('form:add-profile')}
      </Button>
    </VStack>
  );
};

export default EmptyProfileView;
