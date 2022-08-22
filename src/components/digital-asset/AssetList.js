import { Box, Text, VStack } from '@chakra-ui/react';
import { MehIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import AssetItem from './AssetItem';

const AssetList = ({ assetAddresses = [], ownerAddress, onSendClick, ...props }) => {
  if (assetAddresses?.length === 0) {
    return <EmptyView />;
  }

  return (
    <Box maxH="400px" overflowY="scroll" {...props}>
      {assetAddresses?.map(assetAddress => (
        <AssetItem
          key={assetAddress}
          assetAddress={assetAddress}
          ownerAddress={ownerAddress}
          onSendClick={() => onSendClick(assetAddress)}
          my={1}
        />
      ))}
      <Box py={8} />
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
