import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[lang];
    keys.forEach(key => {
      if (result) result = result[key];
    });
    return result || path;
  };

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      <div className={`min-h-screen bg-[#0b101e] text-white selection:bg-[#00b4db] overflow-x-hidden ${lang === 'en' ? 'font-sans tracking-wide' : 'font-sans'}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);