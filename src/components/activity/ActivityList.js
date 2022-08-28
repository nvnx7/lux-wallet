import { Text, VStack } from '@chakra-ui/react';
import { PageIcon } from 'components/icons/3d';
import { useWallet } from 'contexts/wallet';
import useSentTxStore from 'hooks/useSentTxStore';
import { useTranslation } from 'react-i18next';
import ActivityItem from './ActivityItem';

const ActivityList = ({ ...props }) => {
  const { activeAccount } = useWallet();
  const { txList } = useSentTxStore({ accountAddress: activeAccount.address });

  if (!txList || txList.length === 0) {
    <EmptyView />;
  }

  return (
    <VStack alignItems="stretch" w="full" {...props}>
      {txList?.map(tx => (
        <ActivityItem key={`${tx.id}`} tx={tx} accountAddress={activeAccount?.address} />
      ))}
    </VStack>
  );
};

const EmptyView = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <VStack py={8} {...props}>
      <PageIcon size={24} />
      <Text fontSize="sm" color="gray.400" textAlign="center" px={8}>
        {t('account:no-activity-found')}
      </Text>
    </VStack>
  );
};

export default ActivityList;
