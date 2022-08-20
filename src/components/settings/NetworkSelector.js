import { Select } from '@chakra-ui/react';
import { usePreferences } from 'contexts/preferences';
import { useTranslation } from 'react-i18next';
import { supportedNetworks } from 'settings/constants';

const NetworkSelector = ({ ...props }) => {
  const { t } = useTranslation();
  const {} = usePreferences();
  const handleChange = e => {
    console.log({ v: e.target.value });
    //set preferred network
  };

  return (
    <Select
      placeholder={t('common:network')}
      defaultValue={2828}
      {...props}
      onChange={handleChange}
    >
      {supportedNetworks.map(net => (
        <option value={net.chainId}>{net.name}</option>
      ))}
    </Select>
  );
};

export default NetworkSelector;
