import { HeaderLayout } from 'components/layout';
import { SettingsView } from 'components/settings';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('common:settings')}>
      <SettingsView />
    </HeaderLayout>
  );
};

export default Settings;
