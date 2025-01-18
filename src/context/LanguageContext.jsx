import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  ka: {
    welcome: 'მოგესალმებით',
    language: 'ენა',
  },
  en: {
    welcome: 'Welcome',
    language: 'Language',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ka'); 

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations: translations[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
