import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useGetDigitalAsset } from 'api/asset/getDigitalAsset';
import { Card } from 'components/common/ui';
import { ArrowUpRightIcon, WalletIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import SkeletonAssetItem from './SkeletonAssetItem';
import AssetIcon from './AssetIcon';
import { ExplorerLink } from 'components/tx';

const AssetItemToken = ({ assetAddress, ownerAddress, onSendClick, ...props }) => {
  const { t } = useTranslation();
  const { data, isError, isFetching } = useGetDigitalAsset({
    assetAddress,
    ownerAddress,
  });

  if (isFetching && !data) {
    return <SkeletonAssetItem />;
  }

  return (
    <Card px={4} py={4} {...props}>
      <HStack justify="space-between" alignSelf="stretch">
        <HStack>
          <AssetIcon src={data?.iconUrl} />
          <VStack alignItems="start" justifyContent="center" spacing={0}>
            <Text fontWeight="semibold">{data?.symbol}</Text>
            <HStack>
              <Text fontSize="xs" color="whiteAlpha.600">
                {data?.name}
              </Text>
              <ExplorerLink variant="icon" fontSize="xs" address={assetAddress} />
            </HStack>
          </VStack>
        </HStack>
        <VStack alignItems="end" justify="space-between" spacing={0}>
          <HStack>
            <WalletIcon size={10} color="gray" />
            <Text fontWeight="bold">{data?.balance?.lyx}</Text>
          </HStack>
          <Button size="xs" leftIcon={<ArrowUpRightIcon />} variant="ghost" onClick={onSendClick}>
            {t('tx:send')}
          </Button>
        </VStack>
      </HStack>
    </Card>
  );
};

export default AssetItemToken;
