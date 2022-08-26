import { VStack } from '@chakra-ui/react';
import { useWallet } from 'contexts/wallet';
import useSentTxStore from 'hooks/useSentTxStore';
import ActivityItem from './ActivityItem';

const ActivityList = ({ ...props }) => {
  const { activeAccount } = useWallet();
  const { txList } = useSentTxStore({ accountAddress: activeAccount.address });

  console.log({ txList });

  return (
    <VStack alignItems="stretch" w="full" {...props}>
      {txList?.map(tx => (
        <ActivityItem key={`${tx.id}`} tx={tx} accountAddress={activeAccount?.address} />
      ))}
    </VStack>
  );
};

export default ActivityList;
