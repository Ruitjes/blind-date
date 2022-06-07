import { NextPage } from "next";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import MyBookmarks from "../components/my-bookmarks/MyBookmarksPage";

const MyBookmarksPage: NextPage = () => {
    return <MyBookmarks />
}

export default withPageAuthRequired(MyBookmarksPage);