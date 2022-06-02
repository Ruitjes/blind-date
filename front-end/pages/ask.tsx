import { NextPage } from "next";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AskQuestionPage from "../components/questions-ask/AskQuestionPage";

const AskPage: NextPage = () => {
    return <AskQuestionPage />
}

export default withPageAuthRequired(AskPage);