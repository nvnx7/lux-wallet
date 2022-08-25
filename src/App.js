import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import React from 'react';
import { ChakraProvider, Box, CSSReset } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from 'theme';
import { Dimensions } from 'settings/constants';
import Router from 'router/Router';
import AppContext from 'contexts';

import 'i18n';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppContext>
          <Box width={Dimensions.width} height={Dimensions.height} bgColor="blackAlpha.900">
            <Router />
          </Box>
          <CSSReset />
        </AppContext>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
