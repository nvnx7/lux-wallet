import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components/common/form';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'contexts/wallet';
import { ModalView, useUI } from 'contexts/ui';

const schema = yup.object().shape({
  label: yup.string(),
});
const resolver = yupResolver(schema);

const CreateAccountForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { setModalView, closeModal } = useUI();
  const { accountsData, createNewAccount } = useWallet();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: { label: `Account ${(accountsData?.length || 0) + 1}` },
  });

  const onSubmit = data => {
    let label = data.label;
    if (!label?.trim()) {
      label = `Account ${(accountsData?.length || 0) + 1}`;
    }

    createNewAccount({ label });
    closeModal();
  };

  const handleImport = () => {
    setModalView(ModalView.IMPORT_ACCOUNT);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Heading fontSize="2xl">{t('form:create-account')}</Heading>
      <FormInput label={t('form:account-label')} name="label" control={control} />

      <VStack>
        <Button type="submit" mt={4}>
          {t('form:create-account')}
        </Button>
        <HStack>
          <Text variant="body">{t('form:want-to-import-account')}</Text>
          <Button variant="link" color="gray.500" fontSize="sm" onClick={handleImport}>
            {t('account:import')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default CreateAccountForm;
