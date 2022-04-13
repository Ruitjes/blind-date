import { useEffect, useState } from "react";
import Button from "./Button";
import Question from "./Question";
import axios from "axios";
import { useUser } from '@auth0/nextjs-auth0';

const Feed = () => {
    const { user, error, isLoading } = useUser();
    const [CurrentQuestion, SetCurrentQuestion] = useState(null);
    const [CurrentQuestionID, SetCurrentQuestionID] = useState<string>("");
    const [OutOfQuestions, SetOutOfQuestions] = useState<boolean>(true);
    const [AnswerText, SetAnswerText] = useState("");

    useEffect(() => {
        // Fetch questions and set state
        document.title = "Answer the question"
        getQuestion();
    }, []);

    const ProgressBookmark = () => {
        axios.get(`api/progressUserBookmark/${user!.sub}`).then((res: any) => {
            SetAnswerText("");
            getQuestion();
        }).catch((err) => { console.log(err); });
    };

    const getQuestion = () => {
        axios.get(`api/getQuestionForUser/${user!.sub}`).then((res: any) => {
            SetCurrentQuestion(res.data?.content);
            SetCurrentQuestionID(res.data?.id);
            if (res.data.content == "" || res.data.content == null) { SetOutOfQuestions(true); } else { SetOutOfQuestions(false); }
        }).catch((err) => { console.log(err); });
    };

    const answerQuestion = () => {
        //  const data = {id: null, content: AnswerText, questionId: CurrentQuestionID, userProfile: { userId: user!.sub, gender: "", age:99 } };
        const data = {
            "userProfile": {
                "userId": user!.sub?.toString(),
                "gender": "other",
                "age": "99"
            },
            "content": AnswerText,
            "questionId": CurrentQuestionID?.toString()
        };
        axios.post("/api/answerQuestion", data).then((res: any) => {
            SetAnswerText("");
            ProgressBookmark();
        }).catch((err) => { console.log(err); });
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
                        <textarea value={AnswerText} onChange={(e) => { SetAnswerText(e.target.value) }} disabled={OutOfQuestions} aria-label="Type your answer here" aria-required="true" className="flex flex-grow resize-none rounded-lg p-2" />


                    </div>

                    <div className="flex flex-col">
                        <div className='flex pt-4 max-w-sm justify-between'>
                            <Button ariaLabel="Skip the question" disabled={OutOfQuestions} icon="xmark" color="lightcoral" onClick={!OutOfQuestions ? ProgressBookmark : () => { }} />
                            <Button ariaLabel="Reply the question" disabled={OutOfQuestions} icon="reply" color="lightsteelblue" onClick={!OutOfQuestions ? answerQuestion : () => { }} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Feed;
