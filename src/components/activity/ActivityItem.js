import { HStack, Text } from '@chakra-ui/react';
import { useGetTxReceipt } from 'api/tx/getTxReceipt';
import { Card } from 'components/common/ui';
import { ArrowStraightIcon, CheckIcon, WatchIcon, XIcon } from 'components/icons';
import { ExplorerLink } from 'components/tx';
import useSentTxStore from 'hooks/useSentTxStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'utils/datetime';
import { abbreviateHex, weiToLyx } from 'utils/web3';

const ActivityItem = ({ tx, accountAddress, ...props }) => {
  const { t } = useTranslation();
  // This network call executes only when tx status is pending
  const { data: txData } = useGetTxReceipt({ hash: tx.hash, status: tx.status });
  const { updateSentTx } = useSentTxStore({ accountAddress });

  useEffect(() => {
    if (txData && txData.status !== 'pending') {
      updateSentTx({ id: tx.id, status: txData.status, gasUsed: txData.gasUsed });
      //@todo register some callback to send notification probably
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txData?.status]);

  return (
    <Card p={2} {...props}>
      <HStack w="full" alignItems="flex-start" justify="space-between">
        <HStack>
          <Text fontSize="xs" fontWeight="semibold">
            Hash:
          </Text>
          <Text variant="body" fontSize="xs">
            {abbreviateHex(tx.hash, 22)}
          </Text>
          <ExplorerLink variant="icon" type="tx" />
        </HStack>
        <Text fontSize="xs" ml="auto">
          {formatDate(tx.timestamp)}
        </Text>
      </HStack>

      <HStack justify="space-between" my={1}>
        <HStack alignItems="flex-start" spacing={1}>
          <Text fontSize="xs" fontWeight="semibold">
            {t('tx:from')}:
          </Text>
          <HStack>
            <Text variant="body" fontSize="xs">
              {abbreviateHex(tx.from, 14)}
            </Text>
            <ExplorerLink variant="icon" />
          </HStack>
        </HStack>

        <ArrowStraightIcon size={12} />

        <HStack alignItems="flex-start" spacing={1}>
          <Text fontSize="xs" fontWeight="semibold">
            {t('tx:to')}:
          </Text>
          <HStack>
            <Text variant="body" fontSize="xs">
              {abbreviateHex(tx.to, 14)}
            </Text>
            <ExplorerLink variant="icon" />
          </HStack>
        </HStack>
      </HStack>

      <HStack justify="space-between">
        <HStack>
          <Text fontSize="xs" fontWeight="semibold">
            {t('tx:value')}:
          </Text>
          <Text fontSize="xs" fontWeight="semibold" variant="body">
            {weiToLyx(tx.value)} LYX
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="xs" fontWeight="semibold">
            {t('tx:status')}:
          </Text>
          <Status status={tx.status} />
        </HStack>
      </HStack>
    </Card>
  );
};

const Status = ({ status }) => {
  let color = 'orange';
  if (status === 'success') color = 'green';
  else if (status === 'error') color = 'red';

  return (
    <HStack spacing={0} alignItems="center">
      {status === 'pending' && <WatchIcon size={12} color={color} />}
      {status === 'success' && <CheckIcon size={12} color={color} />}
      {status === 'error' && <XIcon size={12} color={color} />}
      <Text fontSize="xs" fontWeight="semibold" color={color}>
        {status?.toUpperCase()}
      </Text>
    </HStack>
  );
};

export default ActivityItem;
