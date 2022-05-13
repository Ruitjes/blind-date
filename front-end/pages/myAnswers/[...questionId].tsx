import { NextPage } from "next";
import { useRouter } from "next/router";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import MyAnswers from '../../components/my-questions/MyAnswersPage';

const MyAnswerPage: NextPage = () => {
    const router = useRouter();
    const { questionId }: any = router.query;
    return <MyAnswers question={{ id: questionId }} />
}

export default withPageAuthRequired(MyAnswerPage);