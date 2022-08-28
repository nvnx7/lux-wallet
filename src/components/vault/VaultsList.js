import { Box, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { AddIcon } from 'components/icons';
import { useWallet } from 'contexts/wallet';
import { ModalView, useUI } from 'contexts/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import VaultItem from './VaultItem';
import useVaults from 'hooks/useVaults';
import { SafeIcon } from 'components/icons/3d';

const VaultsList = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeAccount } = useWallet();
  const { setModalViewAndOpen } = useUI();

  const { vaults, isLoading } = useVaults({
    upAddress: activeAccount?.universalProfile,
  });

  if (isLoading) {
    return 'Loading..';
  }

  const handleClick = address => {
    const vault = vaults.find(v => v.address === address);
    navigate(Path.VAULT_DETAIL, { state: vault });
  };

  const handleCreate = () => {
    setModalViewAndOpen(ModalView.CREATE_VAULT);
  };

  return (
    <Box position="relative" height="100%">
      {vaults.length === 0 ? (
        <EmptyView />
      ) : (
        <SimpleGrid columns={3} spacing={8} justifyItems="center" {...props}>
          {vaults.map(vault => (
            <VaultItem
              alignSelf="center"
              key={vault.address}
              data={vault}
              onClick={() => handleClick(vault.address)}
            />
          ))}
        </SimpleGrid>
      )}
      <Button
        position="absolute"
        right={0}
        bottom={10}
        leftIcon={<AddIcon />}
        onClick={handleCreate}
      >
        {t('form:create-vault')}
      </Button>
    </Box>
  );
};

const EmptyView = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <VStack py={8} {...props}>
      <SafeIcon size={24} />
      <Text fontSize="sm" color="gray.400" textAlign="center" px={8}>
        {t('asset:no-vault-found')}
      </Text>
    </VStack>
  );
};

export default VaultsList;
