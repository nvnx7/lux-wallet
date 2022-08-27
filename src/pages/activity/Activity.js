import { BottomNavLayout } from 'components/layout';
import { ActivityView } from 'components/activity';

const Home = () => {
  return (
    <BottomNavLayout>
      <ActivityView />
    </BottomNavLayout>
  );
};

export default Home;
