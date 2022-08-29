import { HeaderLayout } from 'components/layout';
import { PermissionsView } from 'components/profile/permissions';
import { useTranslation } from 'react-i18next';

const UniversalProfilePermissions = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('common:permissions')}>
      <PermissionsView />
    </HeaderLayout>
  );
};

export default UniversalProfilePermissions;
