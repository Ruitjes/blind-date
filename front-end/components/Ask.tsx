import { useEffect, useState } from "react";
import Button from "./Button";
import Question from "./Question";
import question_service from "../services/question_service";
import { useRouter } from 'next/router';

const Ask = () => {
    const router = useRouter();
    const navigateToIndex = () => {
        router.push('/');
      }
    const [QuestionText,SetQuestionText] = useState("");
    

    const shareQuestion = () => {
        question_service.AskQuestion(QuestionText,"101").then((res: any) => {
            SetQuestionText("");
            navigateToIndex();
        }).catch((err) => {console.log(err);});
    };

    return (
        <div className='bg-gray-700 flex flex-col h-full'>

            <div className="flex flex-col flex-grow items-center p-4 bg-pink-400">
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <div className='flex flex-col mt-4 mb-8'>
                        <div className='flex flex-col flex-grow p-4'>
                        <div className="info-card -m-4 p-4 py-6 drop-shadow-lg">
                            <h1 className="text-gray-700 font-medium text-center text-3xl">
                                What's on your mind?
                            </h1>
                        </div>
                        </div>
                    </div>

                    <div className='flex flex-col h-2/5'>
                        <textarea className="flex flex-grow resize-none rounded-lg p-2" value={QuestionText} onChange={(e) => {SetQuestionText(e.target.value)}} />
                    </div>

                    <div className="flex flex-col">
                        <div className='flex pt-4 max-w-sm justify-between'>
                            <button disabled={QuestionText?.length == 0} className={`bg-white ${QuestionText?.length == 0 ? "disabled:opacity-75" : "hover:bg-slate-200"} w-full text-gray-700 font-bold py-2 px-4 rounded-full`} onClick={shareQuestion}>
                                Share Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Ask;