import { Button, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormPasswordInput } from 'components/common/form';
import { useTranslation } from 'react-i18next';
import { isDev } from 'settings/config';
import { Mock } from 'settings/constants';
import { useWallet } from 'contexts/wallet';

const schema = yup.object().shape({
  password: yup.string().required('Required'),
});
const resolver = yupResolver(schema);

const defaultValues = isDev
  ? {
      password: Mock.PASSWORD,
      confirmPassword: Mock.PASSWORD,
    }
  : undefined;

const LoginForm = ({ ...props }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setError } = useForm({
    resolver,
    defaultValues,
  });
  const { unlockWallet } = useWallet();

  const onSubmit = data => {
    unlockWallet(data.password).then(res => {
      if (!res.isValid) {
        setError('password', {
          type: 'custom',
          message: t('form:incorrect-password'),
        });
      }
    });
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormPasswordInput label={t('form:your-password')} name="password" control={control} />
      <Button type="submit">{t('form:login')}</Button>
    </VStack>
  );
};

export default LoginForm;
