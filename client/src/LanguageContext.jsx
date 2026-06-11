import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();
const LANGUAGE_STORAGE_KEY = 'isweb_lang';

function getInitialLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'ar' || urlLang === 'en') return urlLang;

  const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLang === 'ar' || savedLang === 'en') return savedLang;

  return 'ar';
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLanguage);

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
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
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
