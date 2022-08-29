import { HeartIcon } from 'components/icons';
import { HeaderLayout } from 'components/layout';
import { SocialRecoveryView } from 'components/social-recovery';
import { useTranslation } from 'react-i18next';

const SocialRecovery = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('common:social-recovery')} icon={<HeartIcon />}>
      <SocialRecoveryView />
    </HeaderLayout>
  );
};

export default SocialRecovery;
