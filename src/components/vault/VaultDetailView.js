import { Box, Divider, VStack } from '@chakra-ui/react';
import { Identicon } from 'components/common';
import { useLocation } from 'react-router-dom';
import { CopyableAddress } from 'components/common/ui';
import VaultAssets from './VaultAssets';
import { EditableInput } from 'components/common/form';
import useVaults from 'hooks/useVaults';
import { useWallet } from 'contexts/wallet';
import { areEqualHex } from 'utils/web3';

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
    <VStack spacing={0} {...props}>
      <Identicon address={vault.address} variant="square" size={32} />
      <EditableInput value={vault?.label || 'Vault'} onSubmit={handleLabelChange} />
      <CopyableAddress address={vault.address} />
      <Divider />
      <Box alignSelf="stretch">
        <VaultAssets vaultAddress={vault?.address} />
      </Box>
    </VStack>
  );
};

export default VaultDetailView;
