import { useEffect, useState } from "react";
import Button from "./Button";
import Question from "./Question";
import axios from "axios";
import { useUser } from '@auth0/nextjs-auth0';

const Feed = () => {
    const { user, error, isLoading } = useUser();
    const [CurrentQuestion,SetCurrentQuestion] = useState("");
    const [OutOfQuestions,SetOutOfQuestions]= useState<boolean>(false);

    useEffect(() => {
        // Fetch questions and set state
        getQuestion();
    },[]);

    const ProgressBookmark = () => {   
        axios.get(`api/progressUserBookmark/${user!.sub}`).then((res: any) => {
            getQuestion();
        }).catch((err) => {console.log(err);});
    };

    const getQuestion = () => {
        axios.get(`api/getQuestionForUser/${user!.sub}`).then((res: any) => {
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
                        <textarea className="flex flex-grow resize-none rounded-lg p-2">

                        </textarea>
                    </div>

                    <div className="flex flex-col">
                        <div className='flex pt-4 max-w-sm justify-between'>
                            <Button icon="xmark" color="lightcoral" onClick={!OutOfQuestions ? ProgressBookmark : () => {}} />
                            <Button icon="reply" color="lightsteelblue" onClick={!OutOfQuestions ? ProgressBookmark : () => {}}  />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Feed;