import { useAuthStore } from "@artylic/api-client";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type headerOptionsProps = {
    open: boolean
    onClose: () => void
}

function HeaderOptionsComponent ({open, onClose}: headerOptionsProps) {

    const navigate = useNavigate();
    const {clearAuth, user} = useAuthStore();

     const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                console.log('aha')
                onClose()
            }
        }
        if (open) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    if (!open) return null;
    
    const goToProfile = () => navigate(`/profile/${user?.id}`);
    const goToEditProfile = () => navigate('/profile/edit');

    return (
        <div 
            className="absolute top-14 right-4 w-64 dark:bg-mist-800 py-3 px-5 rounded-xl z-50 flex flex-col shadow-2xl"
            ref={ref}
        >
            <button 
                className="hover:dark:bg-mist-700 text-left p-2 rounded-xl cursor-pointer"
                onClick={() => {
                    goToProfile()
                    onClose()
                }}
                > Profile </button>

            <button 
                className="hover:dark:bg-mist-700 text-left p-2 rounded-xl cursor-pointer"
                onClick={() => {
                    goToEditProfile()
                    onClose()
                }}
            > Edit Profile </button>
            
            <button 
                className="hover:dark:bg-mist-700 text-left p-2 rounded-xl cursor-pointer mt-5"
                onClick={() => {
                    clearAuth()
                    window.location.reload()
                }}
            > Sign Out </button>
        </div>
    )
}

export default HeaderOptionsComponent