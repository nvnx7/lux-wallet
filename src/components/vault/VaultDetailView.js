import { Box, Center, Divider, HStack, Square, VStack } from '@chakra-ui/react';
import { Identicon } from 'components/common';
import { useLocation } from 'react-router-dom';
import { CopyableAddress } from 'components/common/ui';
import VaultAssets from './VaultAssets';
import { EditableInput } from 'components/common/form';
import useVaults from 'hooks/useVaults';
import { useWallet } from 'contexts/wallet';
import { areEqualHex } from 'utils/web3';
import { SafeIcon } from 'components/icons';
import VaultMenu from './VaultMenu';

const VaultDetailView = ({ ...props }) => {
  const { state: params } = useLocation();
  const { activeAccount } = useWallet();
  const { vaults, updateVault } = useVaults({ upAddress: activeAccount.universalProfile });

  const handleLabelChange = value => {
    const label = value?.trim();
    if (label) {
      updateVault({ address: params.address, label });
    }
  };

  const vault = vaults.find(v => areEqualHex(v.address, params.address));
  return (
    <VStack>
      <HStack w="full" justify="center" spacing={2} position="relative" {...props}>
        <Square position="relative" justifyContent="center" alignItems="center">
          <Identicon address={vault.address} size={44} variant="square" />
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bgColor="blackAlpha.400" />
          <Center position="absolute" top={0} left={0} right={0} bottom={0}>
            <SafeIcon size={30} />
          </Center>
        </Square>
        <VStack spacing={0} w="40%">
          <EditableInput
            w="full"
            value={vault?.label || 'Vault'}
            text={{ fontSize: 'sm' }}
            onSubmit={handleLabelChange}
          />
          <CopyableAddress address={vault.address} />
        </VStack>
        <VaultMenu position="absolute" right={0} top={1} bottom={0} />
      </HStack>
      <Divider />
      <Box alignSelf="stretch">
        <VaultAssets vaultAddress={vault} />
      </Box>
    </VStack>
  );
};

export default VaultDetailView;
