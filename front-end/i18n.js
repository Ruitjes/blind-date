import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as en from './lang/nl-NL.json';

export const SupportedLanguages = ['en', 'nl'];

i18n
    .use(initReactI18next)
    .init({
        resources: { en: en },
        fallbackLng: 'en',
        nsSeparator: false,
        keySeparator: false,
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false
        }
});

export default i18n;