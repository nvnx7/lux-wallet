import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components/common/form';
import { logDebug, logError } from 'utils/logger';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'contexts/accounts';
import { ModalView, useUI } from 'contexts/ui';
import { useCreateVault } from 'api/vault';
import { useEffect } from 'react';

const schema = yup.object().shape({
  label: yup.string(),
});
const resolver = yupResolver(schema);

const AddVaultForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { setModalView, closeModal } = useUI();
  const { activeAccount, addVault } = useAccount();
  const { control, handleSubmit, getValues } = useForm({
    resolver,
    defaultValues: { label: `Vault ${(activeAccount?.vaults?.length || 0) + 1}` },
  });
  const { data: txData, isLoading, isError, mutate: createVault } = useCreateVault();

  useEffect(() => {
    if (!txData) return;
    const label = getValues('label') || `Vault ${(activeAccount?.vaults?.length || 0) + 1}`;
    const vault = { label, address: txData.contractAddress };
    addVault(activeAccount.address, vault);
    closeModal();
  }, [txData, activeAccount]);

  const onSubmit = data => {
    logDebug('AddVaultForm:onSubmit', data);
    let label = data.label;
    if (!label?.trim()) {
      label = `Vault ${(activeAccount?.vaults?.length || 0) + 1}`;
    }

    createVault({
      profileAddress: activeAccount?.universalProfile,
      from: activeAccount?.address,
    });
  };

  const handleAddExisting = () => {
    setModalView(ModalView.ADD_VAULT);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Heading fontSize="lg">{t('form:create-vault')}</Heading>
      <FormInput label={t('form:vault-label')} name="label" control={control} />

      <VStack>
        <Button isLoading={isLoading} type="submit" mt={4}>
          {t('form:create-vault')}
        </Button>
        <HStack>
          <Text variant="body">{t('form:already-have-vault')}</Text>
          <Button
            disabled={isLoading}
            variant="link"
            color="gray.500"
            fontSize="sm"
            onClick={handleAddExisting}
          >
            {t('form:add-existing')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default AddVaultForm;
