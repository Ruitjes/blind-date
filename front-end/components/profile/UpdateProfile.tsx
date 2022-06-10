import { useProfile } from "../../hooks/useProfile";

const UpdateProfile = () => {
    const { profile } = useProfile();
    return <h1>Update Profile</h1>
}

export default UpdateProfile;