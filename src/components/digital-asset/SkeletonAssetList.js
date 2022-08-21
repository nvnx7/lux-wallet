import { VStack } from '@chakra-ui/react';
import SkeletonAssetItem from './SkeletonAssetItem';

const SkeletonAssetList = ({ count = 3, ...props }) => {
  return (
    <VStack alignItems="stretch" {...props}>
      {Array.from({ length: count }).map((d, idx) => (
        <SkeletonAssetItem key={idx} my={1} />
      ))}
    </VStack>
  );
};

export default SkeletonAssetList;
