import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { useGetVaultAssets } from 'api/vault/getVaultAssets';
import { Identicon } from 'components/common';
import { useLocation } from 'react-router-dom';
import { CopyableAddress } from 'components/common/ui';
import VaultAssets from './VaultAssets';

const VaultDetailView = ({ ...props }) => {
  const { state: vault } = useLocation();

  return (
    <VStack spacing={0} {...props}>
      <Identicon address={vault.address} variant="square" size={32} />
      <Text fontWeight="semibold" textAlign="center">
        {vault.label}
      </Text>
      <CopyableAddress address={vault.address} />
      <Divider />
      <Box alignSelf="stretch">
        <VaultAssets vaultAddress={vault?.address} />
      </Box>
    </VStack>
  );
};

export default VaultDetailView;
