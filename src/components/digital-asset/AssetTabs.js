import { Progress, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useGetUniversalProfileMetadata } from 'api/profile/getUniversalProfile';
import { DiamondIcon } from 'components/icons';
import { useAccount } from 'contexts/accounts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import AssetList from './AssetList';

const AssetTabs = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeAccount } = useAccount();
  const { data, isFetching } = useGetUniversalProfileMetadata({
    profileAddress: activeAccount?.universalProfile,
  });

  if (isFetching && !data) {
    return <LoadingView my={28} />;
  }

  const { receivedAssets, issuedAssets } = data || {};

  const handleSend = assetAddress => {
    console.log({ assetAddress });
    // navigate(Path.TX_SEND_ASSET, { state: { assetAddress } });
  };

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
          <AssetList
            assetAddresses={receivedAssets}
            ownerAddress={activeAccount?.profileAddress}
            onSendClick={handleSend}
          />
        </TabPanel>
        <TabPanel>
          <AssetList
            assetAddresses={issuedAssets}
            ownerAddress={activeAccount?.profileAddress}
            onSendClick={handleSend}
          />
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
