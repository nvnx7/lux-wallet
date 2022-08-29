import { Button, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components/common/form';
import { useTranslation } from 'react-i18next';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';
import { useWallet } from 'contexts/wallet';
import { useLocation } from 'react-router-dom';

const schema = yup.object().shape({
  privateKey: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{64})$/, 'error:invalid-private-key')
    .required('error:required'),
  label: yup.string(),
});
const resolver = yupResolver(schema);

const defaultValues = isDev
  ? {
      privateKey: Mock.EOA_PRIVATE_KEY,
    }
  : undefined;

const OnboardImportAccountForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { accountsData, createNewWallet } = useWallet();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      ...defaultValues,
      label: `Account ${(accountsData?.length || 0) + 1}`,
    },
  });

  const onSubmit = data => {
    const account = { ...data };
    if (!account?.label.trim()) {
      account.label = `Account ${(accountsData?.length || 0) + 1}`;
    }

    // private key may / may not be 0x prefixed
    if (account.privateKey.startsWith('0x')) {
      account.privateKey = account.privateKey.slice(2);
    }

    createNewWallet(state.password, account);
  };

  return (
    <VStack as="form" spacing={2} onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormInput label={t('form:account-label')} name="label" control={control} />

      <FormInput
        label={t('form:your-private-key')}
        name="privateKey"
        type="password"
        helperText={t('form:not-sent-to-server')}
        control={control}
      />

      <Button type="submit">{t('account:import')}</Button>
    </VStack>
  );
};

export default OnboardImportAccountForm;
