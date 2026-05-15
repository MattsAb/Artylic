import { getLikedPosts, useAuthStore } from "@artylic/api-client";
import type { Post } from "@artylic/types";
import { useEffect, useState } from "react"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import LikedPostComponent from "../components/LikedPostComponent";


function LikedPosts () {

    const {user} = useAuthStore();

    const [likedPosts, setLikedPosts] = useState<Post[]>();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function fetchLikes () {

            const result = await getLikedPosts(`${user?.id}`);

            if (result.success && result.data) {
                setLikedPosts(result.data)
            } else if (result.error) {
                setErrorMessage(result.error);
            }

        }
        fetchLikes()
    },[])

    return (
        <div className="w-full flex justify-center">
            <div className="w-2/3 p-10 px-10 border-x border-mist-700">
                <h1 className="text-2xl font-bold mb-5"> Your Liked Posts </h1>
                <div className="break-inside-avoid columns-1 lg:columns-2 gap-4">
                    <ErrorMessageComponent message={errorMessage}/>
                    {likedPosts && (
                        likedPosts.map((post) => (
                            <LikedPostComponent
                                key={post.id}
                                id={post.id}
                                photoUrl={post.photoUrl}
                                user={post.user}
                                likes={post._count?.likes || 0}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
export default LikedPosts