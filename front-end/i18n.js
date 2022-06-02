import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as nl from './lang/nl-NL.json';
import * as en from './lang/en-US.json';
import 'moment/locale/nl';
import axios from 'axios';

axios
    .get('api/profileService/getProfile/')
    .then((response) => {
        
        if (response.data) {
            switch (response.data.language) {
                case "nl-NL":
                    i18n.changeLanguage("nl");
                    break;
                case "en-US":
                    i18n.changeLanguage("en");
                    break;
            }
        }
    }).catch((error) => {
        console.log(error);
    });

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