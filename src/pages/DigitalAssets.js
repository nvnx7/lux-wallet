import { Box, Divider, Heading, HStack } from '@chakra-ui/react';
import { AssetMenu } from 'components/digital-asset';
import { LegacyAssets } from 'components/digital-asset/legacy';
import { DiamondIcon } from 'components/icons';
import { BottomNavLayout } from 'components/layout';
import { EmptyProfileView, UniversalProfileAssets } from 'components/profile';
import { useWallet } from 'contexts/wallet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DigitalAssets = () => {
  const { t } = useTranslation();
  const { activeAccount } = useWallet();
  const [assetType, setAssetType] = useState('lukso');

  return (
    <BottomNavLayout>
      <HStack py={2} justify="space-between" alignItems="center" position="relative">
        <Box px={6} />
        <HStack>
          <DiamondIcon size={20} />
          <Heading textAlign="center" fontSize="lg">
            {t('asset:digital-assets')}
          </Heading>
        </HStack>
        <AssetMenu onOptionChange={v => setAssetType(v)} />
      </HStack>
      <Divider />
      {!activeAccount?.universalProfile && <EmptyProfileView my={4} />}
      {activeAccount?.universalProfile && assetType === 'lukso' && (
        <UniversalProfileAssets h={100} />
      )}
      {activeAccount?.universalProfile && assetType === 'legacy' && <LegacyAssets h={100} />}
    </BottomNavLayout>
  );
};

export default DigitalAssets;
