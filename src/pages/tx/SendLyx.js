import { HeaderLayout } from 'components/layout';
import { SendLyxForm } from 'components/tx';
import { useTranslation } from 'react-i18next';

const SendLyx = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('tx:send-lyx')}>
      <SendLyxForm />
    </HeaderLayout>
  );
};

export default SendLyx;
