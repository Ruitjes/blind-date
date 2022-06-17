import { useTranslation } from "react-i18next";


export const useLanguage = () => {
    const { i18n } = useTranslation();
    return (language: string) => {
        switch (language) 
        {
            case "en-US":
                i18n.changeLanguage("en");
                break;              
            case "nl-NL":
                i18n.changeLanguage("nl");
                break;
        }
    }
}