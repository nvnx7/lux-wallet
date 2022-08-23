import { Progress, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useGetAllAssets } from 'api/asset/getAllAssets';
import { AssetList } from 'components/digital-asset';
import { DiamondIcon } from 'components/icons';
import { useAccount } from 'contexts/accounts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';

const VaultAssets = ({ vaultAddress, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching } = useGetAllAssets({ address: vaultAddress });

  if (isFetching && !data) {
    return <LoadingView my={16} />;
  }

  const handleSend = tokenAddress => {
    const state = {
      tokenAddress,
      fromAddress: vaultAddress,
      fromLabel: 'Vault',
    };
    navigate(Path.TX_SEND_TOKEN, { state });
  };

  const assetData = data?.received || [];

  return (
    <VStack alignItems="stretch" {...props}>
      <Tabs maxH="100%" variant="soft-rounded" isLazy>
        <TabList>
          <Tab fontSize="sm">Tokens</Tab>
          <Tab fontSize="sm">NFTs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AssetList
              assetAddresses={assetData?.tokens || []}
              ownerAddress={vaultAddress}
              onSendClick={handleSend}
              areNfts={false}
            />
          </TabPanel>
          <TabPanel>
            <AssetList
              assetAddresses={assetData?.nfts || []}
              ownerAddress={vaultAddress}
              onSendClick={handleSend}
              areNfts={true}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
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

export default VaultAssets;
