import { NextPage } from "next";
import Profile from "../components/Profile";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const ProfilePage: NextPage = () => {
    return <Profile />
}
export default withPageAuthRequired(ProfilePage);
