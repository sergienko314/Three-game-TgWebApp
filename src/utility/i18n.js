import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en/translation.json';
import translationRU from '../locales/ru/translation.json';
import translationUK from '../locales/uk/translation.json';
import { tg } from '../components/Helper/Helper';

const LANGUAGE_KEY = 'user-language';

const customLanguageDetector = {
  type: 'languageDetector',
  async: false,
  init: () => {},
  detect: () => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      return savedLanguage;
    }

    if (tg && tg.initDataUnsafe.user?.language_code) {
      console.log(
        'Detected language from Telegram:',
        tg.initDataUnsafe.user?.language_code
      );
      return tg.initDataUnsafe.user?.language_code;
    }

    console.log('No language found, using fallback language.');
    return 'uk';
  },
  cacheUserLanguage: language => {
    localStorage.setItem(LANGUAGE_KEY, language);
  },
};

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  uk: {
    translation: translationUK,
  },
};

i18n
  .use(initReactI18next)
  .use(customLanguageDetector)
  .init({
    resources,
    fallbackLng: 'uk',
    detection: {
      order: ['customDetector', 'querystring', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

if (tg.WebApp) {
  tg.WebApp.onEvent('languageChanged', newLanguageCode => {
    console.log('Language changed to:', newLanguageCode);
    i18n.changeLanguage(newLanguageCode);
  });
}

export default i18n;
