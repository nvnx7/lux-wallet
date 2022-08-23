import { useToast as useChakraToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

/**
 * Default config for toast
 */
const defaultOpts = {
  variant: 'solid',
  position: 'top',
  isClosable: true,
  duration: 4000,
};

/**
 * Custom toast hook with boilerplate already set
 * but still customizable
 */
const useToast = () => {
  const { t } = useTranslation();
  const toast = useChakraToast();

  const showToast = (opts = {}) => toast({ ...defaultOpts, ...opts });
  const showSuccessToast = (opts = {}) => toast({ ...defaultOpts, ...opts, status: 'success' });
  const showErrorToast = (opts = {}) => toast({ ...defaultOpts, ...opts, status: 'error' });
  const showTxStatusToast = (isSuccess, isError, opts = {}) => {
    if (isSuccess) showSuccessToast({ ...opts, title: t('tx:tx-success') });
    else if (isError) showErrorToast({ ...opts, title: t('tx:tx-error') });
  };

  return {
    showToast,
    showErrorToast,
    showSuccessToast,
    showTxStatusToast,
  };
};

export default useToast;
