import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import axios, { AxiosError, AxiosResponse } from "axios";

type Profile = {
    id: string;
    gender: string;
    language: string;
    birthdate : string;
    interests: string[];
    visualHandicapLevel: string;
    oAuthIdentifier: string;
}

export const useProfile = () => {

    const { i18n } = useTranslation();

    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState<boolean>();
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        setLoading(true);
        axios.get<Profile>("api/profileService/getProfile/")
            .then((response: AxiosResponse) => setProfile(response.data))
            .catch((error: AxiosError) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (profile) {
            switch (profile.language) 
            {
                case "en-US":
                    i18n.changeLanguage("en");
                    break;              
                case "nl-NL":
                    i18n.changeLanguage("nl");
                    break;
            }
        }
    }, [profile])


    return { error, loading, profile };
}