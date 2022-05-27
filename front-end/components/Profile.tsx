import React, { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import axios from "axios";

export class Profile {
    oAuthIdentifier: string | null = null;
    name: string = "";
    gender: string = "";
    age: number = 0;
    language: string = "";
    interests: string[] = [];
}

const ProfileComponent = () => {
    const { user } = useUser(); 
    const [profile, SetProfile] = useState<Profile>(new Profile());
    const [newInterest, setNewInterest] = useState<string>("");
    const [HasProfile, SetHasProfile] = useState<boolean>();

    useEffect(() => {
        document.title = "Configure profile"
       getProfileOfUser();
    }, [user]);

    const getProfileOfUser = () => {
        if(user != null)
       {
            axios.get<Profile>('api/profileService/getProfile/').then((response: any) => {
                if (response.data == "" || response.data == null) { 
                     SetHasProfile(false);    
                } 
                else {  
                    SetProfile(response.data); 
                    SetHasProfile(true);
                }   
                }).catch((err) => { console.log(err); });
        }
    };

    const CreateProfileOfUser = () => {
        const data = {
              "oAuthIdentifier": user!.sub?.toString(),
              "name":profile.name,
              "gender": profile.gender,
              "age": profile.age,
              "interests": profile.interests,
              "language": profile.language
        };
        axios.post('api/profileService/createProfile', data).then((res: any) => {
            SetProfile(res.data);
            window.location.reload();
        }).catch((err) => { console.log(err); });
    };

    const UpdateProfileOfUser = () => {
        const data = {
              "oAuthIdentifier": user!.sub?.toString(),
              "name":profile.name,
              "gender": profile.gender,
              "age": profile.age,
              "interests": profile.interests,
              "language": profile.language
        };
        axios.put('api/profileService/updateProfile', data).then((res: any) => {
            SetProfile(res.data);
            window.location.reload();
        }).catch((err) => { console.log(err); });
    };
    
    return (
        <div className='bg-blue-200 flex flex-col h-full'>
   <div className="container rounded bg-blue-100 mt-10">
    <div className="row">
        <div className="mt-5 text-center">
           Hi {profile.name}!
            <div className="p-3 py-5">
            {HasProfile ? 
                (   <h1>Edit your profile</h1>) : 
                (   <h1>Add your profile information</h1>)}
                 
                <div className="row mt-2">
                    <div className="col-md-6"><b><p>Name</p> </b>
                    </div>
                    <input id="nameinput" placeholder="Name" aria-required="true" value={profile.name} onChange={(e) => {SetProfile({...profile, name: e.target.value}) }} />
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><b><p>Gender</p></b>
                    </div>
                    <input id="genderinput" placeholder="Gender" aria-required="true" value={profile.gender} onChange={(e) => {SetProfile({...profile, gender: e.target.value}) }}/> 
                    <div className="col-md-12"><b><p>Age</p></b></div>
                    <input id="ageinput" type="number" placeholder="Age" aria-required="true" value={profile.age} onChange={(e) => {SetProfile({...profile, age: Number(e.target.value)}) }}/> 
                    <div className="col-md-12"><b><p>Language</p></b></div>
                    <select name="language" id="language"  value={profile.language} onChange={(e) => {SetProfile({...profile, language: e.target.value}) }}>
                    <option value="">None</option>
                    <option value="english">English</option>
                    <option value="dutch">Dutch</option>
                    </select>            
                </div>
                <div className="col-md-12"><b><p>Interests</p> </b> </div>
                <ul>
                    {profile.interests.map((interest,id) => {
                        return <li key={id} id={interest}>{interest}</li>
                    })}
                </ul>
                <input id="interestsinput" placeholder="Add interest" value={newInterest} onChange={(e) => { setNewInterest(e.target.value) }}/>
                <div className="mt-5 text-center"><button className="btn btn-primary" type="button" onClick={() => SetProfile({...profile, interests: [...profile.interests, newInterest]})}>Add interest</button></div>

                <div className="mt-5 text-center">
                {HasProfile ? 
                (<button className="btn btn-primary" type="button" onClick={UpdateProfileOfUser}>Save Profile</button>) : 
                (<button className="btn btn-primary" type="button" onClick={CreateProfileOfUser}>Save Profile</button>)}
                    </div>
            </div>
        </div>
    
    </div>
</div>
</div>
    );
 };

export default ProfileComponent;