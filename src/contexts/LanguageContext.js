import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import translations from '../consts/translations';

const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const savedLanguage = localStorage.getItem('language');
  const [language, setLanguage] = useState(savedLanguage || 'en');

  const t = useCallback(
    (key) => {
      return translations[language]?.[key] || key;
    },
    [language],
  );

  useEffect(() => {
    if (language) {
      localStorage.setItem('language', language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { LanguageProvider, useLanguage };