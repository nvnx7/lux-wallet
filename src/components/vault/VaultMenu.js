import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { DetailIcon, VerticalDotsIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';

const VaultMenu = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOpenPermissions = () => {
    navigate(Path.VAULT_PERMISSIONS);
  };

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<VerticalDotsIcon />}
        variant="ghost"
        {...props}
      />
      <MenuList>
        <MenuItem onClick={handleOpenPermissions} icon={<DetailIcon />}>
          {t('common:permissions')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default VaultMenu;
