import { VStack } from '@chakra-ui/react';
import AssetItemSkeleton from './SkeletonAssetItem';

const AssetListSkeleton = ({ count = 3, ...props }) => {
  return (
    <VStack alignItems="stretch" {...props}>
      {Array.from({ length: count }).map((d, idx) => (
        <AssetItemSkeleton key={idx} />
      ))}
    </VStack>
  );
};

export default AssetListSkeleton;
