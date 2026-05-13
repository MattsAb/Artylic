import { useEffect, useState } from "react"
import ImageComponent from "../components/ImageComponent"

import SimpleButton from "../components/simple_components/SimpleButton"
import { followUser, getUserProfile, unfollowUser } from "@artylic/api-client"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { useParams } from "react-router-dom";
import type { Profile } from "@artylic/types";

function UserProfile () {

    const [profile, setProfile] = useState<Profile>()
    const [followerCount, setFollowerCount] = useState(0);
    const [isfollowed, setIsFollowed] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { id } = useParams();

    useEffect(() => {
        async function getProfile () {
            if (!id) return
            const result = await getUserProfile(id);
            if (result.success && result.data) {
                setProfile(result.data)
                setFollowerCount(result.data._count.followers);
                if(result.data.followers.length > 0) setIsFollowed(true);
            }
            else {
                if (result.error)
                {
                    setErrorMessage(result.error)
                }
            }

        }
        getProfile()
    }, []) 

    async function handleFollow() {
        if (!id) return;
        let result;
        if( !isfollowed)
        {
            result = await followUser(id);
        } else {
            result = await unfollowUser(id);
        }

        if (result.success)
        {
            setIsFollowed(!isfollowed);
            isfollowed ? setFollowerCount(followerCount - 1) : setFollowerCount(followerCount + 1);
        }
        else if (result.error) {
            setErrorMessage(result.error)
        }
        
    }

    return (
        <div className="w-full flex flex-col">

            <div className="w-full dark:bg-mist-800 py-15 flex gap-10 shadow-2xl">
                <img src={profile?.avatarUrl ? profile.avatarUrl : undefined} className="w-30 h-30 rounded-full ml-18"/>
                <div className="flex flex-col gap-5 w-1/3">
                    <h1 className="font-bold text-2xl"> {profile?.username} </h1>
                    <p className="text-xl overflow-auto wrap-break-word"> {profile?.bio}</p>
                    <div className="flex gap-5 items-center">
                        <SimpleButton label={isfollowed ? "Unfollow" : "Follow"} onClick={() => handleFollow()}/>
                        <p> Followers: </p>
                        <p> {followerCount}</p>
                    </div>
                </div>
                <ErrorMessageComponent message={errorMessage}/>
            </div>

            <div className="w-2/3 dark:bg-mist-800 h-full self-center mt-10 p-10 rounded-2xl flex flex-col gap-10 shadow-2xl">
                <h1 className="font-bold text-2xl"> Posts </h1>
                <div className="columns-2 md:columns-3 lg:columns-5 gap-4 w-full">
                    { profile?.posts && (
                        profile.posts.map((post) => (
                            <ImageComponent 
                            key={post.id}
                            url={post.photoUrl}
                            username={post.user.username}
                            likes={post._count?.likes || 0}
                            id={post.id}
                            />
                        ))
                    )}
                        
                </div>
            </div>
        </div>
    )
}

export default UserProfile