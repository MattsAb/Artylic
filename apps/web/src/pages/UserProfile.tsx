import { useEffect, useState } from "react"
import ImageComponent from "../components/ImageComponent"

import SimpleButton from "../components/simple_components/SimpleButton"
import { followUser, getUserProfile, unfollowUser, useAuthStore } from "@artylic/api-client"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { useParams } from "react-router-dom";
import type { Profile } from "@artylic/types";
import defaultIcon from '../assets/new_artylic_user_Icon.png'
import ImageSkeleton from "../components/skeleton_components/ImageSKeleton";
import BannerSkeleton from "../components/skeleton_components/BannerSkeleton";

function UserProfile () {

    const [profile, setProfile] = useState<Profile>()
    const [ownProfile, setOwnProfile] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [isfollowed, setIsFollowed] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { id } = useParams();
    const {user} = useAuthStore();

    useEffect(() => {
        async function getProfile () {
            if (!id) return
            
            setOwnProfile(false)
            const result = await getUserProfile(id);

            if (result.success && result.data) {
                setProfile(result.data)
                setFollowerCount(result.data._count.followers);
                if(result.data.followers.length > 0) setIsFollowed(true);
                if(result.data.id == `${user?.id}`) setOwnProfile(true);
            }
            else {
                if (result.error)
                {
                    setErrorMessage(result.error)
                }
            }

        }
        getProfile()
    }, [id]) 

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
                {profile ? (<> <img src={profile?.avatarUrl ? profile.avatarUrl : defaultIcon} className="w-30 h-30 rounded-full ml-18"/>
                <div className="flex flex-col gap-5 w-1/3 justify-center">
                    <h1 className="font-bold text-2xl"> {profile?.username} </h1>
                    <div className="flex gap-5 items-center">
                        { !ownProfile && <SimpleButton label={isfollowed ? "Unfollow" : "Follow"} onClick={() => handleFollow()}/>}
                        <p className="font-bold text-2xl"> Followers: </p>
                        <p className="font-bold text-2xl"> {followerCount}</p>
                    </div>
                    <p className="overflow-auto wrap-break-word"> {profile?.bio}</p>
                </div>

                 </>) : (<BannerSkeleton/>)}
                <ErrorMessageComponent message={errorMessage}/>
            </div>

            <div className="w-full lg:w-3/4 md:w-4/5 dark:bg-mist-800 h-full self-center mt-10 p-10 rounded-2xl flex flex-col gap-10 shadow-2xl">
                <div className="flex gap-2 items-center font-bold text-2xl">
                    <h1> {[profile?._count.posts ]}</h1>
                    <h1> Posts </h1>
                </div>
                { profile?.posts ? (<div className="columns-2 md:columns-3 lg:columns-4 gap-4 w-full">
                    
                        {profile.posts.map((post) => (
                            <ImageComponent 
                            key={post.id}
                            url={post.photoUrl}
                            username={post.user.username}
                            likes={post._count?.likes || 0}
                            id={post.id}
                            />
                        ))}
                    
                </div>): (<ImageSkeleton load={true}/>)} 
            </div>
        </div>
    )
}

export default UserProfile