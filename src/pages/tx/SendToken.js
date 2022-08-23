import { HeaderLayout } from 'components/layout';
import { SendTokenForm } from 'components/tx';
import { useTranslation } from 'react-i18next';

const SendToken = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('tx:send-asset')}>
      <SendTokenForm />
    </HeaderLayout>
  );
};

export default SendToken;
