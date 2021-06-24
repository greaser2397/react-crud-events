import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for React as it escapes by default
  },
  ns: ['translations'],
  defaultNS: 'translations',
  resources: {
    en: {
      translations: require('./locales/en/translations.json')
    },
    ru: {
      translations: require('./locales/ru/translations.json')
    }
  },
});

i18n.languages = ['en', 'ru'];

export default i18n;