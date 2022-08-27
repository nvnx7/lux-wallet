import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AssetList } from 'components/digital-asset';
import { useWallet } from 'contexts/wallet';
import useImportedLegacyAssets from 'hooks/useImportedLegacyAssets';
import Path from 'router/paths';
import { ModalView, useUI } from 'contexts/ui';
import LegacyAssetList from './LegacyAssetList';

const UniversalProfileAssets = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeAccount } = useWallet();
  const { tokens, nfts } = useImportedLegacyAssets();
  const { setModalViewAndOpen, setModalData } = useUI();

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

  const handleImport = () => {
    setModalData({ type: 'token' });
    setModalViewAndOpen(ModalView.IMPORT_LEGACY_TOKEN);
  };

  return (
    <VStack alignItems="stretch" position="relative" {...props}>
      <Tabs maxH="100%" variant="soft-rounded" isLazy>
        <TabList>
          <Tab fontSize="sm" py={0}>
            Tokens
          </Tab>
          <Tab fontSize="sm">NFTs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <LegacyAssetList
              assetAddresses={tokens || []}
              ownerAddress={activeAccount?.universalProfile}
              onSendClick={addr => handleSend(addr, false)}
              areNfts={false}
            />
          </TabPanel>
          <TabPanel px={0}>
            <LegacyAssetList
              assetAddresses={nfts || []}
              ownerAddress={activeAccount?.universalProfile}
              onSendClick={addr => handleSend(addr, true)}
              areNfts={true}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button position="absolute" right={2} bottom={2} onClick={handleImport}>
        {t('asset:import')}
      </Button>
    </VStack>
  );
};

export default UniversalProfileAssets;