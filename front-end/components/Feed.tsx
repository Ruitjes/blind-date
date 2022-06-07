import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Question from './Question';
import Button from './Button';
import axios from 'axios';
import Banner from './Banner';
import Loading from './Loading';
import { useTranslation } from 'react-i18next';
import BackButton from './BackButton';
import { useRouter } from 'next/router';

const Feed = () => {
	const router = useRouter();
	const { user,checkSession } = useUser();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(true);

	const [showFullImage, setShowFullImage] = useState<boolean>();
	const [OutOfQuestions, SetOutOfQuestions] = useState<boolean>();
	const [CurrentQuestion, SetCurrentQuestion] = useState<any>(null);
	const [AnswerText, SetAnswerText] = useState('');

	// Report result
	const [reportResultMessage, setReportResultMessage] = useState('');
	const [reportResultInfo, setReportResultInfo] = useState('');

	const { t } = useTranslation();

	useEffect(() => {
		document.title = 'Answer the question';

		// Do some user stuff
		checkSession();
		if(user != undefined)
		{
			const profileCreated = user.nickname;
			if(profileCreated != "True")
			{
				// Stans modal here
				// router.push('/profile');
			}
		}
		
		// Fetch questions and set state
		getQuestion();
	}, []);

	const ProgressBookmark = () => {
		axios
			.get(`api/progressUserBookmark/${user!.sub}`)
			.then((res: any) => {
				SetAnswerText('');
				getQuestion();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getQuestion = () => {
		axios
			.get(`api/getQuestionForUser/${user!.sub}`)
			.then((res: any) => {
				SetCurrentQuestion(res.data);
				SetOutOfQuestions(!res.data.content)
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
			content: AnswerText,
			questionId: CurrentQuestion.id?.toString(),
		};

		axios
			.post('/api/answerQuestion', data)
			.then((res: any) => {
				SetAnswerText('');
				ProgressBookmark();
			})
			.catch((err) => {
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
				id: CurrentQuestion.id?.toString(),
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
				<BackButton navPage='/' />
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
                                disabled={loading ? true : false}
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
								onClick={
									!OutOfQuestions
										? ProgressBookmark
										: () => { }
								} />
							<Button
								ariaLabel={t("Reply to the question")}
								icon="reply"
								color="lightsteelblue"
                                disabled={loading ? true : false}
								onClick={!OutOfQuestions ? answerQuestion : () => { }} />
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
		</div>
	);
};

export default Feed;
