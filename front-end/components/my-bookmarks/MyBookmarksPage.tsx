import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Header from "../Header";
import MyBookmarks from "./MyBookmarks";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton";
import Suppress from "../Suppress";

const MyQuestionsPage = () => {

    const router = useRouter();
    const { user } = useUser();
    const [data, setData] = useState<any>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {

        const fetchSavedQuestionsByUser = () => {

            axios.post(`/api/getSavedQuestionsByUser/${user!.sub}`)
                .then((response) => {setData(response.data); console.log(response.data); })
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        }

        fetchSavedQuestionsByUser();
    }, [user]);

    return (
        <div className='bg-gray-700 flex flex-col h-full'>
            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <Suppress cssOverride="bg-black/50">
                    <BackButton navPage="/" />
                    <div className="flex flex-col flex-grow w-full max-w-sm">

                        <div className="flex flex-col py-1">
                            <div className="flex flex-col info-card p-4 items-center drop-shadow-lg">
                                <Header center text={t("Your bookmarks")} />
                            </div>
                        </div>

                        {
                            data && data.map((question: any, index: number) => {
                                return (
                                    <div key={index} className="flex flex-col py-1">
                                        <div className="flex flex-row info-card items-center drop-shadow-lg">
                                            <MyBookmarks question={question} onClick={() => {router.push(`answer-question/${question?.id?.toString()}`)}}/>
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

            { error && (
                <div className="absolute flex justify-center items-center inset-0 bg-black/50">
                    <h1 className="text-white">{error.message}</h1>
                </div>
            )}

        </div>
    )
}

export default MyQuestionsPage;