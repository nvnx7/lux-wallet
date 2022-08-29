import { Button, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput, FormPasswordInput } from 'components/common/form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'error:min-8-chars')
    .max(32, 'error:max-32-chars')
    .required('error:required'),
  confirmPassword: yup
    .string()
    .required('error:required')
    .oneOf([yup.ref('password'), null], 'error:passwords-not-matching'),
});
const resolver = yupResolver(schema);

const defaultValues = isDev
  ? {
      password: Mock.PASSWORD,
      confirmPassword: Mock.PASSWORD,
    }
  : undefined;

const NewAccountForm = ({ ...props }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues,
  });

  const onSubmit = data => {
    navigate(Path.ONBOARD_IMPORT_ACCOUNT, { state: data });
  };

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormPasswordInput
        label={t('form:new-password')}
        name="password"
        type="password"
        control={control}
      />
      <FormInput
        label={t('form:confirm-password')}
        name="confirmPassword"
        type="password"
        control={control}
      />

      <Button type="submit" my={8}>
        {t('form:create-account')}
      </Button>
    </VStack>
  );
};

export default NewAccountForm;
