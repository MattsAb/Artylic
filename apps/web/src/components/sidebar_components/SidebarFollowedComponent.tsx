import type { Follow } from "@artylic/types"
import { BookmarkIcon } from "@heroicons/react/16/solid"
import defaultIcon from "../../assets/new_artylic_user_Icon.png"
import { useNavigate } from "react-router-dom"

type SidebarFollowedProps = {
    isOpen: boolean
    follows: Follow[]
    handleRedirect: (id: number) => void
}

function SidebarFollowedComponent ({isOpen, follows, handleRedirect}: SidebarFollowedProps) {

    const navigate = useNavigate();

    const goToFollowers = () => navigate('/follows')

    return (
        <>
            <button 
                className={`hover:bg-mist-200 darkhover:bg-mist-800 justify-center self-center ${ isOpen ? `w-full lg:py-2 py-5` : 'w-3/4 py-5'} rounded-2xl cursor-pointer flex items-center gap-3`}
                onClick={() => goToFollowers()}
            > 
                <BookmarkIcon className='w-6 h-6'/>
                {isOpen && <h1 className="hidden lg:flex">People you follow</h1>}
            </button>

            { isOpen && <div className='mt-5 hidden lg:flex flex-col gap-3'>
                {follows && isOpen &&
                    follows.map((follow) => (
                        <button 
                            onClick={() => handleRedirect(follow.followedId)}
                            key={follow.id}
                            className='cursor-pointer flex gap-4 hover:dark:bg-mist-700 rounded-2xl p-1'
                        >
                            <img 
                                className='w-8 h-8 rounded-full'
                                src={follow.followed.avatarUrl ? follow.followed.avatarUrl : defaultIcon}
                            />
                            <h1> {follow.followed.username} </h1>
                        </button>
                    ))
                }
            </div>}
        </>
    )
}

export default SidebarFollowedComponent