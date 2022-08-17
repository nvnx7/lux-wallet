import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormInput, FormPasswordInput } from 'components/common/form';
import { logError, logInfo } from 'utils/logger';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import keyringController from 'scripts/keyringController';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Min 8 characters')
    .max(32, 'Max 32 characters')
    .required('Password Required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password Required')
    .oneOf([yup.ref('password'), null], 'Passwords does not match!'),
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
    keyringController
      .createNewVaultAndKeychain(data.password)
      .then(() => {
        navigate(Path.ONBOARD_IMPORT_WALLET);
      })
      .catch(err => {
        logError(err);
      });
  };

  // const handleLogin = () => {
  //   navigate(Path.LOGIN);
  // };

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

      {/* <HStack>
        <Text>{t('form:already-added-account')}</Text>
        <Button variant="link" onClick={handleLogin}>
          {t('form:login')}
        </Button>
      </HStack> */}
    </VStack>
  );
};

export default NewAccountForm;
