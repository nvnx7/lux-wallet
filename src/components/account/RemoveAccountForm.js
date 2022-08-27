import { Button, Checkbox, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CopyableAddress } from 'components/common/ui';
import { AlertIcon, TrashIcon } from 'components/icons';
import { useUI } from 'contexts/ui';
import { useWallet } from 'contexts/wallet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';
import { useForm } from 'react-hook-form';
import { FormPasswordInput } from 'components/common/form';

const schema = yup.object().shape({
  password: yup.string().required('Required'),
});
const resolver = yupResolver(schema);
const defaultValues = isDev
  ? {
      password: Mock.PASSWORD,
    }
  : undefined;
const RemoveAccount = ({ ...props }) => {
  const { t } = useTranslation();
  const { closeModal } = useUI();
  const { activeAccount, deleteAccount } = useWallet();
  const [confirmed, setConfirmed] = useState(false);

  const { control, handleSubmit, setError } = useForm({
    resolver,
    defaultValues,
  });

  const onSubmit = data => {
    deleteAccount(data.password, activeAccount?.address).then(res => {
      if (res.isValid) {
        closeModal();
      } else {
        setError('password', { message: t('account:incorrect-password') });
      }
    });
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Heading fontSize="2xl">{t('account:delete-account')}</Heading>
      <HStack color="red.500">
        <AlertIcon />
        <Text noOfLines={3}>{t('account:caution')}</Text>
      </HStack>

      <Text fontSize="sm" noOfLines={3}>
        {t('account:delete-account-confirm')}
      </Text>

      <VStack>
        <Text fontWeight="bold">{activeAccount?.label}</Text>
        <CopyableAddress address={activeAccount?.address} abbreviate={20} />
      </VStack>

      <FormPasswordInput label={t('form:your-password')} name="password" control={control} />

      <Text fontSize="xs" textAlign="center" color="red" noOfLines={3}>
        {t('account:delete-account-caution')}
      </Text>

      <Checkbox colorScheme="red" onChange={e => setConfirmed(e.target.checked)}>
        {t('account:confirm-backup')}
      </Checkbox>

      <Button
        type="submit"
        disabled={!confirmed}
        variant="ghost"
        colorScheme="red"
        leftIcon={<TrashIcon />}
      >
        {t('account:confirm-delete')}
      </Button>
    </VStack>
  );
};

export default RemoveAccount;
