import { HeaderLayout } from 'components/layout';
import { SendAssetForm } from 'components/tx';
import { useTranslation } from 'react-i18next';

const SendAsset = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('tx:send-asset')}>
      <SendAssetForm />
    </HeaderLayout>
  );
};

export default SendAsset;
