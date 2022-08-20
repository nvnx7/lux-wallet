import { Box, Button, Divider, Link, Text, VStack } from '@chakra-ui/react';
import { Identicon } from 'components/common';
import { CopyableAddress } from 'components/common/ui';
import { ChevronLeftIcon, ExternalLinkIcon } from 'components/icons';
import { useAccount } from 'contexts/accounts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getExplorerLink } from 'utils/web3';
import ExportAccount from './ExportAccount';

const AccountDetails = ({ ...props }) => {
  const [showExportKey, setShowExportKey] = useState(false);
  const { activeAccount } = useAccount();
  const { t } = useTranslation();

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
        <CopyableAddress address={activeAccount?.address} abbreviate={32} />
        <ViewOnExplorer address={activeAccount?.address} />
      </VStack>
      <Divider />

      {!showExportKey ? (
        <>
          <Box>
            <Text fontWeight="semibold">{t('common:universal-profile')}</Text>
            {activeAccount?.universalProfile ? (
              <>
                <CopyableAddress address={activeAccount.universalProfile} abbreviate={32} />
                <ViewOnExplorer address={activeAccount.universalProfile} ml={2} />
              </>
            ) : (
              <Text color="gray.500" textAlign="center">
                ---
              </Text>
            )}
          </Box>
          <Divider />
          <Button onClick={() => setShowExportKey(true)}>{t('account:export-private-key')}</Button>
        </>
      ) : (
        <ExportAccount />
      )}
    </VStack>
  );
};

const ViewOnExplorer = ({ address, ...props }) => {
  const { t } = useTranslation();
  return (
    <Link
      href={getExplorerLink(address)}
      isExternal
      color="gray.500"
      fontSize="sm"
      display="flex"
      alignItems="center"
      {...props}
    >
      {t('tx:view-on-explorer')} <ExternalLinkIcon />
    </Link>
  );
};

export default AccountDetails;
