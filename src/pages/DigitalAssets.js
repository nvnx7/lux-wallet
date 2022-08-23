import { Divider, Heading, HStack } from '@chakra-ui/react';
import { AssetTabs } from 'components/digital-asset';
import { DiamondIcon } from 'components/icons';
import { BottomNavLayout } from 'components/layout';
import { EmptyProfileView, UniversalProfileAssets } from 'components/profile';
import { useAccount } from 'contexts/accounts';
import { useTranslation } from 'react-i18next';

const DigitalAssets = () => {
  const { t } = useTranslation();
  const { activeAccount } = useAccount();

  return (
    <BottomNavLayout>
      <HStack py={2} justify="center" alignItems="center">
        <DiamondIcon size={20} />
        <Heading textAlign="center" fontSize="lg">
          {t('asset:digital-assets')}
        </Heading>
      </HStack>
      <Divider />
      {activeAccount?.universalProfile ? (
        <UniversalProfileAssets w="full" py={2} />
      ) : (
        <EmptyProfileView my={4} />
      )}
    </BottomNavLayout>
  );
};

export default DigitalAssets;
