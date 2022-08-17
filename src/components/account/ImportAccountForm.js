import { Button, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components/common/form';
import { logDebug, logError } from 'utils/logger';
import { useTranslation } from 'react-i18next';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';
import keyringController, { KeyringType } from 'scripts/keyringController';
import { useAccount } from 'contexts/accounts';

const schema = yup.object().shape({
  privateKey: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{64})$/, 'Invalid private key')
    .required('Required'),
});
const resolver = yupResolver(schema);

const defaultValues = isDev
  ? {
      privateKey: Mock.EOA_PRIVATE_KEY,
    }
  : undefined;

const ImportWalletForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues,
  });
  const { unlockAccount, addNewAccount } = useAccount();

  const createNewWallet = async privateKey => {
    try {
      // Clears auto created HD wallet
      await keyringController.clearKeyrings();
      await keyringController.addNewKeyring(KeyringType.SIMPLE_KEYRING, [privateKey]);
      const addresses = await keyringController.getAccounts();
      logDebug(`Created new wallet with ${addresses.length} addresses`, addresses);
      logDebug('ImportAccountForm:createNewWallet', addresses?.[0]);
      return addresses?.[0];
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = data => {
    // private key may / may not be 0x prefixed
    let pk = data.privateKey;
    if (pk.startsWith('0x')) {
      pk = pk.slice(2);
    }

    createNewWallet(pk)
      .then(address => {
        addNewAccount({ address }, true);
        unlockAccount();
      })
      .catch(err => {
        // Possible error due to duplicate key
        logError('ImportAccountForm:onSubmit', err);
      });
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormInput
        label={t('form:your-private-key')}
        name="privateKey"
        type="password"
        helperText={t('form:not-sent-to-server')}
        control={control}
      />

      <Button type="submit">{t('form:import-wallet')}</Button>
    </VStack>
  );
};

export default ImportWalletForm;
