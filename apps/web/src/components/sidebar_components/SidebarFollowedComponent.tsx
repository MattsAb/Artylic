import type { Follow } from "@artylic/types"
import { PaperClipIcon } from "@heroicons/react/16/solid"
import defaultIcon from "../../assets/new_artylic_user_Icon.png"

type SidebarFollowedProps = {
    isOpen: boolean
    follows: Follow[]
    handleRedirect: (id: number) => void
}

function SidebarFollowedComponent ({isOpen, follows, handleRedirect}: SidebarFollowedProps) {

    return (
        <>
            <button className={`hover:bg-mist-800 px-5 py-2 ${ isOpen ? `py-2` : 'py-5'} rounded-2xl  cursor-pointer flex items-center gap-2`}> 
                <PaperClipIcon className='w-6 h-6'/>
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