import { useAuthStore } from "@artylic/api-client";
import { useNavigate } from "react-router-dom";

type headerOptionsProps = {
    open: boolean
}

function HeaderOptionsComponent ({open}: headerOptionsProps) {

    const navigate = useNavigate();
    const {clearAuth, user} = useAuthStore();

    if (!open) return null;
    
    const goToProfile = () => navigate(`profile/${user?.id}`)

    return (
        <div className="absolute top-14 right-4 w-64 dark:bg-mist-800 py-3 px-5 rounded-xl z-50 flex flex-col">
            <button 
                className="hover:dark:bg-mist-700 text-left p-2 rounded-xl cursor-pointer"
                onClick={() => goToProfile()}
                > Profile </button>
            <button 
                className="hover:dark:bg-mist-700 text-left p-2 rounded-xl cursor-pointer mt-5"
                onClick={() => clearAuth()}
            > Sign Out </button>
        </div>
    )
}

export default HeaderOptionsComponent