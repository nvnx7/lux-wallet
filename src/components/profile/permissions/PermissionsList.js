import { Spinner, VStack } from '@chakra-ui/react';
import { useListPermissionedAddresses } from 'api/profile/listPermissionedAddresses';
import { useWallet } from 'contexts/wallet';
import PermissionItem from './PermissionItem';

const PermissionsList = ({ ...props }) => {
  const { activeAccount } = useWallet();
  const { data, isLoading } = useListPermissionedAddresses({
    upAddress: activeAccount?.universalProfile,
  });

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <VStack alignItems="stretch" {...props}>
      {data?.map(v => (
        <PermissionItem key={v.address} data={v} />
      ))}
    </VStack>
  );
};

const LoadingView = () => {
  return <Spinner thickness={8} speed="0.65s" color="orange.600" size="xl" my={16} />;
};

export default PermissionsList;
