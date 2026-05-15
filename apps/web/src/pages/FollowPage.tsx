import { getFollows, useAuthStore } from "@artylic/api-client";
import type { Follow } from "@artylic/types";
import { useEffect, useState } from "react";
import SearchUser from "../components/SearchUser";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";


function FollowPage () {

    const [follows, setFollows] = useState<Follow[]>()
    const [errorMessage, setErrorMessage] = useState('');

    const {user} = useAuthStore();

    useEffect(() => {
        async function fetchFollows() {
            if (!user?.id) {
                setFollows(undefined)
                return;
            }
            const result = await getFollows(`${user.id}`)

            if(result.success && result.data)
            {
                setFollows(result.data);
            } else if (result.error) {
                setErrorMessage(result.error)
            }
        }
        fetchFollows();
    },[user?.id])

    return (

        <div className="flex justify-center mt-5">
            <div className="flex flex-col gap-5 lg:w-1/2 w-full  border-x px-10 border-mist-700">
                <div className="flex gap-3 text-2xl mt-5">
                    <h1> {follows?.length ? `People you follow` : "No following users"} </h1>
                </div>
            
                <ErrorMessageComponent message={errorMessage}/>

                {follows && follows.map((user) => (
                    <SearchUser
                        key={user.id}
                        id={user.followed.id}
                        username={user.followed.username}
                        avatar={user.followed.avatarUrl || undefined}
                        postCount={user.followed._count?.posts|| 0}
                        followerCount={user.followed._count?.followers|| 0}
                    />
                ))}
            </div>
        </div>
    )
}

export default FollowPage