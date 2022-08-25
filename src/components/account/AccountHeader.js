import { Box, HStack, Text, useClipboard, VStack } from '@chakra-ui/react';
import { useWallet } from 'contexts/wallet';
import { abbreviateAddress } from 'utils/web3';
import { useGetBalance } from 'api/account/getBalance';
import { LuksoLogo } from 'components/common/ui';
import { CheckIcon, CopyIcon } from 'components/icons';
import { Identicon } from 'components/common';
import AccountMenu from './AccountMenu';
import { usePreferences } from 'contexts/preferences';

const AccountHeader = ({ ...props }) => {
  const { network } = usePreferences();
  const { activeAccount } = useWallet();
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
              {network?.currencySymbol}
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
            bgColor: 'whiteAlpha.200',
          }}
          onClick={handleCopy}
        >
          <HStack>
            <Identicon address={activeAccount?.address} size={20} />
            <Text>{activeAccount?.label}</Text>
          </HStack>
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
        <AccountMenu />
      </HStack>
    </Box>
  );
};

export default AccountHeader;
