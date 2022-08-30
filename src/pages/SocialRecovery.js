import { Center } from '@chakra-ui/react';
import { HeartIcon } from 'components/icons';
import { HeartIcon as HeartIcon3d } from 'components/icons/3d';
import { HeaderLayout } from 'components/layout';
import { SocialRecoveryView } from 'components/social-recovery';
import { useTranslation } from 'react-i18next';

const SocialRecovery = () => {
  const { t } = useTranslation();
  return (
    <HeaderLayout title={t('common:social-recovery')} icon={<HeartIcon />}>
      <Center py={4}>
        <HeartIcon3d size={20} />
      </Center>
      <SocialRecoveryView py={2} px={4} />
    </HeaderLayout>
  );
};

export default SocialRecovery;
