import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Header from "../Header";
import Loading from "../Loading";
import MyAnswer from "./MyAnswer";
import Question from '../Question';

type Props = {
    question: {
        id: string
    }
}

const MyAnswersPage = (props: Props) => {

    const [question, setQuestion] = useState<any>();
    const [questionError, setQuestionError] = useState<Error>();
    const [questionLoading, setQuetsionLoading] = useState<boolean>(true);

    const [answers, setAnswers] = useState<any>();
    const [answersError, setAnswersError] = useState<Error>();
    const [answersLoading, setAnswersLoading] = useState<boolean>(true);

    useEffect(() => {

        axios.get(`/api/getQuestionById/${props.question.id}`)
            .then((response) => setQuestion(response.data))
            .catch((error) => setQuestionError(error))
            .finally(() => setQuetsionLoading(false));

        axios.get(`/api/getAnswersByQuestionId/${props.question.id}`)
            .then((response) => setAnswers(response.data))
            .catch((error) => setAnswersError(error))
            .finally(() => setAnswersLoading(false));

    }, [props.question.id]);

    return (
        <div className='bg-gray-700 flex flex-col h-full'>
            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <div className="flex flex-col flex-grow w-full max-w-sm">

                    <div className="flex flex-col mt-4 mb-6">
                        <div className="flex flex-col flex-grow p-4">
                            <Question text={question?.content} loading={questionLoading} />
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow">
                        {
                            answers && answers.map((answer: any, index: number) => (
                                <div key={index} className="flex flex-col py-1">
                                    <div className="flex flex-row info-card items-center drop-shadow-lg">
                                        <MyAnswer answer={answer} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {questionLoading || answersLoading && (
                <div className="absolute flex justify-center items-center inset-0 bg-black/50">
                    <Loading />
                </div>
            )}

            {(questionError || answersError) && (
                <div className="absolute flex justify-center items-center inset-0 bg-black/50">
                    <ul>
                        {questionError && <li>{questionError.message}</li>}
                        {answersError && <li>{answersError.message}</li>}
                    </ul>
                </div>
            )}

        </div>
    )
}

export default MyAnswersPage;