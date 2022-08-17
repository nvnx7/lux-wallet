import { Divider, Heading, HStack } from '@chakra-ui/react';
import { AssetTabs } from 'components/digital-asset';
import { DiamondIcon } from 'components/icons';
import { BottomNavLayout } from 'components/layout';
import { useTranslation } from 'react-i18next';

const DigitalAssets = () => {
  const { t } = useTranslation();
  return (
    <BottomNavLayout>
      <HStack py={2} justify="center" alignItems="center">
        <DiamondIcon size={20} />
        <Heading textAlign="center" fontSize="lg">
          {t('asset:digital-assets')}
        </Heading>
      </HStack>
      <Divider />
      <AssetTabs py={2} />
    </BottomNavLayout>
  );
};

export default DigitalAssets;
