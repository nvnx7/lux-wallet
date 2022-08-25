import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'contexts/wallet';
import { useUI } from 'contexts/ui';
import { useCreateVault } from 'api/vault';
import { CopyableAddress } from 'components/common/ui';
import { ExplorerLink } from 'components/tx';
import { useEffect } from 'react';
import useToast from 'hooks/useToast';

const CreateVaultForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { showTxStatusToast } = useToast();
  const { closeModal } = useUI();
  const { activeAccount } = useWallet();

  const { isSuccess, isLoading, isError, mutate: createVault } = useCreateVault();

  useEffect(() => {
    if (isSuccess || isError) {
      showTxStatusToast(isSuccess, isError);
      closeModal();
    }
  });

  const handleCreate = () => {
    createVault({
      upAddress: activeAccount?.universalProfile,
      accountAddress: activeAccount?.address,
    });
  };

  return (
    <VStack {...props}>
      <Heading fontSize="lg">{t('form:create-vault')}</Heading>
      <Text variant="body" textAlign="center">
        {t('form:create-vault-desc')}
      </Text>
      <VStack alignItems="flex-start">
        <Text fontWeight="semibold">{t('common:universal-profile')}</Text>
        <CopyableAddress address={activeAccount.universalProfile} abbreviate={32} />
        <ExplorerLink address={activeAccount.universalProfile} ml={2} />
      </VStack>

      <VStack>
        <Button isLoading={isLoading} onClick={handleCreate} mt={4}>
          {t('form:create-vault')}
        </Button>
      </VStack>
    </VStack>
  );
};

export default CreateVaultForm;
