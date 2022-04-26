import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

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
        <h1>{JSON.stringify(data)}</h1>
    )
}

export default MyQuestionsPage;