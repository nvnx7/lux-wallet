import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FormDropdownInput, FormInput } from 'components/common/form';
import { useAccount } from 'contexts/accounts';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { LuksoLogo } from 'components/common/ui';
import { usePreferences } from 'contexts/preferences';
import { WalletIcon } from 'components/icons';
import { useGetBalance } from 'api/account/getBalance';
import { useSendLyx } from 'api/asset/sendLyx';

const schema = yup.object().shape({
  from: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'Invalid address')
    .required('Required'),
  to: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'Invalid address')
    .required('Required'),
  amount: yup.number().positive('Invalid amount').typeError('Invalid amount').required('Required'),
});
const resolver = yupResolver(schema);

const SendLyxForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { network } = usePreferences();
  const { activeAccount } = useAccount();

  const { control, handleSubmit, setError } = useForm({
    resolver,
    defaultValues: { from: activeAccount?.universalProfile || undefined },
  });
  const fromAddress = useWatch({ control, name: 'from' });
  const { data: balance } = useGetBalance({ address: fromAddress });
  const { data, mutate: sendLyx, error, isLoading } = useSendLyx();

  console.log({ data, error });

  const onSubmit = data => {
    if (data.amount > Number(balance.lyx || 0)) {
      setError('amount', { type: 'custom', message: 'Insufficient balance' });
    } else {
      sendLyx({ ...data, accountAddress: activeAccount?.address });
    }
  };

  const addressOpts = [
    { label: 'Your Account', value: activeAccount.address },
    { label: 'Universal Profile', value: activeAccount.universalProfile },
  ];

  return (
    <VStack as="form" px={8} onSubmit={handleSubmit(onSubmit)} {...props}>
      <VStack>
        <LuksoLogo size={8} />
        <HStack>
          <WalletIcon size={12} color="gray" />
          <Text fontSize="sm">{network?.currencySymbol}</Text>
          <Text fontSize="sm" fontWeight="bold">
            {balance?.lyx || '0'}
          </Text>
        </HStack>
      </VStack>
      <Divider />
      <FormDropdownInput label={t('tx:from')} name="from" options={addressOpts} control={control} />

      <FormDropdownInput label={t('tx:to')} name="to" options={addressOpts} control={control} />
      <HStack>
        <FormInput label={t('tx:amount')} name="amount" control={control} flex={0.6} />
        <Text fontWeight="bold" pt={6}>
          {network?.currencySymbol}
        </Text>
      </HStack>
      <Button type="submit" isLoading={isLoading}>
        {t('tx:review')}
      </Button>
    </VStack>
  );
};

export default SendLyxForm;
