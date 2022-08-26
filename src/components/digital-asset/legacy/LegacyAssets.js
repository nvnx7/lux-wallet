import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AssetList } from 'components/digital-asset';
import { useWallet } from 'contexts/wallet';
import useImportedLegacyAssets from 'hooks/useImportedLegacyAssets';
import Path from 'router/paths';

const UniversalProfileAssets = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeAccount } = useWallet();
  const { tokens, nfts } = useImportedLegacyAssets();

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

  return (
    <VStack alignItems="stretch" {...props}>
      <Tabs maxH="100%" variant="soft-rounded" isLazy>
        <TabList>
          <Tab fontSize="sm" py={0}>
            Tokens
          </Tab>
          <Tab fontSize="sm">NFTs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <AssetList
              assetAddresses={tokens || []}
              ownerAddress={activeAccount?.universalProfile}
              onSendClick={addr => handleSend(addr, false)}
              areNfts={false}
            />
          </TabPanel>
          <TabPanel px={0}>
            <AssetList
              assetAddresses={nfts || []}
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

export default UniversalProfileAssets;
