import { useEffect, useState } from "react";
import Button from "./Button";
import Question from "./Question";
import question_service from "../services/question_service";
import { join } from "path";
import { rawListeners } from "process";

const Feed = () => {

    const [CurrentQuestion,SetCurrentQuestion] = useState(null);
    const [OutOfQuestions,SetOutOfQuestions]= useState<boolean>(false);

    useEffect(() => {
        // Fetch questions and set state
        document.title = "Answer the question"
        getQuestion();
    },[]);

    const ProgressBookmark = () => {   
        question_service.ProgressUserBookmark("101").then((res: any) => {
            console.log(res.data);
            getQuestion();
        }).catch((err) => {console.log(err);});
    };

    const getQuestion = () => {
        question_service.GetQuestionForUser("101").then((res: any) => {
            console.log(res.data); 
            SetCurrentQuestion(res.data.content);
            if(res.data.content == "") {SetOutOfQuestions(true);}
        }).catch((err) => {console.log(err);});
    };

    return (
        <div className='bg-gray-700 flex flex-col h-full'>

            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <div className="flex flex-col flex-grow w-full max-w-sm">
                    <div className='flex flex-col mt-4 mb-8'>
                        <div className='flex flex-col flex-grow p-4'>
                            <Question text={CurrentQuestion ?? "No questions, come back at a later time."} />
                        </div>
                    </div>

                    <div className='flex flex-col flex-grow'>
                        <textarea aria-label="Type your answer here" aria-required="true" className="flex flex-grow resize-none rounded-lg p-2"/>

                        
                    </div>

                    <div className="flex flex-col">
                        <div className='flex pt-4 max-w-sm justify-between'>
                            <Button ariaLabel="Skip the question"  icon="xmark" color="lightcoral" onClick={!OutOfQuestions ? ProgressBookmark : () => {}} />
                            <Button ariaLabel="Reply the question"  icon="reply" color="lightsteelblue" onClick={!OutOfQuestions ? ProgressBookmark : () => {}}  />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Feed;
