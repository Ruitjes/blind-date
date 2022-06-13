import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Header from "../Header";
import Loading from "../Loading";
import MyAnswer from "./MyAnswer";
import Question from '../Question';
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton";
import Banner from "../Banner";

type Props = {
    question: {
        id: string
    },
	onReportAnswer?: (answerId: number, answerContent: string, reportedId: string, reportedName: string) => void;
}

const MyAnswersPage = (props: Props) => {
	const { user } = useUser();
    const [question, setQuestion] = useState<any>();
    const [questionError, setQuestionError] = useState<Error>();
    const [questionLoading, setQuetsionLoading] = useState<boolean>(true);

    const [answers, setAnswers] = useState<any>();
    const [answersError, setAnswersError] = useState<Error>();
    const [answersLoading, setAnswersLoading] = useState<boolean>(true);

    const { t } = useTranslation();

    // Report result
	const [reportResultMessage, setReportResultMessage] = useState('');
	const [reportResultInfo, setReportResultInfo] = useState('');

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


    // Report answer
	const reportAnswer = (answerId: number, answerContent: string, reportedId: string, reportedName: string) => {
		const data = {
			reporter: {
				id: user!.sub?.toString(),
				name: user?.name,
			},
			reported: {
				id: reportedId.toString(),
				name: reportedName
            },
            reportedContent: {
                Id: answerId,
                Content: answerContent
            },
			question: {
				id: question?.id.toString(),
				content: question?.content
			}
        };
        
		axios
			.post('/api/reportService/reportContent', data)
			.then((res: any) => {
				setReportResultMessage('Report');
				setReportResultInfo('Answer was successfully reported');
			})
			.catch((err) => {
				setReportResultMessage('Report');
				setReportResultInfo(err.message);
			});
    };

    
    const onBannerClose = () => {
		setReportResultMessage('');
		setReportResultInfo('');
	};


    return (
        <div className='bg-gray-700 flex flex-col h-full'>
            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <BackButton navPage="/myQuestions" />
                <div className="flex flex-col flex-grow w-full max-w-sm">

                    <div className="flex flex-col mt-4 mb-6">
                        <div className="flex flex-col flex-grow p-4">
                            <Question text={question?.content} loading={questionLoading} />
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow p-6 -mx-4 -mb-6">
                        {answers?.length === 0 && <h1>{t("No answers found")}</h1>}
                        <div className="flex flex-col shadow-lg drop-shadow-lg bg-white rounded-lg">
                            {
                                answers && answers.map((answer: any, index: number) => (
                                    <div key={index} className="flex flex-col py-1">
                                        <div className="flex flex-row items-center">
                                            <MyAnswer answer={answer} onReportAnswer={reportAnswer} />
                                        </div>
                                        { index < answers.length - 1 && <hr/>}
                                    </div>
                                ))
                            }
                        </div>
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

            {/* Report result */}
            {reportResultMessage && (
                <div className="absolute flex justify-center items-center inset-0 bg-black/50">
                    <Banner
                        message={reportResultMessage}
                        additionalInfo={reportResultInfo}
                        onCloseClick={onBannerClose} />
                </div>
            )}

        </div>
    )
}

export default MyAnswersPage;