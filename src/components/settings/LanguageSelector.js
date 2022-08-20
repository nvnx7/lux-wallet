import { Select } from '@chakra-ui/react';
import { usePreferences } from 'contexts/preferences';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from 'settings/constants';

const LanguageSelector = ({ ...props }) => {
  const { t } = useTranslation();
  const {} = usePreferences();
  const handleChange = e => {
    console.log({ v: e.target.value });
    //set preferred lang
  };

  return (
    <Select placeholder={t('common:language')} defaultValue="en" {...props} onChange={handleChange}>
      {supportedLanguages.map(lang => (
        <option value={lang.symbol}>{lang.name}</option>
      ))}
    </Select>
  );
};

export default LanguageSelector;
