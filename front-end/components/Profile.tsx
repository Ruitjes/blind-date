import React, { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import axios from "axios";
import BackButton from "./BackButton";
import LogoutButton from "./LogoutButton";
import { useTranslation } from 'react-i18next';
import FormSelect from "./form/FormSelect";
import FormInput from "./form/FormInput";
import FormTags from "./form/FormTags";
import FormWrapper from "./form/FormWrapper";
import Modal from "./modal/Modal";
import { ModalStatus } from '../global/types';

export class Profile {
    oAuthIdentifier: string | null = null;
    name: string = "";
    gender: string = "";
    birthdate: string = "";
    language: string = "";
    interests: string[] = [];
    visualHandicapLevel: string = "";
}

const ProfileComponent = () => {
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const [profile, SetProfile] = useState<Profile>(new Profile());
    const [newInterest, setNewInterest] = useState<string>("");
    const [HasProfile, SetHasProfile] = useState<boolean>();
    const [Loading, setLoading] = useState<boolean>(false);

    const [ModalStatus, setModalStatus] = useState<ModalStatus>();
    const [ModalOpen, setModalOpen] = useState<boolean>(false)
    const [ModalText, setModalText] = useState<string>("")

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
            "id": "",
            "oAuthIdentifier": user!.sub?.toString(),
            "name": profile.name,
            "gender": profile.gender,
            "birthdate": new Date(profile.birthdate),
            "interests": profile.interests,
            "language": profile.language,
            "visualHandicapLevel": profile.visualHandicapLevel
        };
        axios.post('api/profileService/createProfile', data).then((res: any) => {
            SetHasProfile(true);
            SetProfile(new Profile);
            SetProfile(res.data);

            setModalOpen(true);
            setModalStatus(0);
            setModalText(t("Your profile has been created successfully."));
        }).catch((err) => { 
            setModalOpen(true);
            setModalStatus(1);
            setModalText(t("Something went wrong while creating your profile."));
            console.log(err); 
        });
    };

    const UpdateProfileOfUser = () => {
        const data = {
            "id": "",
            "oAuthIdentifier": user!.sub?.toString(),
            "name": profile.name,
            "gender": profile.gender,
            "birthdate": new Date(profile.birthdate),
            "interests": profile.interests,
            "language": profile.language,
            "visualHandicapLevel": profile.visualHandicapLevel
        };
        axios.put('api/profileService/updateProfile', data).then((res: any) => {
            SetProfile(new Profile);
            SetProfile(res.data);

            setModalOpen(true);
            setModalStatus(0);
            setModalText(t("Your profile has been updated successfully."));
        }).catch((err) => { 
            setModalOpen(true);
            setModalStatus(1);
            setModalText(t("Something went wrong while updating your profile."));
            console.log(err); 
        });
    };

    const SetLanguage = (language: string) => {
        switch (language) {
            case "nl-NL":
                i18n.changeLanguage("nl");
                break;
            case "en-US":
                i18n.changeLanguage("en");
                break;
        }
    }

    const addNewInterest = () => {
        const newInt = [...profile.interests, newInterest];
        SetProfile({ ...profile, interests: newInt });
        setNewInterest("");
    };

    const deleteProfile = () => {
      console.log("hello");
    };

    const removeInterest = (deleteThisInterest: string) => {
        const newInt = [...profile.interests].filter(x => x != deleteThisInterest);
        SetProfile({ ...profile, interests: newInt });
    };

    return (<>
        <div className="bg-gray-700 flex flex-col h-full">
            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <BackButton navPage="/" />
                <LogoutButton />
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <div className="flex flex-col mt-4 mb-6">
                        <FormWrapper onClick={HasProfile ? UpdateProfileOfUser : CreateProfileOfUser} deleteClick={deleteProfile} buttonText={t("Save")} deleteText={t("Delete Profile")}>
                            <FormInput loading={Loading} label={t("Display name")} type="text" value={profile.name} onChange={(e) => { SetProfile({ ...profile, name: e.target.value }) }} />

                            <FormInput loading={Loading} label={t("Date of birth")} type="date" defaultValue={profile.birthdate.split('T')[0]} onChange={(e) => { SetProfile({ ...profile, birthdate: e.target.value }) }} />

                            <FormInput loading={Loading} label={t("Gender")} value={profile.gender} onChange={(e) => { SetProfile({ ...profile, gender: e.target.value }) }} />

                            <FormSelect loading={Loading} label={t("Visual Handicap Level")} value={profile.visualHandicapLevel} onChange={(e) => { SetLanguage(e.target.value); SetProfile({ ...profile, visualHandicapLevel: e.target.value }) }}>
                                <option value="None">{t("None")}</option>
                                <option value="Half">{t("Half")}</option>
                                <option value="Blind">{t("Blind")}</option>
                            </FormSelect>

                            <FormSelect loading={Loading} label={t("Language")} value={profile.language} onChange={(e) => { SetLanguage(e.target.value); SetProfile({ ...profile, language: e.target.value }) }}>
                                <option value="en-US">{t("English")} 🇬🇧</option>
                                <option value="nl-NL">{t("Dutch")} 🇳🇱</option>
                            </FormSelect>

                            <FormTags loading={Loading} label={t("Interests")} childOnClickEvent={removeInterest} tagList={profile?.interests} onClick={addNewInterest} value={newInterest} onChange={(e) => { setNewInterest(e.target.value) }} />
                                                                                     
                        </FormWrapper>
                    </div>
                </div>
            </div>
        </div>
        <Modal ModalOpen={ModalOpen} setModalOpen={setModalOpen} status={ModalStatus ?? 1} title={ModalStatus == 0 ? t("Success message") : t("Error message")} text={ModalText} />
    </>);
};

export default ProfileComponent;