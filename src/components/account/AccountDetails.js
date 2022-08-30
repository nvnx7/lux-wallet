import { Box, Button, Divider, Text, VStack } from '@chakra-ui/react';
import { Identicon } from 'components/common';
import { EditableInput } from 'components/common/form';
import { CopyableAddress } from 'components/common/ui';
import { ChevronLeftIcon, KeyIcon, TrashIcon } from 'components/icons';
import { ExplorerLink } from 'components/tx';
import { ModalView, useUI } from 'contexts/ui';
import { useWallet } from 'contexts/wallet';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExportAccount from './ExportAccount';

const AccountDetails = ({ ...props }) => {
  const [showExportKey, setShowExportKey] = useState(false);
  const { activeAccount, updateAccount, accountsData } = useWallet();
  const { t } = useTranslation();
  const { setModalView } = useUI();

  const handleLabelChange = value => {
    const label = value?.trim();
    if (!label) return;
    updateAccount(activeAccount.address, { label });
  };

  const handleRemove = () => {
    setModalView(ModalView.DELETE_ACCOUNT);
  };

  return (
    <VStack alignItems="stretch" {...props}>
      {showExportKey && (
        <Button
          size="xs"
          variant="ghost"
          colorScheme="gray"
          alignSelf="start"
          leftIcon={<ChevronLeftIcon />}
          onClick={() => setShowExportKey(false)}
        >
          {t('common:back')}
        </Button>
      )}
      <VStack>
        <Identicon address={activeAccount?.address} />
        <EditableInput value={activeAccount?.label || 'Account'} onSubmit={handleLabelChange} />
        <CopyableAddress address={activeAccount?.address} abbreviate={32} />
        <ExplorerLink address={activeAccount?.address} />
      </VStack>
      <Divider />

      {!showExportKey ? (
        <>
          <Box>
            <Text fontWeight="semibold">{t('common:universal-profile')}</Text>
            {activeAccount?.universalProfile ? (
              <>
                <CopyableAddress address={activeAccount.universalProfile} abbreviate={32} />
                <ExplorerLink address={activeAccount.universalProfile} ml={2} />
              </>
            ) : (
              <Text color="gray.500" textAlign="center">
                ---
              </Text>
            )}
          </Box>
          <Divider />
          <Button leftIcon={<KeyIcon />} onClick={() => setShowExportKey(true)}>
            {t('account:export-private-key')}
          </Button>
          {accountsData && accountsData?.length > 1 && (
            <Button
              leftIcon={<TrashIcon />}
              variant="ghost"
              colorScheme="red"
              onClick={handleRemove}
              size="sm"
            >
              {t('account:delete-account')}
            </Button>
          )}
        </>
      ) : (
        <ExportAccount />
      )}
    </VStack>
  );
};

export default AccountDetails;
