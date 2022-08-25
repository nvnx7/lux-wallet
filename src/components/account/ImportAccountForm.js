import { Button, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components/common/form';
import { logError } from 'utils/logger';
import { useTranslation } from 'react-i18next';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';
import { useAccount } from 'contexts/accounts';
import { useLocation } from 'react-router-dom';

const schema = yup.object().shape({
  privateKey: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{64})$/, 'Invalid private key')
    .required('Required'),
  label: yup.string(),
});
const resolver = yupResolver(schema);

const defaultValues = isDev
  ? {
      privateKey: Mock.EOA_PRIVATE_KEY,
    }
  : undefined;

const ImportAccountForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { accountsData, createNewWallet } = useAccount();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      ...defaultValues,
      label: `Account ${(accountsData?.length || 0) + 1}`,
    },
  });

  const onSubmit = data => {
    console.log({ state, data });

    let account = { ...data };
    if (!account?.label.trim()) {
      account.label = `Account ${(accountsData?.length || 0) + 1}`;
    }

    // private key may / may not be 0x prefixed
    if (account.privateKey.startsWith('0x')) {
      account.privateKey = account.privateKey.slice(2);
    }

    createNewWallet(state.password, account)
      .then(() => {})
      .catch(err => {
        logError('ImportAccountForm:onSubmit', err);
      });
  };

  return (
    <VStack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)} {...props}>
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

export default ImportAccountForm;
