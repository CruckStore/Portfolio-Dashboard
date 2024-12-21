import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [locales, setLocales] = useState({}); 

  useEffect(() => {
    const loadLocales = async () => {
      try {
        const response = await axios.get("/api/locales"); 
      } catch (error) {
        console.error("Erreur lors du chargement des fichiers JSON :", error);
      }
    };

    loadLocales();
  }, []);

  const translate = (key) => {
    return locales[language]?.[key] || key; 
  };

  const updateTranslation = async (lang, key, value) => {
    try {
      const updatedLocales = { ...locales };
      if (!updatedLocales[lang]) updatedLocales[lang] = {};
      updatedLocales[lang][key] = value;
      setLocales(updatedLocales);

      await axios.post("/api/locales/update", { lang, key, value });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la traduction :", error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translate, updateTranslation }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
