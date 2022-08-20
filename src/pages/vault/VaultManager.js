import { Box, Divider, Heading, HStack } from '@chakra-ui/react';
import { ShieldIcon } from 'components/icons';
import { BottomNavLayout } from 'components/layout';
import { VaultsList } from 'components/vault';
import { useAccount } from 'contexts/accounts';
import { useTranslation } from 'react-i18next';

const VaultManager = () => {
  const { t } = useTranslation();
  const { activeAccount } = useAccount();
  return (
    <BottomNavLayout>
      <HStack py={2} justify="center" alignItems="center">
        <ShieldIcon size={20} />
        <Heading textAlign="center" fontSize="lg">
          {t('asset:vault-manager')}
        </Heading>
      </HStack>
      <Divider />
      <VaultsList py={2} />
    </BottomNavLayout>
  );
};

export default VaultManager;
