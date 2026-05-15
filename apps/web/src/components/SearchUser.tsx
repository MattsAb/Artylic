import { useNavigate } from "react-router-dom"
import defaultIcon from "../assets/new_artylic_user_Icon.png"

type SreachUserProps = {
    username: string
    id: number
    postCount: number
    followerCount: number
    avatar?: string
}

function SearchUser ({username, id, postCount, followerCount, avatar}: SreachUserProps) {

    const navigate = useNavigate();

    const goToProfile = () => navigate(`/profile/${id}`)

    return (
        <button 
            className="flex dark: dark:bg-mist-800 dark:shadow-black bg-gray-100 shadow-gray-400 px-10 py-5 rounded-2xl cursor-pointer items-center gap-10 text-left"
            onClick={() => goToProfile()}
        >
            <img 
                className="w-20 h-20 rounded-full"
                src={avatar ? avatar : defaultIcon}
            />
            <div>
                <h1 className="text-2xl font-bold"> {username} </h1>
                <div>
                    <div className="flex gap-3">
                        <p> Followers: </p>
                        <h2> {followerCount} </h2>
                    </div>

                    <div className="flex gap-3">
                        <p> Posts: </p>
                        <h3> {postCount} </h3>
                    </div>

                </div>
            </div>
        </button>
    )

}

export default SearchUser