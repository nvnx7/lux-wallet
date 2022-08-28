import { Box, FormLabel, Select } from '@chakra-ui/react';
import { usePreferences } from 'contexts/preferences';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from 'settings/constants';

const LanguageSelector = ({ ...props }) => {
  const { t } = useTranslation();
  const { setPreferredLanguage, language } = usePreferences();
  const handleChange = e => {
    const lang = e.target.value;
    if (lang) {
      setPreferredLanguage(lang);
    }
  };

  return (
    <Box w="full">
      <FormLabel>{t('common:language')}</FormLabel>
      <Select defaultValue={language} {...props} onChange={handleChange}>
        {supportedLanguages.map(lang => (
          <option key={lang.symbol} value={lang.symbol}>
            {lang.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageSelector;
