import { Button, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components/common/form';
import { useTranslation } from 'react-i18next';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';
import { useAccount } from 'contexts/accounts';
import { logDebug } from 'utils/logger';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';

const schema = yup.object().shape({
  profileAddress: yup
    .string()
    .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'Invalid address')
    .required('Required'),
});
const resolver = yupResolver(schema);

const defaultValues = isDev
  ? {
      profileAddress: Mock.PROFILE_ADDRESS,
    }
  : undefined;

const AddProfileForm = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues,
  });
  const { activeAccount, setUniversalProfileAddress } = useAccount();

  const onSubmit = data => {
    logDebug('AddProfileForm:onSubmit', data);
    console.log({ activeAccount, data });
    setUniversalProfileAddress(activeAccount.address, data.profileAddress);
    navigate(Path.HOME);
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormInput label={t('form:your-universal-profile')} name="profileAddress" control={control} />
      <Button type="submit">{t('form:add-profile')}</Button>
    </VStack>
  );
};

export default AddProfileForm;
