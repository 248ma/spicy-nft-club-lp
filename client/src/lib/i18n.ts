import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ja from '../locales/ja.json';
import en from '../locales/en.json';
import zh from '../locales/zh.json';
import ko from '../locales/ko.json';
import es from '../locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ja: { translation: ja },
      en: { translation: en },
      zh: { translation: zh },
      ko: { translation: ko },
      es: { translation: es },
    },
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // 優先順位: URLパラメータ → localStorage → ブラウザ言語 → デフォルト
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang', // URLパラメータ ?lang=xx
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
