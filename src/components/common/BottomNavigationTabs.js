import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { createElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import { ActivityIcon, CogIcon, DiamondIcon, HomeIcon, ShieldIcon } from 'components/icons';
import { logDebug } from 'utils/logger';

const Tab = ({ isActive, icon, label, onClick, ...props }) => {
  const iconEl = createElement(icon, { size: 28, color: 'white' });
  return (
    <VStack spacing={0} alignItems="center" {...props}>
      <IconButton size="md" icon={iconEl} variant="ghost" onClick={onClick} />
      {/* <Text fontSize="xs" color="gray.100">
        {label}
      </Text> */}
    </VStack>
  );
};

const tabPaths = [Path.HOME, Path.DIGITAL_ASSETS, Path.VAULT_MANAGER, Path.ACTIVITY];

const BottomNavigationTabs = ({ ...props }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = index => {
    logDebug('BottomNavigationTabs:handleTabClick', index);
    const path = tabPaths[index];
    navigate(path);
    setActiveTab(index);
  };

  return (
    <HStack
      justify="space-between"
      px={4}
      py={4}
      rounded="xl"
      background="linear-gradient(180deg, #E74C3C 49.44%, #F9B93C 153.37%)"
      {...props}
    >
      <Tab
        label="Home"
        icon={HomeIcon}
        isActive={activeTab === 0}
        onClick={() => handleTabClick(0)}
      />
      <Tab
        label="Assets"
        icon={DiamondIcon}
        isActive={activeTab === 1}
        onClick={() => handleTabClick(1)}
      />
      <Tab
        label="Vaults"
        icon={ShieldIcon}
        isActive={activeTab === 2}
        onClick={() => handleTabClick(2)}
      />
      <Tab
        label="Setting"
        icon={ActivityIcon}
        isActive={activeTab === 3}
        onClick={() => handleTabClick(3)}
      />
    </HStack>
  );
};

export default BottomNavigationTabs;
