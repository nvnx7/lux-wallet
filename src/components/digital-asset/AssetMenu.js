import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { VerticalDotsIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';

const AssetMenu = ({ onOptionChange, ...props }) => {
  const { t } = useTranslation();

  return (
    <Menu placement="bottom-end" {...props}>
      <MenuButton as={IconButton} icon={<VerticalDotsIcon />} variant="ghost" />
      <MenuList>
        <MenuOptionGroup
          defaultValue="lukso"
          title={t('asset:asset')}
          type="radio"
          onChange={onOptionChange}
        >
          <MenuItemOption value="lukso">{t('asset:lukso-assets')}</MenuItemOption>
          <MenuItemOption value="legacy">{t('asset:legacy-assets')}</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default AssetMenu;
