import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import axios, { AxiosError, AxiosResponse } from "axios";

type Profile = {
    id: string;
    name: string;
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
    const [profile, setProfile] = useState<Profile>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get<Profile>("/api/profileService/getProfile/")
            .then((response: AxiosResponse) => setProfile(response.data))
            .catch(async (error: AxiosError) => {
                if (error.response?.status === 404) {
                    await router.push("/profile");
                }
                setError(error);
            })
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


    return { error, loading, profile, setProfile };
}