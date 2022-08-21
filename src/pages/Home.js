import { BottomNavLayout } from 'components/layout';
import { AccountView } from 'components/account';

const Home = () => {
  return (
    <BottomNavLayout>
      <AccountView />
    </BottomNavLayout>
  );
};

export default Home;
