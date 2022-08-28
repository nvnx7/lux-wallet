import { Button, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { Card } from 'components/common/ui';
import { ArrowUpRightIcon, WalletIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import SkeletonAssetItem from '../SkeletonAssetItem';
import AssetIcon from '../AssetIcon';
import { ExplorerLink } from 'components/tx';
import { useGetLegacyToken } from 'api/asset/legacy/getLegacyToken';

const LegacyAssetItem = ({ assetAddress, ownerAddress, onSendClick, isNft, ...props }) => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetLegacyToken({
    tokenAddress: assetAddress,
    ownerAddress,
  });

  if (isFetching && !data) {
    return <SkeletonAssetItem />;
  }

  return (
    <Card px={4} py={4} {...props}>
      <HStack justify="space-between" alignSelf="stretch">
        <HStack {...props}>
          <AssetIcon src={data?.iconUrl} isNft={isNft} />
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
            <Text fontWeight="bold">{isNft ? data?.balance?.wei : data?.balance?.lyx}</Text>
          </HStack>
          <Tooltip label={t('common:coming-soon')} bg="gray.700" color="white" fontSize="xs">
            <Button size="xs" leftIcon={<ArrowUpRightIcon />} variant="ghost">
              {t('tx:send')}
            </Button>
          </Tooltip>
        </VStack>
      </HStack>
    </Card>
  );
};

export default LegacyAssetItem;
