import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import { useSendTx } from 'api/account/sendTx';
import { useAccount } from 'contexts/accounts';
import { useUI } from 'contexts/ui';
import { useTranslation } from 'react-i18next';
import { logDebug } from 'utils/logger';

const ConfirmTx = ({ ...props }) => {
  const { t } = useTranslation();
  const { activeAccount } = useAccount();
  const { modalData: txData, closeModal } = useUI();
  const { data, isLoading, isError, mutate: sendTx } = useSendTx();

  const handleConfirm = () => {
    logDebug('ConfirmTx.handleConfirm', txData);
    sendTx({ tx: txData, address: activeAccount.address });
  };

  return (
    <VStack {...props}>
      <HStack>
        <Button variant="outline" onClick={closeModal}>
          {t('tx:cancel')}
        </Button>
        <Button onClick={handleConfirm}>{t('tx:confirm')}</Button>
      </HStack>
    </VStack>
  );
};

export default ConfirmTx;
