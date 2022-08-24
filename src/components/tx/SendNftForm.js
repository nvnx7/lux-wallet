import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FormDropdownInput, FormInput, FormSelect } from 'components/common/form';
import { useAccount } from 'contexts/accounts';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { WalletIcon } from 'components/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetDigitalAsset } from 'api/asset/getDigitalAsset';
import { AssetIcon } from 'components/digital-asset';
import { useEffect } from 'react';
import useToast from 'hooks/useToast';
import { areEqualAddresses } from 'utils/web3';
import { useSendUpNft } from 'api/asset/sendUpNft';
import { useSendVaultNft } from 'api/asset/sendVaultNft';

const schema = yup.object().shape({
  from: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'Invalid address')
    .required('Required'),
  to: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'Invalid address')
    .required('Required'),
  tokenId: yup.string().required('Required'),
});
const resolver = yupResolver(schema);

const SendNftForm = ({ ...props }) => {
  const { state: params } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showTxStatusToast } = useToast();
  const { activeAccount } = useAccount();
  const { control, handleSubmit, setError } = useForm({
    resolver,
    defaultValues: { from: params.fromAddress || undefined },
  });

  const {
    data: asset,
    isLoading: isAssetLoading,
    error: assetError,
  } = useGetDigitalAsset({
    assetAddress: params.nftAddress,
    ownerAddress: params.fromAddress,
  });
  const {
    mutate: sendUpNft,
    isSuccess: isUpTxSuccess,
    isError: isUpTxError,
    isLoading: isUpTxLoading,
  } = useSendUpNft();
  const {
    mutate: sendVaultNft,
    isSuccess: isVaultTxSuccess,
    isError: isVaultTxError,
    isLoading: isVaultTxLoading,
  } = useSendVaultNft();

  useEffect(() => {
    if (isUpTxError || isUpTxSuccess || isVaultTxError || isVaultTxSuccess) {
      showTxStatusToast(isUpTxSuccess || isVaultTxSuccess, isUpTxError || isVaultTxError);
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpTxSuccess, isUpTxError, isVaultTxSuccess, isVaultTxError]);

  const profileOpt = { label: 'Universal Profile', value: activeAccount.universalProfile };
  const vaultOpts =
    activeAccount.vaults
      ?.filter(vault => vault.address !== params.fromAddress)
      .map(vault => ({
        label: vault.label,
        value: vault.address,
      })) || [];
  const addressOpts = [profileOpt, ...vaultOpts];

  const onSubmit = data => {
    // if (data.amount > Number(asset?.balance?.lyx || 0)) {
    //   setError('amount', { type: 'custom', message: 'Insufficient balance' });
    //   return;
    // }
    console.log({ data });
    return;

    // Force send enable for unknown address
    data.force = addressOpts.findIndex(v => data.to === v.value) === -1;
    if (areEqualAddresses(data.from, activeAccount.universalProfile)) {
      // Sending from Universal Profile
      sendUpNft({
        ...data,
        accountAddress: activeAccount.address,
        nftAddress: params.nftAddress,
      });
    } else {
      sendVaultNft({
        ...data,
        accountAddress: activeAccount.address,
        nftAddress: params.nftAddress,
        upAddress: activeAccount.universalProfile,
      });
    }
  };

  const isLoading = isAssetLoading || isUpTxLoading || isVaultTxLoading;

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
      <HStack alignSelf="stretch">
        {/* <Text fontWeight="bold" pt={6}>
          NFT
        </Text> */}
        <FormSelect label={t('tx:token-id')} name="tokenId" control={control} flex={0.6} />
      </HStack>
      <Button type="submit" disabled={isLoading} isLoading={isUpTxLoading || isVaultTxLoading}>
        {t('tx:send')}
      </Button>
    </VStack>
  );
};

export default SendNftForm;
