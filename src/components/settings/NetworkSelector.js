import { Select } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { supportedNetworks } from 'settings/constants';

const NetworkSelector = ({ ...props }) => {
  const { t } = useTranslation();
  const handleChange = e => {
    // @todo Save & sync network
    // @note Currently only the default L16 is supported
  };

  return (
    <Select
      placeholder={t('common:network')}
      defaultValue={2828}
      {...props}
      onChange={handleChange}
    >
      {supportedNetworks.map(net => (
        <option key={net.chainId} value={net.chainId}>
          {net.name}
        </option>
      ))}
    </Select>
  );
};

export default NetworkSelector;
