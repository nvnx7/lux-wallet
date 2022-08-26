import { Divider, Heading, HStack, VStack } from '@chakra-ui/react';
import { ActivityIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import ActivityList from './ActivityList';

const ActivityView = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <VStack {...props}>
      <HStack py={2} justify="center" alignItems="center">
        <ActivityIcon size={20} />
        <Heading textAlign="center" fontSize="lg">
          {t('tx:activity')}
        </Heading>
      </HStack>
      <Divider />
      <ActivityList />
    </VStack>
  );
};

export default ActivityView;
