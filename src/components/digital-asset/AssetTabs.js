import {
  Center,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useGetUniversalProfileMetadata } from 'api/profile/getUniversalProfile';
import { DiamondIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import AssetList from './AssetList';

const AssetTabs = ({ ...props }) => {
  const { t } = useTranslation();
  const profileAddress = '0xa907c1904c22DFd37FF56c1f3c3d795682539196';
  const { data, isFetching } = useGetUniversalProfileMetadata({ profileAddress });

  if (isFetching && !data) {
    return <LoadingView my={28} />;
  }

  const { receivedAssets, issuedAssets } = data || {};

  return (
    <Tabs maxH="100%" variant="soft-rounded" isLazy {...props}>
      <TabList>
        <Tab fontSize="sm" py={0}>
          {t('asset:received')}
        </Tab>
        <Tab fontSize="sm">{t('asset:issued')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AssetList assetAddresses={receivedAssets} />
        </TabPanel>
        <TabPanel>
          <AssetList assetAddresses={issuedAssets} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const LoadingView = ({ ...props }) => {
  return (
    <VStack w="100%" justify="center" spacing={4} {...props}>
      <DiamondIcon size={64} />
      <Progress w="40%" size="xs" colorScheme="primary" isIndeterminate />
    </VStack>
  );
};

export default AssetTabs;
