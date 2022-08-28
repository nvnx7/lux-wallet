import { useNavigate } from 'react-router-dom';
import {
  Progress,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { useGetAllAssets } from 'api/asset/getAllAssets';
import { AssetList } from 'components/digital-asset';
import { DiamondIcon } from 'components/icons';
import Path from 'router/paths';

const VaultAssets = ({ vaultAddress, ...props }) => {
  const navigate = useNavigate();
  const { data, isFetching } = useGetAllAssets({ address: vaultAddress });

  if (isFetching && !data) {
    return <LoadingView my={16} />;
  }

  const handleSend = (assetAddress, isNft) => {
    const state = {
      fromAddress: vaultAddress,
      fromLabel: 'Vault',
    };
    if (isNft) {
      state.nftAddress = assetAddress;
      navigate(Path.TX_SEND_NFT, { state });
    } else {
      state.tokenAddress = assetAddress;
      navigate(Path.TX_SEND_TOKEN, { state });
    }
  };

  const assetData = data?.received || [];

  return (
    <VStack alignItems="stretch" {...props}>
      <Tabs maxH="100%" variant="soft-rounded" isLazy>
        <TabList px={2}>
          <Tab fontSize="sm">Tokens</Tab>
          <Tab fontSize="sm">NFTs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AssetList
              assetAddresses={assetData?.tokens || []}
              ownerAddress={vaultAddress}
              onSendClick={addr => handleSend(addr, false)}
              areNfts={false}
            />
          </TabPanel>
          <TabPanel>
            <AssetList
              assetAddresses={assetData?.nfts || []}
              ownerAddress={vaultAddress}
              onSendClick={addr => handleSend(addr, true)}
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
      <Spinner thickness={8} speed="0.65s" color="orange.600" size="xl" />
    </VStack>
  );
};

export default VaultAssets;
