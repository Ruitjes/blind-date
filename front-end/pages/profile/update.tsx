import { NextPage } from "next";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import UpdateProfile from "../../components/profile/UpdateProfile";

const UpdateProfilePage: NextPage = () => {
    return <UpdateProfile />
}

export default withPageAuthRequired(UpdateProfilePage);