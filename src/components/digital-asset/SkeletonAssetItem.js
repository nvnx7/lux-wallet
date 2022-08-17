import { HStack, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';
import { Card } from 'components/common/ui';

const AssetItemSkeleton = ({ ...props }) => {
  return (
    <Card bgColor="white" p={4} {...props}>
      <HStack spacing={2}>
        <SkeletonCircle width={12} height={12} />
        <VStack alignItems="start" w="100%">
          <Skeleton height={2} width="70%" />
          <Skeleton height={2} width="40%" />
        </VStack>
      </HStack>
    </Card>
  );
};

export default AssetItemSkeleton;
