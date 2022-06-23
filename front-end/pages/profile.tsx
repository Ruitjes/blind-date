import { NextPage } from "next";
import { useProfile } from "../hooks/useProfile";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CreateProfile from "../components/profile/CreateProfile";
import UpdateProfile from "../components/profile/UpdateProfile";

const ProfilePage: NextPage = () => {

    const { profile, error } = useProfile();

    if (error) {
        return <h1>{error.message}</h1>
    } else if (profile === null) {
        return <CreateProfile />  
    } else {
        return <UpdateProfile />
    }
}

export default withPageAuthRequired(ProfilePage);