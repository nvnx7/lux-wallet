import { Box, Text, VStack } from '@chakra-ui/react';
import { CoinIcon } from 'components/icons/3d';
import { useTranslation } from 'react-i18next';
import LegacyAssetItem from './LegacyAssetItem';

const LegacyAssetList = ({ assetAddresses = [], ownerAddress, onSendClick, areNfts, ...props }) => {
  if (assetAddresses?.length === 0) {
    return <EmptyView />;
  }

  return (
    <Box w="full" overflowY="scroll" h="360px" {...props}>
      {!areNfts &&
        assetAddresses?.map(assetAddress => (
          <LegacyAssetItem
            key={assetAddress}
            assetAddress={assetAddress}
            ownerAddress={ownerAddress}
            onSendClick={() => onSendClick(assetAddress)}
            my={1}
          />
        ))}

      {areNfts &&
        assetAddresses?.map(assetAddress => (
          <LegacyAssetItem
            key={assetAddress}
            assetAddress={assetAddress}
            ownerAddress={ownerAddress}
            onSendClick={() => onSendClick(assetAddress)}
            isNft={areNfts}
            my={1}
          />
        ))}
      <Box py={1} />
    </Box>
  );
};

const EmptyView = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <VStack py={6} {...props}>
      <CoinIcon size={24} />
      <Text fontSize="sm" color="gray.400">
        {t('asset:no-asset-found')}
      </Text>
    </VStack>
  );
};

export default LegacyAssetList;
