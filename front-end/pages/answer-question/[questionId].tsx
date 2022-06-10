import { NextPage } from "next";
import { useRouter } from "next/router";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AnswerQuestion from "../../components/my-bookmarks/AnswerQuestion";

const AnswerQuestionPage: NextPage = () => {
    const router = useRouter();
    const { questionId }: any = router.query;
    return <AnswerQuestion question={{ id: questionId }} />
}

export default withPageAuthRequired(AnswerQuestionPage);