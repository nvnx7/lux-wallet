import { Box, Button, VStack } from '@chakra-ui/react';
import { I18NText } from 'components/common/text';
import { LuksoLogo } from 'components/common/ui';
import { AddIcon, ArrowUpRightIcon } from 'components/icons';
import { UniversalProfile } from 'components/profile';
import { useAccount } from 'contexts/accounts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import AccountHeader from './AccountHeader';

const AccountView = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeAccount } = useAccount();

  return (
    <Box {...props}>
      <AccountHeader borderBottomWidth="1px" borderBottomColor="gray.200" />
      {activeAccount?.universalProfile ? (
        <UniversalProfile my={4} />
      ) : (
        <>
          <VStack my={4}>
            <LuksoLogo size={12} />
            <Button size="sm" leftIcon={<ArrowUpRightIcon />}>
              {t('asset:send')}
            </Button>
          </VStack>
          <VStack alignItems="center" py={2} spacing={4}>
            <I18NText
              text="form:add-profile-description"
              textAlign="center"
              variant="body"
              px={8}
            />
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
        </>
      )}
    </Box>
  );
};

export default AccountView;
