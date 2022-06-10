import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as nl from './lang/nl-NL.json';
import * as en from './lang/en-US.json';
import 'moment/locale/nl';

i18n
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