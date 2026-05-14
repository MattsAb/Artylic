import type { Follow } from '@artylic/types';
import { HomeIcon, HandThumbUpIcon} from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';

import { getFollows, useAuthStore } from '@artylic/api-client';
import { useNavigate } from 'react-router-dom';
import SimpleSidebarButton from './SimpleSIdebarButton';
import SidebarFollowedComponent from './SidebarFollowedComponent';

type sidebarProps = {
    isOpen: boolean
}


function Sidebar({isOpen}: sidebarProps) {

    const [follows, setFollows] = useState<Follow[]>()

    const {user} = useAuthStore()
    const navigate = useNavigate();

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
                console.log('ay')
            } else if (result.error) {
                console.log('failed to fetch follows')
            }
        }
        fetchFollows();
    },[user?.id])

    const goToFollow = (id: number) => navigate(`/profile/${id}`)
    const goToProfile = () => navigate(`/profile/${user?.id}`) 

    return (
        <div className={`sticky top-0 h-screen pt-14 bg-mist-900 ${isOpen ?`lg:w-70 md:w-25` : `w-25 `} 
            z-40 dark:text-white  flex-col items-center gap-3 border-r  border-mist-700
            hidden sm:flex 
            `}>
            <div className='mt-5 items-center flex flex-col w-full'>

                <div className='border-b border-mist-700 w-full flex flex-col justify-center items-center gap-3 pb-5'>
                    <SimpleSidebarButton
                        label='Your profile'
                        icon={HomeIcon}
                        handleRedirect={() => goToProfile()}
                        isOpen={isOpen}
                    />
                    <SimpleSidebarButton
                        label='Liked posts'
                        icon={HandThumbUpIcon}
                        handleRedirect={() => goToProfile()}
                        isOpen={isOpen}
                    />
                </div>


                <div className='p-5 w-full flex justify-baseline flex-col border-b dark:border-mist-700'>
                    <SidebarFollowedComponent
                        isOpen={isOpen}
                        follows={follows ? follows : []}
                        handleRedirect={(id) => goToFollow(id)}
                    />
                </div>
                
            </div>



        </div>
    )

} 
export default Sidebar;