import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { DetailIcon, ExternalLinkIcon, VerticalDotsIcon } from 'components/icons';
import { useAccount } from 'contexts/accounts';
import { ModalView, useUI } from 'contexts/ui';
import { useTranslation } from 'react-i18next';
import { getExplorerLink } from 'utils/web3';

const AccountMenu = ({ ...props }) => {
  const { t } = useTranslation();
  const { activeAccount } = useAccount();
  const { setModalViewAndOpen } = useUI();

  const explorerLink = getExplorerLink(activeAccount?.address || '');
  const handleViewDetails = () => {
    if (!activeAccount?.address) return;
    setModalViewAndOpen(ModalView.ACCOUNT_DETAILS);
  };

  return (
    <Menu placement="bottom-end" {...props}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<VerticalDotsIcon />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem as="a" href={explorerLink} target="_blank" icon={<ExternalLinkIcon />}>
          {t('tx:view-on-explorer')}
        </MenuItem>
        <MenuItem onClick={handleViewDetails} icon={<DetailIcon />}>
          {t('common:account-details')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AccountMenu;
