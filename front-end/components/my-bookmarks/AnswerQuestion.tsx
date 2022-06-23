import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Question from '../Question';
import Button from '../Button';
import axios from 'axios';
import Banner from '../Banner';
import Loading from '../Loading';
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton';
import Router, { useRouter } from 'next/router';
import Modal from '../modal/Modal';
import { ModalStatus } from '../../global/types';

type Props = {
    question: {
        id: string
    }
}

const AnswerQuestion = (props: Props) => {
	const { user } = useUser();
	const router = useRouter();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(true);

	const [showFullImage, setShowFullImage] = useState<boolean>();
	const [OutOfQuestions, SetOutOfQuestions] = useState<boolean>();
	const [CurrentQuestion, SetCurrentQuestion] = useState<any>(null);
	const [AnswerText, SetAnswerText] = useState("");

	const [ModalStatus, setModalStatus] = useState<ModalStatus>();
	const [ModalOpen, setModalOpen] = useState<boolean>(false);
	const [ModalText, setModalText] = useState<string>("");
	const [RouterPath, setRouterPath] = useState<string>();

	// Report result
	const [reportResultMessage, setReportResultMessage] = useState('');
	const [reportResultInfo, setReportResultInfo] = useState('');

	const { t } = useTranslation();

	useEffect(() => {
		// Fetch questions and set state
		document.title = t('Answer the question');
		getQuestion();
	}, []);

	const getQuestion = () => {
		axios
			.get(`/api/getSavedQuestionById/${props.question.id}`)
			.then((res: any) => {
				SetCurrentQuestion(res.data);
				SetOutOfQuestions(!res.data.content);
				SetAnswerText(res?.data?.answerText);
			})
			.catch((error) => setError(error))
            .finally(() => setLoading(false));
	};
	const answerQuestion = () => {
		const data = {
			userProfile: {
				userId: user!.sub?.toString(),
				userName: user!.name?.toString(),
				gender: 'other',
				age: '99',
			},
			content: AnswerText?.trim(),
			questionId: CurrentQuestion.questionId?.toString(),
		};

		axios
			.post('/api/answerQuestion', data)
			.then((res: any) => {
				SetAnswerText("");
				removeSavedQuestion();
				// Open modal, so user get's feedback
				setModalOpen(true);
				setModalStatus(0);
				setModalText(t("You have successfully answered the question."));
				setRouterPath("/myBookmarks");
			})
			.catch((err) => {
				setModalOpen(true);
				setModalStatus(1);
				setModalText(t("Something went wrong in answering this question."));
				setRouterPath(undefined);		
				console.log(err);
			});
	};

	const removeSavedQuestion = () => {
		axios
		.delete(`/api/removeSavedQuestionById/${props.question.id}`)
		.then((res: any) => {
			SetAnswerText("");

			setModalOpen(true);
			setModalStatus(0);
			setModalText(t("You have successfully answered the question."));
			setRouterPath("/myBookmarks");
		})
		.catch((err) => {
			setModalOpen(true);
			setModalStatus(1);
			setModalText(t("Something went wrong in answering this question."));
			setRouterPath(undefined);
			console.log(err);
		});
	};

	const handleImageToggle = () => {
		setShowFullImage(!showFullImage);
	};

	const handleAnswerTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		SetAnswerText(e.target.value);
	};

	// Report question
	const reportQuestion = () => {
		const data = {
			reporter: {
				id: user!.sub?.toString(),
				name: user?.name,
			},
			reported: {
				id: CurrentQuestion!.userIdentifier?.toString(),
				// TODO: send reported user name
				name: ""
			},
			reportedContent: CurrentQuestion.content,
			question: {
				id: CurrentQuestion.questionId?.toString(),
				content: CurrentQuestion.content
			}
		};
		
		axios
			.post('/api/reportQuestion', data)
			.then((res: any) => {
				setReportResultMessage('Report');
				setReportResultInfo('Question was successfully reported');
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
		<div className="bg-gray-700 flex flex-col h-full">
			<div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
				<BackButton navPage='/myBookmarks' />
				<div className="flex flex-col flex-grow w-full max-w-sm">
					<div className="flex flex-col mt-4 mb-6">
						<div className="flex flex-col flex-grow p-4">
							{ OutOfQuestions ? (
                                <Question loading={loading} text={t("No questions, come back at a later time.")}/>
                            ) : (
                                <Question loading={loading} text={CurrentQuestion?.content} onReportClick={reportQuestion}/>
                            )}
						</div>
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex flex-row flex-grow relative mx-4">
							{CurrentQuestion?.fileName && (
								<img
									width={48}
									height={48}
									onClick={handleImageToggle}
									className="absolute right-2 bottom-2 rounded-lg"
									src={`https://seetrough.s3.eu-central-1.amazonaws.com/${CurrentQuestion.fileName}`} />
							)}

							<textarea
								value={AnswerText}
                                disabled={loading ? true : OutOfQuestions ? true : false}
								onChange={handleAnswerTextChanged}
								className="flex flex-grow resize-none rounded-lg text-2xl outline-none p-4"
								placeholder={t("Write something...")}
								aria-label={t("Type your answer here")}
								aria-required="true" />
						</div>
					</div>

					<div className="flex flex-col">
						<div className="flex pt-4 mx-4 max-w-sm justify-between">
							<Button
								ariaLabel={t("Skip the question")}
								icon="xmark"
								color="lightcoral"
								disabled={loading ? true : OutOfQuestions ? true : false}
								onClick={(removeSavedQuestion)} />
							<Button
								ariaLabel={t("Reply to the question")}
								icon="share"
								color="slategrey"
                                disabled={loading ? true : OutOfQuestions ? true : AnswerText?.trim()?.length < 1 ? true : false}
								onClick={answerQuestion} />
						</div>
					</div>
				</div>

				{/* Report result */}
				{reportResultMessage && (
					<Banner
						message={reportResultMessage}
						additionalInfo={reportResultInfo}
						onCloseClick={onBannerClose} />
				)}
			</div>

			{CurrentQuestion?.fileName && showFullImage && (
				<div
					className="absolute flex justify-center items-center inset-0 bg-black/50"
					onClick={handleImageToggle}
				>
					<img
						alt="question-image"
						className="flex-grow p-4 w-full max-w-lg"
						src={`https://seetrough.s3.eu-central-1.amazonaws.com/${CurrentQuestion.fileName}`} />
				</div>
			)}
			<Modal routerPath={RouterPath} ModalOpen={ModalOpen} setModalOpen={setModalOpen} status={ModalStatus ?? 1} title={ModalStatus == 0 ? t("Success message") : t("Error message")} text={ModalText} />
		</div>
	);
};

export default AnswerQuestion;
