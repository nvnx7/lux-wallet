import { Text, Menu, MenuButton, MenuList, MenuGroup, MenuItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Identicon } from 'components/common';
import { abbreviateAddress } from 'utils/web3';
import { useAccount } from 'contexts/accounts';
import { AddIcon, CogIcon, DownloadIcon, LockIcon } from 'components/icons';

const WalletMenu = ({ ...props }) => {
  const { t } = useTranslation();
  const { activeAccount, accountsData, lockAccount } = useAccount();

  const handleLock = () => {
    lockAccount();
  };

  return (
    <Menu placement="bottom-end" {...props}>
      <MenuButton>
        <Identicon address={activeAccount?.address} size={30} />
      </MenuButton>
      <MenuList>
        <MenuGroup title={t('account:accounts')}>
          {accountsData.map(account => (
            <MenuItem key={account.address} display="flex" alignItems="center">
              <Identicon size={14} />
              <Text ml={2}>{account.name || abbreviateAddress(account.address, 6)}</Text>
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuGroup title={t('common:settings')}>
          <MenuItem icon={<AddIcon />} onClick={handleLock}>
            {t('account:create-account')}
          </MenuItem>
          <MenuItem icon={<DownloadIcon />} onClick={handleLock}>
            {t('account:import-account')}
          </MenuItem>
          <MenuItem icon={<CogIcon />} onClick={handleLock}>
            {t('common:settings')}
          </MenuItem>
          <MenuItem icon={<LockIcon />} color="red.500" onClick={handleLock}>
            {t('common:lock')}
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default WalletMenu;
