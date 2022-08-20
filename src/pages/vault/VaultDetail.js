import { HeaderLayout } from 'components/layout';
import { VaultDetailView } from 'components/vault';
import { useTranslation } from 'react-i18next';

const VaultDetail = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('common:vault-detail')}>
      <VaultDetailView />
    </HeaderLayout>
  );
};

export default VaultDetail;
