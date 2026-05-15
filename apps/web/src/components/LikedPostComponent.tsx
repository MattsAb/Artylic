import { HandThumbUpIcon } from "@heroicons/react/24/solid"
import type { User } from "../../../../packages/types/src/lib/user"
import defaultIcon from "../assets/new_artylic_user_Icon.png"
import { useNavigate } from "react-router-dom"


type LikedPostProps = {
    id: number
    photoUrl: string
    likes: number
    user: User
}

function LikedPostComponent ({photoUrl, likes, user, id}: LikedPostProps) {

    const navigate = useNavigate();

    const handleRedirect = () => navigate(`/post/${id}`)

    return (
        <button 
            className="cursor-pointer flex flex-col mb-5 shadow-2xl dark:bg-mist-800 
            hover:dark:bg-mist-700 transition-colors duration-100 ease-in-out"
            onClick={() => handleRedirect()}
         >
            <img src={photoUrl}/>
            <div className="py-4 w-full pl-5 flex items-center gap-5 ">
                <img 
                    className="w-15 h-15 rounded-full"
                    src={user.avatarUrl ? user.avatarUrl : defaultIcon}
                />
                <h1 className="font-bold"> {user.username} </h1>
                <div className="ml-auto flex items-center gap-2 pr-5">
                    <HandThumbUpIcon className="w-6 h-6"/>
                    <h2 className="font-bold"> {likes} </h2>
                </div>
            </div>
        </button>
    )
}
export default LikedPostComponent