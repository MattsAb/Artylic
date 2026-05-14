import type { User } from "@artylic/types"
import { useEffect, useState } from "react"
import SearchUser from "../components/SearchUser";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { getSearchUsers } from "@artylic/api-client";
import { useSearchParams } from "react-router-dom";

function SearchPage () {

    const [users, setUsers] = useState<User[]>();
    const [errorMessage, setErrorMessage] = useState('');

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q');

    useEffect(() => {
        async function fetchUsers () {
            if (!query) return;
            console.log(query)
            const result = await getSearchUsers(query);
            if (result.success && result.data)
            {
                setUsers(result.data);
            } else if (result.error) {
                setErrorMessage(result.error);
            }
        }
        fetchUsers()
    },[query])

    return (
        <div className="flex justify-center mt-5">
            <div className="flex flex-col gap-5 lg:w-1/2 w-full border-x px-10 border-mist-700">
                <div className="flex gap-3 text-2xl mt-5">
                    <h1> Users by:</h1>
                    <h2 className="font-bold">{query}</h2>
                </div>
                <ErrorMessageComponent message={errorMessage}/>
            {users && (
                users.map((user) => (
                <SearchUser
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    avatar={user.avatarUrl || undefined}
                    postCount={user._count?.posts || 0}
                    followerCount={user._count?.followers || 0}
                />

            )))}
            </div>
        </div>
    )
}

export default SearchPage