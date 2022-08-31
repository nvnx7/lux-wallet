import {
  HStack,
  Spinner,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useListDigitalAssets } from 'api/asset/listDigitalAssets';
import { AssetList } from 'components/digital-asset';
import { useWallet } from 'contexts/wallet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import { gradient } from 'theme/colors';

const UniversalProfileAssets = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [assetFlag, setAssetFlag] = useState(true);
  const { activeAccount } = useWallet();
  const { data, isFetching } = useListDigitalAssets({ address: activeAccount?.universalProfile });

  if (isFetching && !data) {
    return <LoadingView my={28} />;
  }

  const handleSend = (assetAddress, isNft) => {
    const state = {
      fromAddress: activeAccount?.universalProfile,
      fromLabel: 'Universal Profile',
    };
    if (isNft) {
      state.nftAddress = assetAddress;
      navigate(Path.TX_SEND_NFT, { state });
    } else {
      state.tokenAddress = assetAddress;
      navigate(Path.TX_SEND_TOKEN, { state });
    }
  };

  const assetData = assetFlag ? data?.received : data?.issued;

  return (
    <VStack alignItems="stretch" {...props}>
      <Tabs maxH="100%" variant="soft-rounded" isLazy>
        <TabList>
          <Tab fontSize="sm" _selected={{ bgImage: gradient, color: 'white' }}>
            Tokens
          </Tab>
          <Tab fontSize="sm" _selected={{ bgImage: gradient, color: 'white' }}>
            NFTs
          </Tab>
          <HStack ml="auto" alignItems="center">
            <Text fontSize="xs">{t('asset:issued')}</Text>
            <Switch
              size="md"
              mr={4}
              colorScheme="orange"
              isChecked={assetFlag}
              onChange={() => setAssetFlag(!assetFlag)}
            />
            <Text fontSize="xs">{t('asset:received')}</Text>
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <AssetList
              assetAddresses={assetData?.tokens || []}
              ownerAddress={activeAccount?.universalProfile}
              onSendClick={addr => handleSend(addr, false)}
              areNfts={false}
            />
          </TabPanel>
          <TabPanel px={0}>
            <AssetList
              assetAddresses={assetData?.nfts || []}
              ownerAddress={activeAccount?.universalProfile}
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

export default UniversalProfileAssets;
