import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FormDropdownInput, FormInput } from 'components/common/form';
import { useWallet } from 'contexts/wallet';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { WalletIcon } from 'components/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSendUpToken } from 'api/asset/sendUpToken';
import { useGetDigitalAsset } from 'api/asset/getDigitalAsset';
import { AssetIcon } from 'components/digital-asset';
import { useEffect } from 'react';
import useToast from 'hooks/useToast';
import { useSendVaultToken } from 'api/asset/sendVaultToken';
import { areEqualHex } from 'utils/web3';
import useVaults from 'hooks/useVaults';

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

const SendTokenForm = ({ ...props }) => {
  const { state: params } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showTxStatusToast } = useToast();
  const { activeAccount } = useWallet();
  const { control, handleSubmit, setError } = useForm({
    resolver,
    defaultValues: { from: params.fromAddress || undefined },
  });

  const {
    data: asset,
    isLoading: isAssetLoading,
    error: assetError,
  } = useGetDigitalAsset({
    assetAddress: params.tokenAddress,
    ownerAddress: params.fromAddress,
  });
  const { vaults, isLoading: areVaultsLoading } = useVaults({
    upAddress: activeAccount.universalProfile,
  });
  const {
    mutate: sendUpToken,
    isSuccess: isUpTxSuccess,
    isError: isUpTxError,
    isLoading: isUpTxLoading,
  } = useSendUpToken({ accountAddress: activeAccount?.address });
  const {
    mutate: sendVaultToken,
    isSuccess: isVaultTxSuccess,
    isError: isVaultTxError,
    isLoading: isVaultTxLoading,
  } = useSendVaultToken({ accountAddress: activeAccount?.address });

  useEffect(() => {
    if (isUpTxError || isUpTxSuccess || isVaultTxError || isVaultTxSuccess) {
      showTxStatusToast(isUpTxSuccess || isVaultTxSuccess, isUpTxError || isVaultTxError);
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpTxSuccess, isUpTxError, isVaultTxSuccess, isVaultTxError]);

  const profileOpt = { label: 'Universal Profile', value: activeAccount.universalProfile };
  const vaultOpts =
    vaults
      ?.filter(vault => !areEqualHex(params.fromAddress, vault.address))
      .map(vault => ({
        label: vault.label || '---',
        value: vault.address,
      })) || [];
  const addressOpts = [profileOpt, ...vaultOpts];

  const onSubmit = input => {
    if (input.amount > Number(asset?.balance?.lyx || 0)) {
      setError('amount', { type: 'custom', message: 'Insufficient balance' });
      return;
    }

    // Force send enable for unknown address
    input.force = addressOpts.findIndex(v => input.to === v.value) === -1;
    if (areEqualHex(input.from, activeAccount.universalProfile)) {
      // Sending from Universal Profile
      sendUpToken({
        ...input,
        accountAddress: activeAccount?.address,
        tokenAddress: params.tokenAddress,
      });
    } else {
      sendVaultToken({
        ...input,
        accountAddress: activeAccount?.address,
        tokenAddress: params.tokenAddress,
        upAddress: activeAccount?.universalProfile,
      });
    }
  };

  const isLoading = isAssetLoading || isUpTxLoading || isVaultTxLoading || areVaultsLoading;
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

      <FormInput
        label={t('tx:from') + ` (${params.fromLabel || ''})`}
        name="from"
        control={control}
        disabled={true}
      />

      <FormDropdownInput label={t('tx:to')} name="to" options={addressOpts} control={control} />
      <HStack>
        <FormInput label={t('tx:amount')} name="amount" control={control} flex={0.6} />
        <Text fontWeight="bold" pt={6}>
          {asset?.symbol}
        </Text>
      </HStack>
      <Button type="submit" disabled={isLoading} isLoading={isUpTxLoading || isVaultTxLoading}>
        {t('tx:send')}
      </Button>
    </VStack>
  );
};

export default SendTokenForm;
