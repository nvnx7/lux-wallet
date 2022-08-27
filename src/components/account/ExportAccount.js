import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormPasswordInput } from 'components/common/form';
import { useTranslation } from 'react-i18next';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';
import { useWallet } from 'contexts/wallet';
import { useState } from 'react';

const schema = yup.object().shape({
  password: yup.string().required('Required'),
});
const resolver = yupResolver(schema);

const defaultValues = isDev
  ? {
      password: Mock.PASSWORD,
    }
  : undefined;

const ExportAccount = ({ ...props }) => {
  const [exportedKey, setExportedKey] = useState();
  const { t } = useTranslation();
  const { control, handleSubmit, setError } = useForm({
    resolver,
    defaultValues,
  });
  const { activeAccount, exportAccount } = useWallet();

  const onSubmit = data => {
    exportAccount(data.password, activeAccount?.address).then(res => {
      if (res.isValid) {
        let key = res.privateKey;
        if (!res.privateKey?.startsWith('0x')) key = '0x' + key;
        setExportedKey(key);
      } else {
        setError('password', { message: t('account:incorrect-password') });
      }
    });
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Text fontWeight="semibold" textAlign="center">
        {t('account:export-account')}
      </Text>
      {exportedKey ? (
        <>
          <HStack borderWidth={1} p={2} rounded="md" maxW={'100%'}>
            <Text fontSize="md" color="gray.500" textAlign="center" noOfLines={4}>
              {exportedKey}
            </Text>
          </HStack>
          <Text color="red.500" fontSize="sm">
            {t('account:export-warning')}
          </Text>
        </>
      ) : (
        <>
          <FormPasswordInput label={t('form:your-password')} name="password" control={control} />
          <Button type="submit">{t('tx:confirm')}</Button>
        </>
      )}
    </VStack>
  );
};

export default ExportAccount;
