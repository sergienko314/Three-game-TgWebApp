import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../utility/i18n";
import { tg } from "../components/Helper/Helper";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = tg.initDataUnsafe.user?.language_code;
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    };

    tg.onEvent("languageChanged", handleLanguageChange);

    return () => {
      tg.offEvent("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
