import { Box, FormLabel, Select } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { supportedNetworks } from 'settings/constants';

const NetworkSelector = ({ ...props }) => {
  const { t } = useTranslation();
  const handleChange = e => {
    // @note Currently only the default L16 is supported which is active by default
  };

  return (
    <Box w="full">
      <FormLabel>{t('common:network')}</FormLabel>
      <Select defaultValue={2828} {...props} onChange={handleChange}>
        {supportedNetworks.map(net => (
          <option key={net.chainId} value={net.chainId}>
            {net.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default NetworkSelector;
