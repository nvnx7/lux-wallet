import { Box, HStack, IconButton, Text, useClipboard, VStack } from '@chakra-ui/react';
import { useAccount } from 'contexts/accounts';
import { abbreviateAddress } from 'utils/web3';
import { useGetBalance } from 'api/account/getBalance';
import { LuksoLogo } from 'components/common/ui';
import { CheckIcon, CopyIcon, VerticalDotsIcon } from 'components/icons';

const AccountHeader = ({ ...props }) => {
  const { activeAccount } = useAccount();
  const { hasCopied, onCopy } = useClipboard(activeAccount?.address);
  const { data } = useGetBalance({ address: activeAccount?.address });

  const handleCopy = () => {
    activeAccount?.address && onCopy();
  };

  const addr = abbreviateAddress(activeAccount?.address || '');
  return (
    <Box w="100%" {...props}>
      <HStack justify="space-between" w="100%" position="relative">
        <VStack spacing={0} alignItems="flex-start">
          <HStack alignItems="center" spacing={1}>
            <LuksoLogo size={4} />
            <Text fontSize="sm" fontWeight="bold" color="gray.500" m={0}>
              LYX
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold">
            {data?.lyx || '0'}
          </Text>
        </VStack>
        <VStack
          spacing={0}
          p={2}
          cursor="pointer"
          rounded="md"
          _hover={{
            bgColor: 'gray.300',
          }}
          onClick={handleCopy}
        >
          <Text>Account</Text>
          <HStack>
            <Text color="gray.400" fontSize="sm">
              {addr}
            </Text>
            {hasCopied ? (
              <CheckIcon size={12} color="gray.600" />
            ) : (
              <CopyIcon size={12} color="gray.600" />
            )}
          </HStack>
        </VStack>
        <IconButton
          size="md"
          variant="ghost"
          icon={<VerticalDotsIcon size={20} />}
          marginLeft="auto"
        />
      </HStack>
    </Box>
  );
};

export default AccountHeader;
