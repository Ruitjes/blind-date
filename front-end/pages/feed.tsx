import { NextPage } from "next";
import Feed from "../components/Feed";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const FeedPage: NextPage = () => {
    return <Feed />
}

export default withPageAuthRequired(FeedPage);