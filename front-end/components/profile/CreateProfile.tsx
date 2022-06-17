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

const CreateProfile = () => {

    const { user } = useUser();
    const { t } = useTranslation();
    const { loading, setProfile } = useProfile();
    const changeLanguage = useLanguage();

    const [modalText, setModalText] = useState<string>("");
    const [modalStatus, setModalStatus] = useState<ModalStatus>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [birthdate, setBirthdate] = useState<string>("");
    const [interests, setInterests] = useState<string[]>([]);
    const [interest, setInterest] = useState<string>("");
    const [visualHandicapLevel, setVisualHandicapLevel] = useState<string>("");

    const createProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const createDto = {
            id: "",
            name: name,
            gender: gender,
            language: language?.length < 1 ? "en-US" : language,
            interests: interests,
            birthdate: new Date(birthdate),
            visualHandicapLevel: visualHandicapLevel?.length < 1 ? "None" : visualHandicapLevel,
            oAuthIdentifier: user?.sub?.toString(),
        }

        axios.post('/api/profileService/createProfile', createDto)
            .then((response: any) => {
                setModalVisible(true);
                setModalStatus(ModalStatus.Success);
                setModalText(t("Your profile has been created successfully."));
                setProfile(response.data);
            }).catch(() => {
                setModalVisible(true);
                setModalStatus(ModalStatus.Error);
                setModalText(t("Something went wrong while creating your profile."));
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

    useEffect(() => { changeLanguage(language); }, [language])

    return (<>
        <div className="bg-gray-700 flex flex-col h-full">
            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <LogoutButton />
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <div className="flex flex-col mt-4 mb-6">
                        <FormWrapper title="Create profile" onSave={createProfile}>

                            <FormInput
                                value={name}
                                required={true}
                                loading={loading}
                                label={t(loading ? "" : "Display name")}
                                onChange={(e) => { setName(e.target.value) }} />

                            <FormInput
                                type="date"
                                required={true}
                                loading={loading}
                                label={t(loading ? "" : "Date of birth")}
                                defaultValue={birthdate.split('T')[0]}
                                onChange={(e) => { setBirthdate(e.target.value) }}
                            />

                            <FormInput
                                value={gender}
                                required={true}
                                loading={loading}
                                label={t(loading ? "" : "Gender")}
                                onChange={(e) => { setGender(e.target.value) }}
                            />

                            <FormSelect
                                loading={loading}
                                value={visualHandicapLevel}
                                label={t(loading ? "" : "Visual Handicap Level")}
                                onChange={(e) => { setVisualHandicapLevel(e.target.value) }}>
                                <option value="None">{t("None")}</option>
                                <option value="Half">{t("Half")}</option>
                                <option value="Blind">{t("Blind")}</option>
                            </FormSelect>

                            <FormSelect
                                value={language}
                                loading={loading}
                                label={t(loading ? "" : "Language")}
                                onChange={(e) => { setLanguage(e.target.value) }}>
                                <option aria-label={t("English")} value="en-US">{t("English")} 🇬🇧</option>
                                <option aria-label={t("Dutch")} value="nl-NL">{t("Dutch")} 🇳🇱</option>
                            </FormSelect>

                            <FormTags
                                value={interest}
                                loading={loading}
                                tagList={interests}
                                label={t(loading ? "" : "Interests")}
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
            text={modalText}
            routerPath={modalStatus === ModalStatus.Success ? "/" : undefined}
        />
    </>);

}

export default CreateProfile;