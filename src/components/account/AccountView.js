import { Box, Button, VStack } from '@chakra-ui/react';
import { LuksoLogo } from 'components/common/ui';
import { ArrowUpRightIcon } from 'components/icons';
import { EmptyProfileView, UniversalProfile } from 'components/profile';
import { useAccount } from 'contexts/accounts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
          <EmptyProfileView py={2} />
        </>
      )}
    </Box>
  );
};

export default AccountView;
