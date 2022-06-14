import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../hooks/useLanguage";
import { useProfile } from "../../hooks/useProfile";
import { useUser } from "@auth0/nextjs-auth0";
import { ModalStatus } from "../../global/types";
import axios from "axios";

import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormTags from "../form/FormTags";
import FormWrapper from "../form/FormWrapper";
import LogoutButton from "../LogoutButton";
import Modal from "../modal/Modal";
import BackButton from "../BackButton";

const UpdateProfile = () => {

    const { user } = useUser();
    const { t } = useTranslation();
    const changeLanguage = useLanguage();
    const { profile, setProfile } = useProfile();

    const [modalText, setModalText] = useState<string>("");
    const [modalStatus, setModalStatus] = useState<ModalStatus>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalRouterPath, setModalRouterPath] = useState<string>();

    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [birthdate, setBirthdate] = useState<string>("");
    const [interests, setInterests] = useState<string[]>([]);
    const [interest, setInterest] = useState<string>("");
    const [visualHandicapLevel, setVisualHandicapLevel] = useState<string>("");

    const updateProfile = () => {
        const updateDto = {
            id: "",
            name: name,
            gender: gender,
            language: language,
            interests: interests,
            birthdate: new Date(birthdate),
            visualHandicapLevel: visualHandicapLevel,
            oAuthIdentifier: user?.sub?.toString(),
        }

        axios.post('/api/profileService/updateProfile', updateDto)
            .then((response: any) => {
                setModalVisible(true);
                setModalStatus(ModalStatus.Success);
                setModalText(t("Your profile has been updated successfully."));
                setModalRouterPath("/");
                setProfile(response.data);
            }).catch(() => {
                setModalVisible(true);
                setModalRouterPath(undefined);
                setModalStatus(ModalStatus.Error);
                setModalText(t("Something went wrong while updating your profile."));
            })
    }

    const deleteProfile = () => {
        axios.delete('/api/profileService/deleteProfile')
            .then((response: any) => {
                setModalVisible(true);
                setModalStatus(ModalStatus.Success);
                setModalText(t("Your profile has been deleted successfully."));
                setModalRouterPath("/api/auth/logout");
                setProfile(undefined);
            }).catch(() => {
                setModalVisible(true)
                setModalRouterPath(undefined);
                setModalStatus(ModalStatus.Error);
                setModalText(t("Something went wrong while deleting your profile."));
            })
    }

    const addNewInterest = () => {
        const newInterests = [...interests, interest];
        setInterests(newInterests);
        setInterest("");
    }

    const removeInterest = (interest: string) => {
        const newInterests = [...interests].filter(x => x != interest);
        setInterests(newInterests);
    }

    useEffect(() => { changeLanguage(language); }, [language]);
    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setGender(profile.gender);
            setLanguage(profile.language);
            setInterests(profile.interests);
            setBirthdate(profile.birthdate);
            setVisualHandicapLevel(profile.visualHandicapLevel);
        }
    }, [profile]);


    return (<>
        <div className="bg-gray-700 flex flex-col h-full">
            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <BackButton navPage="/" />
                <LogoutButton />
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <div className="flex flex-col mt-4 mb-6">
                        <FormWrapper onSave={updateProfile} onDelete={deleteProfile}>

                            <FormInput
                                value={name}
                                label={t("Display name")}
                                onChange={(e) => { setName(e.target.value) }} />

                            <FormInput
                                type="date"
                                value={birthdate.split("T")[0]}
                                label={t("Date of birth")}
                                onChange={(e) => { setBirthdate(e.target.value) }}
                            />

                            <FormInput
                                value={gender}
                                label={t("Gender")}
                                onChange={(e) => { setGender(e.target.value) }}
                            />

                            <FormSelect
                                value={visualHandicapLevel}
                                label={t("Visual Handicap Level")}
                                onChange={(e) => { setVisualHandicapLevel(e.target.value) }}>
                                <option value="None">{t("None")}</option>
                                <option value="Half">{t("Half")}</option>
                                <option value="Blind">{t("Blind")}</option>
                            </FormSelect>

                            <FormSelect
                                value={language}
                                label={t("Language")}
                                onChange={(e) => { setLanguage(e.target.value) }}>
                                <option value="en-US">{t("English")} 🇬🇧</option>
                                <option value="nl-NL">{t("Dutch")} 🇳🇱</option>
                            </FormSelect>

                            <FormTags
                                value={interest}
                                tagList={interests}
                                label={t("Interests")}
                                onClick={addNewInterest}
                                childOnClickEvent={removeInterest}
                                onChange={(e) => { setInterest(e.target.value) }}
                            />

                        </FormWrapper>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            ModalOpen={modalVisible}
            setModalOpen={setModalVisible}
            status={modalStatus ?? ModalStatus.Error}
            title={modalStatus == ModalStatus.Success ? t("Success message") : t("Error message")}
            routerPath={modalRouterPath}
            text={modalText}
        />
    </>);

}

export default UpdateProfile;