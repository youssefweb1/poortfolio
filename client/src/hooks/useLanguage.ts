import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: 'ar' | 'en') => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('portfolioLanguage', language);
  };

  // Set up initial language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolioLanguage') || 'ar';
    changeLanguage(savedLanguage as 'ar' | 'en');
  }, []);

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    isRTL: i18n.language === 'ar'
  };
};
