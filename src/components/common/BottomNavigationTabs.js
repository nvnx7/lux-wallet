import { createElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HStack, Text, VStack } from '@chakra-ui/react';
import Path from 'router/paths';
import { ActivityIcon, DiamondIcon, HomeIcon, SafeIcon } from 'components/icons';
import { logDebug } from 'utils/logger';
import { useTranslation } from 'react-i18next';

const gradientBg = 'linear-gradient(180deg, #E74C3C 49.44%, #F9B93C 153.37%)';
const Tab = ({ isActive, icon, label, onClick, ...props }) => {
  const iconEl = createElement(icon, { size: 28, color: 'white' });
  return (
    <VStack
      boxSize={14}
      spacing={0}
      alignItems="center"
      justify="center"
      onClick={onClick}
      rounded={12}
      bg={isActive ? gradientBg : 'none'}
      _hover={{
        cursor: 'pointer',
        bg: gradientBg,
      }}
      {...props}
    >
      {iconEl}
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};

const tabPaths = [Path.HOME, Path.DIGITAL_ASSETS, Path.VAULT_MANAGER, Path.ACTIVITY];
const BottomNavigationTabs = ({ ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabClick = index => {
    logDebug('BottomNavigationTabs:handleTabClick', index);
    const path = tabPaths[index];
    navigate(path);
  };

  return (
    <HStack
      justify="space-between"
      px={4}
      py={2}
      rounded="xl"
      bg="whiteAlpha.200"
      // background="linear-gradient(180deg, #E74C3C 49.44%, #F9B93C 153.37%)"
      {...props}
    >
      <Tab
        label={t('common:home')}
        icon={HomeIcon}
        isActive={pathname === Path.HOME}
        onClick={() => handleTabClick(0)}
      />
      <Tab
        label={t('common:assets')}
        icon={DiamondIcon}
        isActive={pathname === Path.DIGITAL_ASSETS}
        onClick={() => handleTabClick(1)}
      />
      <Tab
        label={t('common:vaults')}
        icon={SafeIcon}
        isActive={pathname === Path.VAULT_MANAGER}
        onClick={() => handleTabClick(2)}
      />
      <Tab
        label={t('common:activity')}
        icon={ActivityIcon}
        isActive={pathname === Path.ACTIVITY}
        onClick={() => handleTabClick(3)}
      />
    </HStack>
  );
};

export default BottomNavigationTabs;
