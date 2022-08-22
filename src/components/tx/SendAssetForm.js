import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FormDropdownInput, FormInput } from 'components/common/form';
import { useAccount } from 'contexts/accounts';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { WalletIcon } from 'components/icons';
import { useLocation } from 'react-router-dom';
import { useSendAsset } from 'api/asset/sendAsset';
import { useGetDigitalAsset } from 'api/asset/getDigitalAsset';
import { AssetIcon } from 'components/digital-asset';

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
  const { state: params } = useLocation();
  const { t } = useTranslation();
  const { activeAccount } = useAccount();
  const { control, handleSubmit, setError } = useForm({
    resolver,
    defaultValues: { from: params.fromAddress || undefined },
  });
  const fromAddress = useWatch({ control, name: 'from' });

  const {
    data: asset,
    isLoading: isAssetLoading,
    error: assetError,
  } = useGetDigitalAsset({
    assetAddress: params.assetAddress,
    ownerAddress: fromAddress,
  });
  const { data, mutate: sendAsset, error, isLoading: isSendTxLoading } = useSendAsset();

  const onSubmit = data => {
    if (data.amount > Number(asset?.balance?.lyx || 0)) {
      setError('amount', { type: 'custom', message: 'Insufficient balance' });
    } else {
      sendAsset({ ...data, accountAddress: activeAccount?.address });
    }
  };

  const profileOpt = [{ label: 'Universal Profile', value: activeAccount.universalProfile }];
  const vaultOpts = (activeAccount?.vaults || []).map(vault => ({
    label: vault.label,
    value: vault.address,
  }));
  const addressOpts = [...profileOpt, ...vaultOpts];

  const isLoading = isAssetLoading || isSendTxLoading;

  return (
    <VStack as="form" px={8} onSubmit={handleSubmit(onSubmit)} {...props}>
      <VStack>
        <AssetIcon src={asset?.iconUrl} />
        <HStack>
          <WalletIcon size={12} color="gray" />
          <Text fontSize="sm">{asset?.symbol}</Text>
          <Text fontSize="sm" fontWeight="bold">
            {asset?.balance?.lyx || '0'}
          </Text>
        </HStack>
      </VStack>
      <Divider />
      <FormDropdownInput label={t('tx:from')} name="from" options={addressOpts} control={control} />

      <FormDropdownInput label={t('tx:to')} name="to" options={addressOpts} control={control} />
      <HStack>
        <FormInput label={t('tx:amount')} name="amount" control={control} flex={0.6} />
        <Text fontWeight="bold" pt={6}>
          {asset?.symbol}
        </Text>
      </HStack>
      <Button type="submit" disabled={isLoading} isLoading={isSendTxLoading}>
        {t('tx:send')}
      </Button>
    </VStack>
  );
};

export default SendLyxForm;
