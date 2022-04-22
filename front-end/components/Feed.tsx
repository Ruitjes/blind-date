import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Question from './Question';
import Button from './Button';
import axios from 'axios';
import Banner from './Banner';

const Feed = () => {
	const { user } = useUser();
	const [showFullImage, setShowFullImage] = useState<boolean>();
	const [OutOfQuestions, SetOutOfQuestions] = useState<boolean>();
	const [CurrentQuestion, SetCurrentQuestion] = useState<any>(null);
	const [AnswerText, SetAnswerText] = useState('');

	// Report result
	const [reportResultMessage, setReportResultMessage] = useState('');
	const [reportResultInfo, setReportResultInfo] = useState('');

	useEffect(() => {
		// Fetch questions and set state
		document.title = 'Answer the question';
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
				if (res.data.content == '' || res.data.content == null) {
					SetOutOfQuestions(true);
				} else {
					SetOutOfQuestions(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const answerQuestion = () => {
		const data = {
			userProfile: {
				userId: user!.sub?.toString(),
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

	const handleAnswerTextChanged = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		SetAnswerText(e.target.value);
	};

	// Report question
	const reportQuestion = () => {
		const data = {
			reporter: {
				userId: user!.sub?.toString(),
				name: user!.nickname?.toString(),
			},
			reported: {
				userId: CurrentQuestion!.userIdentifier?.toString(),
				// TODO: send reported user name
				name: 'test name',
			},
			reportedContent: CurrentQuestion.content,
			post: {
				postId: CurrentQuestion.id?.toString(),
				postContent: CurrentQuestion.content,
			},
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
				<div className="flex flex-col flex-grow w-full max-w-sm">
					<div className="flex flex-col mt-4 mb-6">
						<div className="flex flex-col flex-grow p-4">
							<Question
								text={
									CurrentQuestion?.content ??
									'No questions, come back at a later time.'
								}
								onReportClick={reportQuestion}
							/>
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
									src={`https://seetrough.s3.eu-central-1.amazonaws.com/${CurrentQuestion.fileName}`}
								/>
							)}

							<textarea
								value={AnswerText}
								onChange={handleAnswerTextChanged}
								className="flex flex-grow resize-none rounded-lg text-2xl outline-none p-4"
								placeholder="Write something..."
								aria-label="Type your answer here"
								aria-required="true"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<div className="flex pt-4 mx-4 max-w-sm justify-between">
							<Button
								ariaLabel="Skip the question"
								icon="xmark"
								color="lightcoral"
								onClick={
									!OutOfQuestions
										? ProgressBookmark
										: () => {}
								}
							/>
							<Button
								ariaLabel="Reply the question"
								icon="reply"
								color="lightsteelblue"
								onClick={
									!OutOfQuestions ? answerQuestion : () => {}
								}
							/>
						</div>
					</div>
				</div>

				{/* Report result */}
				{reportResultMessage && (
					<Banner
						message={reportResultMessage}
						additionalInfo={reportResultInfo}
						onCloseClick={onBannerClose}
					/>
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
						src={`https://seetrough.s3.eu-central-1.amazonaws.com/${CurrentQuestion.fileName}`}
					/>
				</div>
			)}
		</div>
	);
};

export default Feed;
