import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { createElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from 'router/paths';
import { CogIcon, DiamondIcon, HomeIcon, ShieldIcon } from 'components/icons';
import { logDebug } from 'utils/logger';

const Tab = ({ isActive, icon, label, onClick, ...props }) => {
  const iconEl = createElement(icon, { size: 18, color: 'white' });
  return (
    <VStack spacing={0} alignItems="center" {...props}>
      <IconButton size="md" icon={iconEl} isActive={isActive} onClick={onClick} />
      {/* <Text fontSize="xs" color="gray.100">
        {label}
      </Text> */}
    </VStack>
  );
};

const tabPaths = [Path.HOME, Path.DIGITAL_ASSETS, Path.VAULTS, Path.SETTINGS];

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
    <HStack justify="space-between" bgColor="primary.500" px={4} py={4} rounded="lg" {...props}>
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
        icon={CogIcon}
        isActive={activeTab === 3}
        onClick={() => handleTabClick(3)}
      />
    </HStack>
  );
};

export default BottomNavigationTabs;
