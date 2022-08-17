import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import fonts from './fonts';
import components from './components';
import { Dimensions } from 'settings/constants';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        width: Dimensions.width,
        height: Dimensions.height,
      },
      '::-webkit-scrollbar': { width: '2px' },
      '::-webkit-scrollbar-track': { background: 'none' },
      '::-webkit-scrollbar-thumb': { background: '#ccc', borderRadius: '8px' },
    },
  },
  fonts,
  colors,
  components,
});

export default theme;
