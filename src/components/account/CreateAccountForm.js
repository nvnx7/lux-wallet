import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components/common/form';
import { logDebug } from 'utils/logger';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'contexts/accounts';
import { ModalView, useUI } from 'contexts/ui';

const schema = yup.object().shape({
  label: yup.string(),
});
const resolver = yupResolver(schema);

const CreateAccountForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { setModalView, closeModal } = useUI();
  const { accountsData, addNewAccount } = useAccount();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: { label: `Account ${(accountsData?.length || 0) + 1}` },
  });

  const onSubmit = data => {
    logDebug('CreateAccountForm:onSubmit', data);
    let label = data.label;
    if (!label?.trim()) {
      label = `Account ${(accountsData?.length || 0) + 1}`;
    }

    // addNewAccount({ label, address: ''}, true);
    closeModal();
  };

  const handleImport = () => {
    setModalView(ModalView.IMPORT_ACCOUNT);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Heading>{t('form:create-vault')}</Heading>
      <FormInput label={t('form:account-label')} name="label" control={control} />

      <VStack>
        <Button type="submit" mt={4}>
          {t('form:create-account')}
        </Button>
        <HStack>
          <Text variant="body">{t('form:already-have-vault')}</Text>
          <Button variant="link" color="gray.500" fontSize="sm" onClick={handleImport}>
            {t('account:import')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default CreateAccountForm;
