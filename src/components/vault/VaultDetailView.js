import { Text, VStack } from '@chakra-ui/react';
import { Identicon } from 'components/common';
import { CopyableAddress } from 'components/common/ui';
import { useLocation } from 'react-router-dom';

const VaultDetailView = ({ ...props }) => {
  const { state: vault } = useLocation();
  return (
    <VStack {...props}>
      <Identicon address={vault.address} size={40} />
      <Text fontWeight="semibold" textAlign="center">
        {vault.label}
      </Text>
      <CopyableAddress address={vault.address} />
    </VStack>
  );
};

export default VaultDetailView;
