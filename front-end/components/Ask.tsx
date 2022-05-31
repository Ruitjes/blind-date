import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import axios from "axios";
import { useTranslation } from "react-i18next";


const Ask = () => {    
    const { user } = useUser();
    const router = useRouter();

    const navigateToIndex = () => {
        router.push('/');
    }

    const { t } = useTranslation();
    const [QuestionText,SetQuestionText] = useState("");
    
    useEffect(() => {
      document.title = "Ask a Question Page"
    }, [])

    const shareQuestion = () => {
        const data = {id: null, content: QuestionText, addedOn: null, userIdentifier: user!.sub};
        axios.post("/api/askQuestion", data).then((res: any) => {
            SetQuestionText("");
            navigateToIndex();
        }).catch((err) => {console.log(err);});
    };

    return (
        <div className="bg-gray-700 flex flex-col h-full">

            <div className="flex flex-col flex-grow items-center p-4 bg-pink-400">
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <div className='flex flex-col mt-4 mb-8'>
                        <div className='flex flex-col flex-grow p-4'>
                        <div className="info-card -m-4 p-4 py-6 drop-shadow-lg">
                            <h1 className="text-gray-700 font-medium text-center text-3xl">
                                {t('What is on your mind?')}
                            </h1>
                        </div>
                        </div>
                    </div>

                    <div className='flex flex-col flex-grow'>
                        <textarea aria-label={t("Type your question here")} aria-required="true" className="flex h-2/5 resize-none rounded-lg p-2" value={QuestionText} onChange={(e) => {SetQuestionText(e.target.value)}} />
                    </div>

                    <div className="flex flex-col">
                        <div className='flex pt-4 max-w-sm justify-between'>
                            <button aria-label={t("Share Question")} disabled={QuestionText?.length == 0} className={`bg-white ${QuestionText?.length == 0 ? "disabled:opacity-75" : "hover:bg-slate-200"} w-full text-gray-700 font-bold py-2 px-4 rounded-full`} onClick={shareQuestion}>
                                {t("Share Question")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Ask;