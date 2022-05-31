import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';
import * as nl from './lang/nl-NL.json';
import * as en from './lang/en-US.json';

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: { en, nl },
        fallbackLng: 'en',
        supportedLngs: ['en', 'nl'],
        interpolation: {
            escapeValue: false
        }
});

export default i18n;