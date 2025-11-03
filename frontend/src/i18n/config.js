// frontend/src/i18n/config.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false // React échappe déjà
    },
    backend: {
      loadPath: '/locales/{{lng}}/common.json'
    }
  });

export default i18n;