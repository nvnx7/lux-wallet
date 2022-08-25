import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FormDropdownInput, FormInput, FormSelect } from 'components/common/form';
import { useWallet } from 'contexts/wallet';
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
import { useListNfts } from 'api/asset/listNfts';
import { useListVaults } from 'api/vault/listVaults';

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
  const { showTxStatusToast, showErrorToast } = useToast();
  const { activeAccount } = useWallet();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: { from: params.fromAddress || undefined },
  });

  const {
    data: asset,
    isLoading: isAssetLoading,
    isError: isAssetError,
  } = useGetDigitalAsset({
    assetAddress: params.nftAddress,
    ownerAddress: params.fromAddress,
  });
  const {
    data: vaults,
    isLoading: areVaultsLoading,
    isError: isVaultError,
  } = useListVaults({ upAddress: activeAccount.universalProfile });
  const {
    data: nfts,
    isLoading: isNftLoading,
    isError: isNftError,
  } = useListNfts({ nftAddress: params.nftAddress, ownerAddress: params.fromAddress });

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

  // For tx feedback
  useEffect(() => {
    if (isUpTxError || isUpTxSuccess || isVaultTxError || isVaultTxSuccess) {
      showTxStatusToast(isUpTxSuccess || isVaultTxSuccess, isUpTxError || isVaultTxError);
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpTxSuccess, isUpTxError, isVaultTxSuccess, isVaultTxError]);

  // For any error in asset/vault fetching
  useEffect(() => {
    if (isAssetError || isVaultError || isNftError) {
      showErrorToast({ title: t('asset:error-loading') });
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAssetError, isVaultError, isNftError]);

  const profileOpt = { label: 'Universal Profile', value: activeAccount.universalProfile };
  const vaultOpts =
    vaults
      ?.filter(address => !areEqualAddresses(params.fromAddress, address))
      .map(vaultAddress => ({
        label: 'Vault',
        value: vaultAddress,
      })) || [];
  const addressOpts = [profileOpt, ...vaultOpts];

  const onSubmit = data => {
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

  const isLoading =
    isAssetLoading || isUpTxLoading || isVaultTxLoading || isNftLoading || areVaultsLoading;
  const nftOptions = nfts?.map(id => ({ label: `${asset.symbol} #${id}`, value: `${id}` })) || [];
  return (
    <VStack as="form" px={8} onSubmit={handleSubmit(onSubmit)} {...props}>
      <VStack>
        <AssetIcon src={asset?.iconUrl} />
        <HStack>
          <WalletIcon size={12} color="gray" />
          <Text fontSize="sm">{asset?.symbol}</Text>
          <Text fontSize="sm" fontWeight="bold">
            {asset?.balance?.wei || '0'}
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
        <FormSelect
          label={t('tx:token-id')}
          name="tokenId"
          control={control}
          flex={0.6}
          options={nftOptions}
          disabled={isLoading}
          defaultValue={nftOptions?.[0]?.value}
        />
      </HStack>
      <Button type="submit" disabled={isLoading} isLoading={isUpTxLoading || isVaultTxLoading}>
        {t('tx:send')}
      </Button>
    </VStack>
  );
};

export default SendNftForm;
