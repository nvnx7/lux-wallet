import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useListVaults } from 'api/vault/listVaults';
import { AddIcon } from 'components/icons';
import { useWallet } from 'contexts/wallet';
import { ModalView, useUI } from 'contexts/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import { abbreviateHex } from 'utils/web3';
import VaultItem from './VaultItem';

const VaultsList = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeAccount } = useWallet();
  const { setModalViewAndOpen } = useUI();

  const { data, isFetching, isError } = useListVaults({
    upAddress: activeAccount?.universalProfile,
  });

  // const vaults = activeAccount?.vaults || [];
  // const vaults = [
  //   { address: '0x923F49Bac508E4Ec063ac097E00b4a3cAc68a353' },
  //   { address: '0x15bE66F00faf8bdA2DD113599ffA9fC53f801c39' },
  //   { address: '0xc9aA37D74654d6318E10b0DdA35E935848d76901' },
  //   { address: '0x42E4bf4c952198Ec33af8d579812886eCde1bde8' },
  // ];

  if (isFetching && !data) {
    return 'Loading..';
  }

  const vaults = data?.map(v => ({ label: abbreviateHex(v, 6), address: v })) || [];

  if (vaults.length === 0) {
    return 'No vaults found';
  }

  const handleClick = address => {
    const vault = vaults.find(v => v.address === address);
    navigate(Path.VAULT_DETAIL, { state: vault });
  };

  const handleAdd = () => {
    setModalViewAndOpen(ModalView.CREATE_VAULT);
  };

  return (
    <Box position="relative" height="80%">
      <SimpleGrid columns={3} spacing={8} {...props}>
        {vaults.map((vault, idx) => (
          <VaultItem key={vault.address} data={vault} onClick={() => handleClick(vault.address)} />
        ))}
      </SimpleGrid>
      <Button position="absolute" right={2} bottom={6} leftIcon={<AddIcon />} onClick={handleAdd}>
        {t('form:create-vault')}
      </Button>
    </Box>
  );
};

export default VaultsList;
