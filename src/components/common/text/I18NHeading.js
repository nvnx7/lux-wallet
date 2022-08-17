import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const I18NHeading = ({ text = '', variant = '', ...props }) => {
  const { t } = useTranslation();

  if (variant === 'subheading') {
    props = { color: 'gray.400', ...props };
  }

  return <Heading {...props}>{t(text)}</Heading>;
};

export default I18NHeading;
