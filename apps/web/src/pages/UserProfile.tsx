import { useEffect, useState } from "react"
import ImageComponent from "../components/ImageComponent"

import SimpleButton from "../components/simple_components/SimpleButton"
import { followUser, getUserProfile, unfollowUser } from "@artylic/api-client"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { useParams } from "react-router-dom";
import type { Post } from "@artylic/types";


function UserProfile () {

    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [followerCount, setFollowerCount] = useState(0);
    const [isfollowed, setIsFollowed] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { id } = useParams();

    useEffect(() => {
        async function getProfile () {
            if (!id) return
            const result = await getUserProfile(id);
            if (result.success && result.data) {
                setUsername(result.data.username)
                setAvatar(result.data.avatarUrl ?? '')
                setBio(result.data.bio ?? '')
                setUserPosts(result.data.posts);
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
                <img src={avatar} className="w-30 h-30 rounded-full ml-18"/>
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold text-2xl"> {username} </h1>
                    <p className="text-xl"> {bio}</p>
                    <p> {followerCount}</p>
                    <SimpleButton label={isfollowed ? "Followed" : "Follow"} onClick={() => handleFollow()}/>
                </div>
                <ErrorMessageComponent message={errorMessage}/>
            </div>

            <div className="w-2/3 dark:bg-mist-800 h-full self-center mt-10 p-10 rounded-2xl flex flex-col gap-10 shadow-2xl">
                <h1 className="font-bold text-2xl"> Posts </h1>
                <div className="columns-2 md:columns-3 lg:columns-5 gap-4 w-full">
                    { userPosts && (
                        userPosts.map((post) => (
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