import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import assetEn from 'assets/locales/en/asset.json';
import commonEn from 'assets/locales/en/common.json';
import formEn from 'assets/locales/en/form.json';
import txEn from 'assets/locales/en/tx.json';
import accountEn from 'assets/locales/en/account.json';
import assetEs from 'assets/locales/es/asset.json';
import commonEs from 'assets/locales/es/common.json';

const resources = {
  en: {
    asset: assetEn,
    common: commonEn,
    form: formEn,
    tx: txEn,
    account: accountEn,
  },
  es: {
    asset: assetEs,
    common: commonEs,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
