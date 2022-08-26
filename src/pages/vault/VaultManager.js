import { Divider, Heading, HStack } from '@chakra-ui/react';
import { ShieldIcon } from 'components/icons';
import { BottomNavLayout } from 'components/layout';
import { EmptyProfileView } from 'components/profile';
import { VaultsList } from 'components/vault';
import { useWallet } from 'contexts/wallet';
import { useTranslation } from 'react-i18next';

const VaultManager = () => {
  const { t } = useTranslation();
  const { activeAccount } = useWallet();
  return (
    <BottomNavLayout>
      <HStack py={2} justify="center" alignItems="center">
        <ShieldIcon size={20} />
        <Heading textAlign="center" fontSize="lg">
          {t('asset:vault-manager')}
        </Heading>
      </HStack>
      <Divider />
      {activeAccount?.universalProfile ? <VaultsList pt={2} /> : <EmptyProfileView py={8} />}
    </BottomNavLayout>
  );
};

export default VaultManager;
