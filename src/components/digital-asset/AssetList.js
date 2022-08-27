import { Box, Text, VStack } from '@chakra-ui/react';
import { MehIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import AssetItemNft from './AssetItemNft';
import AssetItemToken from './AssetItemToken';

const AssetList = ({ assetAddresses = [], ownerAddress, onSendClick, areNfts, ...props }) => {
  if (assetAddresses?.length === 0) {
    return <EmptyView />;
  }

  return (
    <Box w="full" overflowY="scroll" h="360px" {...props}>
      {!areNfts &&
        assetAddresses?.map(assetAddress => (
          <AssetItemToken
            key={assetAddress}
            assetAddress={assetAddress}
            ownerAddress={ownerAddress}
            onSendClick={() => onSendClick(assetAddress)}
            my={1}
          />
        ))}

      {areNfts &&
        assetAddresses?.map(assetAddress => (
          <AssetItemNft
            key={assetAddress}
            assetAddress={assetAddress}
            ownerAddress={ownerAddress}
            onSendClick={() => onSendClick(assetAddress)}
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
    <VStack py={4} {...props}>
      <MehIcon size={64} color="gray" />
      <Text fontSize="sm" color="gray.400">
        {t('asset:no-asset-found')}
      </Text>
    </VStack>
  );
};

export default AssetList;
