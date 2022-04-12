import Header from "../Header";
import Subtitle from "../Subtitle";
import AskQuestionEditBox from "./AskQuestionEditBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from "next/router";

const AskQuestionPage = () => {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    
    const [text, setText] = useState<string>();
    const [file, setFile] = useState<File>();

    const handleTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const handleFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0]);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text && file) {

            const formData = new FormData();
            formData.append("file", file);

            axios.get('api/getAccessToken').then((token: any) => {
                axios.post('https://localhost:7000/upload-service/Upload', formData, {
                    headers: {
                      Authorization: `Bearer ${token.data}`
                    }
                }).then(() => {
                    axios.post('https://localhost:7000/question-service/Question/AskQuestion', {
                        id: null, content: text, addedOn: null, userIdentifier: user!.sub
                    }, {
                        headers: {
                            Authorization: `Bearer ${token.data}`
                          }
                    }).then(() => {
                        router.push('/')
                    })
                })
            });
        }
    }

    return (

        <div className='bg-gray-700 flex flex-col h-full'>

            <div className="flex flex-col flex-grow items-center p-4 bg-pink-400">
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <form onSubmit={handleSubmit} className='flex flex-col flex-grow p-4'>

                        <div className="flex flex-col py-1">
                            <div className="flex flex-col info-card p-4 items-center drop-shadow-lg">
                                <FontAwesomeIcon className="p-2" fixedWidth size="6x" color="text-gray-700" icon={['fas', 'question-circle']} />
                                <Header center text="Create a question" />
                            </div>
                        </div>

                        <div className="flex flex-col py-1">
                            <div className="flex flex-col info-card p-4 drop-shadow-lg">
                                <Header text="Question" />
                                <Subtitle text="What would you like to ask?" />
                                <AskQuestionEditBox value={text} onChange={handleTextChanged}/>
                            </div>
                        </div>

                        <div className="flex flex-col py-1">
                            <div className="flex flex-col info-card p-4 drop-shadow-lg">
                                <div className="flex flex-grow">
                                    <div className="flex flex-col">
                                        <Header text="Picture" />
                                        <Subtitle text="Add an image in your question to share with others." />
                                    </div>
                                    <div className="flex flex-col">
                                        <FontAwesomeIcon fixedWidth size="2x" color="text-gray-700" icon={['fas', 'image']} />
                                    </div>
                                </div>
                                <input type='file' onChange={handleFileChanged}/>
                            </div>
                        </div>

                        <div className="flex flex-col flex-grow justify-end">
                            <button type="submit" className="flex flex-col info-card p-4 drop-shadow-lg">
                                <Header center text="Share" />
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default AskQuestionPage;