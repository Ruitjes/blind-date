import { NextPage } from "next";
import { useProfile } from "../hooks/useProfile";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CreateProfile from "../components/profile/CreateProfile";
import UpdateProfile from "../components/profile/UpdateProfile";

const ProfilePage: NextPage = () => {

    const { error } = useProfile();
    
    if (error) {
        if (error.response?.status === 404) {
            return <CreateProfile />
        } else {
            return <h1>{error.message}</h1>
        }
    } else {
        return <UpdateProfile />
    }
}

export default withPageAuthRequired(ProfilePage);