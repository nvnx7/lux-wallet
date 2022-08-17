import { Center, Spinner } from '@chakra-ui/react';
import { Layout } from 'components/layout';

const Loading = () => {
  return (
    <Layout>
      <Center p={8}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    </Layout>
  );
};

export default Loading;
