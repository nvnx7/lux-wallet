import { HStack, Text, useClipboard } from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from 'components/icons';
import { abbreviateAddress } from 'utils/web3';

const CopyableAddress = ({ address = '', abbreviate = 9, text, ...props }) => {
  const { hasCopied, onCopy } = useClipboard(address);

  const handleCopy = () => {
    address && onCopy();
  };

  const abbreviated = abbreviate ? abbreviateAddress(address, abbreviate) : address;

  return (
    <HStack
      justify="center"
      px={2}
      _hover={{
        bgColor: 'gray.100',
      }}
      rounded="md"
      cursor="pointer"
      onClick={handleCopy}
      {...props}
    >
      <Text color="gray.400" fontSize="sm" {...text}>
        {abbreviated}
      </Text>
      {hasCopied ? (
        <CheckIcon size={12} color="gray.400" />
      ) : (
        <CopyIcon size={12} color="gray.400" />
      )}
    </HStack>
  );
};

export default CopyableAddress;
