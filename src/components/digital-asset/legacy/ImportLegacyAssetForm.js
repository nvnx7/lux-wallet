import { Button, Heading, Radio, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput, FormRadioGroup } from 'components/common/form';
import { useTranslation } from 'react-i18next';
import { useUI } from 'contexts/ui';
import useImportedLegacyAssets from 'hooks/useImportedLegacyAssets';

const schema = yup.object().shape({
  address: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'error:invalid-address')
    .required('error:required'),
  type: yup.string().required(),
});
const resolver = yupResolver(schema);

const ImportLegacyAssetForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { closeModal, modalData } = useUI();
  const { importAsset } = useImportedLegacyAssets();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: { type: modalData?.type || 'token' },
  });

  const onSubmit = data => {
    importAsset(data);
    closeModal();
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Heading fontSize="2xl">{t('form:import-asset')}</Heading>

      <FormRadioGroup label={t('form:asset-type')} name="type" control={control}>
        <Radio value="token">Token</Radio>
        <Radio value="nft" ml={4}>
          NFT
        </Radio>
      </FormRadioGroup>

      <FormInput label={t('form:asset-address')} name="address" control={control} />

      <Button type="submit" mt={4}>
        {t('asset:import')}
      </Button>
    </VStack>
  );
};

export default ImportLegacyAssetForm;
