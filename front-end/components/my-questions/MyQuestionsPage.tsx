import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header";
import MyQuestion from "./MyQuestion";

const MyQuestionsPage = () => {

    const { user } = useUser();
    const [data, setData] = useState<any>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchQuestionsByUser = () => {
            axios.post(`/api/getQuestionByUser/${user!.sub}`)
                .then((response) => setData(response.data))
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        }

        fetchQuestionsByUser();
    }, [user]);

    if (loading) {
        return <h1>Loading...</h1>
    } else if (error) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className='bg-gray-700 flex flex-col h-full'>

            <div className="flex flex-col flex-grow items-center p-4 bg-blue-500">
                <div className="flex flex-col flex-grow w-full max-w-sm">

                    <div className="flex flex-col py-1">
                        <div className="flex flex-col info-card p-4 items-center drop-shadow-lg">
                            <Header center text="Your questions" />
                        </div>
                    </div>

                    {
                        data.map((question: any, index: number) => (
                            <div key={index} className="flex flex-col py-1">
                                <div className="flex flex-row info-card items-center drop-shadow-lg">
                                    <MyQuestion question={question}/>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default MyQuestionsPage;