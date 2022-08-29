import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FormDropdownInput, FormInput } from 'components/common/form';
import { useWallet } from 'contexts/wallet';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { LuksoLogo } from 'components/common/ui';
import { usePreferences } from 'contexts/preferences';
import { WalletIcon } from 'components/icons';
import { useGetBalance } from 'api/account/getBalance';
import { useSendLyx } from 'api/asset/sendLyx';
import useToast from 'hooks/useToast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  from: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'error:invalid-address')
    .required('error:required'),
  to: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'error:invalid-address')
    .required('error:required'),
  amount: yup
    .number()
    .positive('error:invalid-amount')
    .typeError('error:invalid-amount')
    .required('error:required'),
});
const resolver = yupResolver(schema);

const SendLyxForm = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showTxStatusToast } = useToast();
  const { network } = usePreferences();
  const { activeAccount, accountsData } = useWallet();

  const { control, handleSubmit, setError } = useForm({
    resolver,
    defaultValues: { from: activeAccount?.address || undefined },
  });
  const fromAddress = useWatch({ control, name: 'from' });
  const { data: balance } = useGetBalance({ address: fromAddress });
  const {
    mutate: sendLyx,
    isError,
    isSuccess,
    isLoading,
  } = useSendLyx({
    accountAddress: activeAccount?.address,
  });

  useEffect(() => {
    if (isError || isSuccess) {
      showTxStatusToast(isSuccess, isError);
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const onSubmit = data => {
    if (data.amount > Number(balance.lyx || 0)) {
      setError('amount', { type: 'custom', message: 'Insufficient balance' });
    } else {
      sendLyx({ ...data, accountAddress: activeAccount?.address });
    }
  };

  const fromAddressOpts = [{ label: activeAccount?.label, value: activeAccount?.address }];
  const toAddressOpts =
    accountsData?.map(acc => ({
      label: acc.label,
      value: acc.address,
    })) || [];

  if (activeAccount?.universalProfile) {
    fromAddressOpts.push({ label: 'Universal Profile', value: activeAccount.universalProfile });
    toAddressOpts.push({ label: 'Universal Profile', value: activeAccount.universalProfile });
  }

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
      <FormDropdownInput
        label={t('tx:from')}
        name="from"
        options={fromAddressOpts}
        control={control}
      />

      <FormDropdownInput label={t('tx:to')} name="to" options={toAddressOpts} control={control} />
      <HStack>
        <FormInput label={t('tx:amount')} name="amount" control={control} flex={0.6} />
        <Text fontWeight="bold" pt={6}>
          {network?.currencySymbol}
        </Text>
      </HStack>
      <Button type="submit" isLoading={isLoading}>
        {t('tx:send')}
      </Button>
    </VStack>
  );
};

export default SendLyxForm;
