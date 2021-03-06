import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Header from "../Header";
import MyQuestion from "./MyQuestion";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton";
import Suppress from "../Suppress";

const MyQuestionsPage = () => {

    const router = useRouter();
    const { user, checkSession } = useUser();
    const [data, setData] = useState<any>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {

        // Do some user stuff
        checkSession();
        if (user != undefined) {
            const profileCreated = user.nickname;
            if (profileCreated != "True") {
                // Stans modal here
                // router.push('/profile');
            }
        }

        const fetchQuestionsByUser = () => {

            axios.post(`/api/getQuestionByUser/${user!.sub}`)
                .then((response) => setData(response.data))
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        }

        fetchQuestionsByUser();
    }, []);

    return (
        <div className='bg-gray-700 flex flex-col h-full'>
            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <Suppress cssOverride="bg-black/50">
                    <BackButton navPage="/" />
                    <div className="flex flex-col flex-grow w-full max-w-sm">

                        <div className="flex flex-col py-1">
                            <div className="flex flex-col info-card p-4 items-center drop-shadow-lg">
                                <Header center text={t("Your questions")} />
                            </div>
                        </div>

                        {
                            data && data.map((question: any, index: number) => {

                                const handleQuestionPressed = () => {
                                    router.push(`/myAnswers/${question.id}`)
                                }

                                return (
                                    <div key={index} className="flex flex-col py-1">
                                        <div className="flex flex-row info-card items-center drop-shadow-lg">
                                            <MyQuestion question={question} onClick={handleQuestionPressed} />
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </Suppress>
            </div>

            {loading && (
                <div className="absolute flex justify-center items-center inset-0 bg-black/50">
                    <Loading />
                </div>
            )}

            {error && (
                <div className="absolute flex justify-center items-center inset-0 bg-black/50">
                    <h1 className="text-white">{error.message}</h1>
                </div>
            )}

        </div>
    )
}

export default MyQuestionsPage;