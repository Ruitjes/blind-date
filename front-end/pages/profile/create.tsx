import { NextPage } from "next";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CreateProfile from "../../components/profile/CreateProfile";

const CreateProfilePage: NextPage = () => {
    return <CreateProfile />
}

export default withPageAuthRequired(CreateProfilePage);