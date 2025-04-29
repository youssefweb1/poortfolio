import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en.json';
import arTranslation from '../locales/ar.json';

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // not needed for React
    },
    resources: {
      en: {
        translation: enTranslation
      },
      ar: {
        translation: arTranslation
      }
    },
    detection: {
      order: ['localStorage', 'htmlTag', 'navigator'],
      lookupLocalStorage: 'portfolioLanguage',
      caches: ['localStorage']
    },
    lng: 'ar' // Force Arabic as default language
  });

export default i18n;
