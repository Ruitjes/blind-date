import { NextPage } from "next";
import MyQuestions from "../components/my-questions/MyQuestionsPage";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const MyQuestionsPage: NextPage = () => {
    return <MyQuestions />
}

export default withPageAuthRequired(MyQuestionsPage);