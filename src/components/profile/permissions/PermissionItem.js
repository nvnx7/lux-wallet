import { Button, Flex, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { Card, CopyableAddress } from 'components/common/ui';
import { EditIcon } from 'components/icons';
import { useWallet } from 'contexts/wallet';
import { useTranslation } from 'react-i18next';
import { areEqualHex } from 'utils/web3';

const PermissionItem = ({ data, ...props }) => {
  const { activeAccount } = useWallet();
  const { t } = useTranslation();
  const isAccount = areEqualHex(data?.address, activeAccount?.address);
  const allAllowed = data?.permissions?.length >= 13;

  return (
    <Card p={2}>
      <HStack justify="space-between" {...props}>
        <VStack alignItems="start" spacing={0}>
          <CopyableAddress address={data?.address} abbreviate={16} />
          {isAccount && (
            <Text variant="body" fontSize="xs" px={2}>
              {t('common:your-account-address')}
            </Text>
          )}
        </VStack>
        <VStack>
          {allAllowed ? (
            <Text
              p={1}
              rounded="sm"
              fontSize={10}
              mx={1}
              bgColor="gray.700"
              textTransform="uppercase"
            >
              {t('common:all-allowed')}
            </Text>
          ) : (
            <Flex flexWrap="wrap">
              {data?.permissions?.map(perm => (
                <Text key={perm} p={1} rounded="sm" fontSize={10} mx={1} bgColor="gray.700">
                  {perm}
                </Text>
              ))}
            </Flex>
          )}
          <Tooltip label={t('common:coming-soon')}>
            <Button variant="ghost" size="xs" leftIcon={<EditIcon />}>
              {t('common:edit')}
            </Button>
          </Tooltip>
        </VStack>
      </HStack>
    </Card>
  );
};

export default PermissionItem;
