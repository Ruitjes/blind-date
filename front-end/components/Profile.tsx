import React, { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import axios from "axios";
import ProfileSkeleton from "./ProfileSkeleton";
import BackButton from "./BackButton";
import { useTranslation } from 'react-i18next';

export class Profile {
    oAuthIdentifier: string | null = null;
    name: string = "";
    gender: string = "";
    birthdate: string = "";
    language: string = "";
    interests: string[] = [];
}

const ProfileComponent = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const [profile, SetProfile] = useState<Profile>(new Profile());
    const [newInterest, setNewInterest] = useState<string>("");
    const [HasProfile, SetHasProfile] = useState<boolean>();
    const [Loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        document.title = "Configure profile"
        getProfileOfUser();
    }, [user]);

    const getProfileOfUser = () => {
        if (user != null) {
            setLoading(true);
            axios.get<Profile>('api/profileService/getProfile/').then((response: any) => {
                if (response.data == "" || response.data == null) {
                    SetHasProfile(false);
                    setLoading(false);
                }
                else {
                    SetProfile(response.data);
                    SetHasProfile(true);
                    setLoading(false);
                }
            }).catch((err) => { console.log(err); });
        }
    };

    const CreateProfileOfUser = () => {
        const data = {
            "oAuthIdentifier": user!.sub?.toString(),
            "name": profile.name,
            "gender": profile.gender,
            "birthdate": new Date(profile.birthdate),
            "interests": profile.interests,
            "language": profile.language
        };
        axios.post('api/profileService/createProfile', data).then((res: any) => {
            SetProfile(new Profile);
            SetProfile(res.data);
        }).catch((err) => { console.log(err); });
    };

    const UpdateProfileOfUser = () => {
        const data = {
            "oAuthIdentifier": user!.sub?.toString(),
            "name": profile.name,
            "gender": profile.gender,
            "birthdate": new Date(profile.birthdate),
            "interests": profile.interests,
            "language": profile.language
        };
        axios.put('api/profileService/updateProfile', data).then((res: any) => {
            SetProfile(new Profile);
            SetProfile(res.data);
        }).catch((err) => { console.log(err); });
    };

    const addNewInterest = () => {
        const newInt = [...profile.interests, newInterest];
        SetProfile({ ...profile, interests: newInt });
        setNewInterest("");
    };

    const removeInterest = (deleteThisInterest: string) => {
        const newInt = [...profile.interests].filter(x => x != deleteThisInterest);
        SetProfile({ ...profile, interests: newInt });
    };

    return (<>
        <div className="bg-gray-700 flex flex-col h-full">
            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <BackButton navPage="/" />
                {!Loading ?
                    <>
                        <div className="flex flex-col flex-grow w-full max-w-sm">
                            <div className="flex flex-col mt-4 mb-6">
                                <div>
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                                <div className="flex flex-wrap -mx-3">
                                                    <div className="w-full px-3">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2">
                                                            {t("Display name")}
                                                        </label>
                                                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={profile.name} onChange={(e) => { SetProfile({ ...profile, name: e.target.value }) }} />
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap -mx-3">
                                                    <div className="w-full px-3">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2">
                                                            {t("Date of birth")}
                                                        </label>
                                                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" defaultValue={profile.birthdate.split('T')[0]} onChange={(e) => { SetProfile({ ...profile, birthdate: e.target.value }) }} />
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap -mx-3 px-3">
                                                    <div className="w-full">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2">
                                                            {t("Gender")}
                                                        </label>
                                                    </div>
                                                    <div className="inline-block relative w-full">
                                                        <select className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={profile.gender} onChange={(e) => { SetProfile({ ...profile, gender: e.target.value }) }}>
                                                            <option value="Male">{t("Male")}</option>
                                                            <option value="Female">{t("Female")}</option>
                                                            <option value="Other">{t("Other")}</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap -mx-3 px-3">
                                                    <div className="w-full">
                                                        <label className="block text-gray-700 text-xs font-bold mb-2">
                                                            {t("Language")}
                                                        </label>
                                                    </div>
                                                    <div className="inline-block relative w-full">
                                                        <select className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={profile.language} onChange={(e) => { SetProfile({ ...profile, language: e.target.value }) }}>
                                                            <option value="en-US">{t("English")}</option>
                                                            <option value="nl-NL">{t("Dutch")}</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 text-xs font-bold mb-2">
                                                        {t("Interests")}
                                                    </label>
                                                    <div className="flex flex-col space-y-4 items-center mx-4 sm:mx-0">
                                                        <div className="flex flex-wrap items-stretch w-full relative">
                                                            <input type="text" className="flex-shrink flex-grow flex-auto leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-px flex-1 border h-10 border-grey-light rounded rounded-r-none px-3 relative" placeholder="New interest" value={newInterest} onChange={(e) => { setNewInterest(e.target.value) }} />
                                                            <div className="flex -mr-px">
                                                                <button className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm" onClick={addNewInterest}>+</button>
                                                            </div>
                                                        </div>
                                                        <div className='my-3 flex flex-wrap -m-1'>
                                                            {profile?.interests?.length > 0 ? profile?.interests?.map((interest, id) =>
                                                                <span key={id}
                                                                    className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-30 rounded px-4 py-2 font-bold leading-loose cursor-pointer">
                                                                    {interest}
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        onClick={() => { removeInterest(interest) }}
                                                                        className="w-3 h-3 sm:h-4 sm:w-4 ml-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                                                        viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd"
                                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                            clipRule="evenodd" />
                                                                    </svg>
                                                                </span>
                                                            ) : <></>}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={HasProfile ? UpdateProfileOfUser : CreateProfileOfUser}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </> : <ProfileSkeleton />}
            </div>
        </div>
    </>);
};

export default ProfileComponent;