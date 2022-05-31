import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as nl from './lang/nl-NL.json';
import * as en from './lang/en-US.json';

i18n
    .use(initReactI18next)
    .init({
        resources: { en, nl },
        fallbackLng: ['en', 'nl'],
        nsSeparator: false,
        keySeparator: false,
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false
        }
});

export default i18n;