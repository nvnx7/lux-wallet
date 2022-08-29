import { HeaderLayout } from 'components/layout';
import { PermissionsView } from 'components/vault/permissions';
import { useTranslation } from 'react-i18next';

const VaultPermissions = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('common:permissions')}>
      <PermissionsView />
    </HeaderLayout>
  );
};

export default VaultPermissions;
