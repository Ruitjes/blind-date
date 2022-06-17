import Header from "../Header";
import Subtitle from "../Subtitle";
import AskQuestionEditBox from "./AskQuestionEditBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import common_api from "../../utils/common_api";
import { useUser } from '@auth0/nextjs-auth0';
import { useProfile } from "../../hooks/useProfile";
import Loading from "../Loading";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton";
import Modal from "../modal/Modal";
import { ModalStatus } from '../../global/types';

const AskQuestionPage = () => {
	const { user } = useUser();
    const { profile } = useProfile();
    
    const [loading, setLoading] = useState<boolean>();
    const [text, setText] = useState<string>();
    const [file, setFile] = useState<File>();

    const [ModalStatus, setModalStatus] = useState<ModalStatus>();
    const [ModalOpen, setModalOpen] = useState<boolean>(false)
    const [ModalText, setModalText] = useState<string>("")

    const { t } = useTranslation();

    const handleTextChanged = (e: React.ChangeEvent<HTMLDivElement>) => {
        setText(e.target.textContent ?? undefined);
    }

    const handleFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0]);
    }

    useEffect(() => {
      document.title = "Ask a question page";
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);

        axios.get('api/getAccessToken').then(async ({ data: access_token }) => {
            try {
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("fileName", file.name);

                    await common_api.httptoken(access_token).post(process.env.NEXT_PUBLIC_API_URL + '/upload-service/upload', formData);
                }
                
                const question = { content: text, addedOn: null, userIdentifier: user!.sub, fileName: file?.name, language: profile?.language }
                await common_api.httptoken(access_token).post(process.env.NEXT_PUBLIC_API_URL + '/question-service/question/askQuestion', question);
                
                setModalOpen(true);
                setModalStatus(0);
                setModalText(t("You have successfully asked a new question."));

            } catch(err) {

                setModalOpen(true);
                setModalStatus(1);
                setModalText(t("Something went wrong when creating your question."));
            } finally {
                setLoading(false);
            }
        });
    }

    return (

        <div className='bg-gray-700 flex flex-col h-full'>

            <div className="flex flex-col flex-grow items-center p-4 bg-pink-400">
                <BackButton navPage="/"/>
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <form onSubmit={handleSubmit} className='flex flex-col flex-grow p-4'>

                        <div className="flex flex-col py-1">
                            <div className="flex flex-col info-card p-4 items-center drop-shadow-lg">
                                <FontAwesomeIcon className="p-2" fixedWidth size="6x" color="#333" icon={['fas', 'question-circle']} />
                                <Header center text={t("Create a question")} />
                            </div>
                        </div>

                        <div className="flex flex-col py-1">
                            <div className="flex flex-col info-card p-4 drop-shadow-lg">
                                <Header text={t("Question")} />
                                <Subtitle text={t("What would you like to ask?")} />
                                <AskQuestionEditBox onChange={handleTextChanged} />
                            </div>
                        </div>

                        <div className="flex flex-col py-1">
                            <label className="flex flex-col info-card p-4 drop-shadow-lg">
                                <div className="flex flex-grow">
                                    <div className="flex flex-col" aria-hidden>
                                        <Header text={t("Picture")} />
                                        <Subtitle text={t("Add an image in your question to share with others.")} />
                                    </div>

                                    <div className="flex flex-col relative">
                                        <FontAwesomeIcon
                                            size="2x"
                                            color="#333"
                                            icon={['fas', 'image']}
                                            fixedWidth
                                        />

                                        {file && (
                                            <div className="absolute right-0">
                                                <FontAwesomeIcon
                                                    size="xs"
                                                    color="white"
                                                    icon={['fas', 'circle']}
                                                    className="absolute right-0"
                                                    fixedWidth
                                                />

                                                <FontAwesomeIcon
                                                    size="sm"
                                                    color="mediumseagreen"
                                                    icon={['fas', 'circle-check']}
                                                    className="absolute right-0"
                                                    fixedWidth
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <input type='file' className="h-0" onChange={handleFileChanged} accept=".png, .jpg, .jpeg" />
                            </label>
                        </div>

                        <div className="flex flex-col flex-grow justify-end">
                            <button type="submit" className="info-card p-4 drop-shadow-lg" aria-label={t("Share the question")}>
                                <Header center text={t("Share")} />
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {loading && (
                <div className="absolute flex justify-center items-center inset-0 bg-black/50">
                    <Loading />
                </div>
            )}

            <Modal routerPath={"/"} ModalOpen={ModalOpen} setModalOpen={setModalOpen} status={ModalStatus ?? 1} title={ModalStatus == 0 ? t("Success message") : t("Error message")} text={ModalText} />
        </div>
    );
}

export default AskQuestionPage;