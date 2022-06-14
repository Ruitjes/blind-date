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

    const router = useRouter();
    const { i18n } = useTranslation();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState<boolean>();
    const [profile, setProfile] = useState<Profile>({ } as Profile);

    useEffect(() => { 
        setLoading(true);
        axios.get<Profile>("/api/profileService/getProfile/")
            .then((response: AxiosResponse) => setProfile(response.data))
            .catch(async (error: AxiosError) => {
                if (error.response?.status === 404) {
                    await router.push("/profile");
                }
                setError(error);
            })
            .finally(() => { console.log('test'); setLoading(false)});
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


    return { error, loading, profile, setProfile };
}