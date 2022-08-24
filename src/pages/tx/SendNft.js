import { HeaderLayout } from 'components/layout';
import { SendNftForm } from 'components/tx';
import { useTranslation } from 'react-i18next';

const SendNft = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('tx:send-asset')}>
      <SendNftForm />
    </HeaderLayout>
  );
};

export default SendNft;
