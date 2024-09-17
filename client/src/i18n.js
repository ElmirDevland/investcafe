import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationAZ from './locales/az/translation.json';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

const userLanguage = (navigator.language || navigator.userLanguage).split(
  '-'
)[0];

const supportedLanguages = ['az', 'en', 'ru'];

const savedLanguage = localStorage.getItem('language');
const defaultLanguage = supportedLanguages.includes(savedLanguage)
  ? savedLanguage
  : supportedLanguages.includes(userLanguage)
  ? userLanguage
  : 'az';

i18n.use(initReactI18next).init({
  resources: {
    az: { translation: translationAZ },
    en: { translation: translationEN },
    ru: { translation: translationRU },
  },
  lng: defaultLanguage,
  fallbackLng: 'az',
  interpolation: { escapeValue: false },
});

export default i18n;
