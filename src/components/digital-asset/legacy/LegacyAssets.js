import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'contexts/wallet';
import useImportedLegacyAssets from 'hooks/useImportedLegacyAssets';
import { ModalView, useUI } from 'contexts/ui';
import LegacyAssetList from './LegacyAssetList';
import { gradient } from 'theme/colors';

const UniversalProfileAssets = ({ ...props }) => {
  const { t } = useTranslation();
  const { activeAccount } = useWallet();
  const { tokens, nfts } = useImportedLegacyAssets();
  const { setModalViewAndOpen, setModalData } = useUI();

  const handleSend = (assetAddress, isNft) => {
    const state = {
      fromAddress: activeAccount?.universalProfile,
      fromLabel: 'Universal Profile',
    };
    //@todo coming soon!
  };

  const handleImport = () => {
    setModalData({ type: 'token' });
    setModalViewAndOpen(ModalView.IMPORT_LEGACY_TOKEN);
  };

  return (
    <VStack alignItems="stretch" position="relative" {...props}>
      <Tabs maxH="100%" variant="soft-rounded" isLazy>
        <TabList>
          <Tab fontSize="sm" py={0} _selected={{ bgImage: gradient, color: 'white' }}>
            Tokens
          </Tab>
          <Tab fontSize="sm" _selected={{ bgImage: gradient, color: 'white' }}>
            NFTs
          </Tab>
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
