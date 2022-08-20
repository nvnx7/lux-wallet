import { Avatar, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { getDigitalAsset, useGetDigitalAsset } from 'api/assets/getDigitalAsset';
import { Card, CopyableAddress } from 'components/common/ui';
import { WalletIcon } from 'components/icons';
import { useAccount } from 'contexts/accounts';
import { useTranslation } from 'react-i18next';
import AssetItemSkeleton from './SkeletonAssetItem';

import fallbackSrc from 'assets/images/coin.png';

const AssetItem = ({ assetAddress, ...props }) => {
  const { t } = useTranslation();
  const { activeAccount } = useAccount();
  const { data, isLoading, isError, isFetching } = useGetDigitalAsset({
    assetAddress,
    profileAddress: activeAccount?.universalProfile,
  });

  if (isFetching && !data) {
    return <AssetItemSkeleton />;
  }

  return (
    <Card px={4} py={4} bgColor="white" {...props}>
      <HStack justify="space-between">
        <HStack {...props}>
          <Image
            boxSize="42px"
            borderRadius="full"
            src={data?.iconUrl}
            fallbackSrc={fallbackSrc}
            bgColor="none"
          />
          <VStack alignItems="start" justifyContent="center" spacing={0}>
            <Text fontWeight="bold">{data?.symbol}</Text>
            <Text fontSize="xs" color="gray.400">
              {data?.name}
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems="end" justify="space-between" spacing={0}>
          <HStack>
            <WalletIcon size={10} color="gray" />
            <Text fontSize="xs" color="gray">
              {t('asset:balance')}
            </Text>
          </HStack>
          <Text fontWeight="bold">{data?.balance}</Text>
          <CopyableAddress address={assetAddress} text={{ fontSize: 'xs', color: 'gray.400' }} />
        </VStack>
      </HStack>
    </Card>
  );
};

export default AssetItem;
