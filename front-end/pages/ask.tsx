import { NextPage } from "next";
import Ask from "../components/Ask";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const AskPage: NextPage = () => {
    return <Ask />
}

export default withPageAuthRequired(AskPage);