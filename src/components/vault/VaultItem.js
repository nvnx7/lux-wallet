import { Box, Center, Square, Text, VStack } from '@chakra-ui/react';
import { Identicon } from 'components/common';
import { SafeIcon } from 'components/icons';

import { abbreviateHex } from 'utils/web3';

const VaultItem = ({ data, onClick, ...props }) => {
  return (
    <VStack
      boxSize={20}
      shadow="md"
      rounded="md"
      cursor="pointer"
      onClick={onClick}
      justify="center"
      _hover={{ bgColor: 'whiteAlpha.200' }}
      {...props}
    >
      <Square position="relative" justifyContent="center" alignItems="center">
        <Identicon address={data.address} size={48} variant="square" />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bgColor="blackAlpha.400" />
        <Center position="absolute" top={0} left={0} right={0} bottom={0}>
          <SafeIcon size={32} />
        </Center>
      </Square>

      <Text fontSize="xs" fontWeight="semibold" noOfLines={1}>
        {data.label || abbreviateHex(data.address, 8)}
      </Text>
    </VStack>
  );
};

export default VaultItem;
