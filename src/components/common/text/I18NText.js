import { Text as ChakraText } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const I18NText = ({ text = '', variant = 'primary', ...props }) => {
  const { t } = useTranslation();

  if (variant === 'body') {
    props = { color: 'gray.400', fontSize: 'sm', ...props };
  }

  return <ChakraText {...props}>{t(text)}</ChakraText>;
};

export default I18NText;
