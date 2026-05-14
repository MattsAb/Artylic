import { useRef, useState } from "react"
import SignInModal from "./SignInModal"
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/16/solid';
import { useAuthStore } from "@artylic/api-client";
import defaultICon from '../assets/new_artylic_user_Icon.png';
import HeaderOptionsComponent from "./simple_components/HeaderOptionsComponent";

type headerProps = {
    setSidebarOpen: () => void;
}

function Header({setSidebarOpen}: headerProps) {

    const [signInOpen, setSignInOpen] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthStore()

    const goBack = () => navigate('/');
    const goToCreate = () => navigate('/create');
    const goToSearch = () => navigate(`/search?q=${searchInput}`);

  return (
    <div className="fixed left-0 right-0 text-black dark:text-white dark:bg-mist-900 bg-gray-50 h-14 flex z-50 border-b border-mist-700">
        <div className="flex w-full items-center ml-5 gap-4">
            <button 
                className="hover:bg-mist-700 w-10 h-10 rounded-full p-1 items-center cursor-pointer"
                onClick={setSidebarOpen}
            >
                <Bars3Icon/>
            </button>
            <button 
            className="font-bold text-2xl cursor-pointer" 
            onClick={() => goBack()}
            > Artylic </button>
        </div>

        <div className="flex w-full items-center justify-center">

            <input className="border dark:border-mist-800 border-mist-300 bg-white dark:bg-mist-900 w-full h-10 items-center rounded-3xl px-5"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <button 
                className="ml-2 hover:cursor-pointer items-center dark:border p-2 rounded-full border-mist-800 hover:dark:bg-mist-800 hover:bg-gray-200"
                onClick={() => goToSearch()}
            > 
                <MagnifyingGlassIcon className="h-6 w-6"/>
            </button>
        </div>

        <div className="flex w-full items-center justify-end mr-5 gap-5">

            
            { !isAuthenticated ? ( <button 
                className="font-bold cursor-pointer"
                onClick={() => setSignInOpen(true)}
            > Sign In </button> ) : (
            <> 
                <button
                    className="font-bold cursor-pointer"
                    onClick={() => goToCreate()}
                > Create </button>

                <button className="rounded-full bg-white items-center cursor-pointer"
                    onClick={() => {
                        setOpenOptions(!openOptions)
                    }}
                >
                    <img src={user?.avatarUrl ? user.avatarUrl : defaultICon} className="rounded-full w-10 h-10"/>
                </button>

                <HeaderOptionsComponent 
                    onClose={() => setOpenOptions(false)}
                    open={openOptions}
                />
            </>
            )}
        </div>
            <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)}/>
    </div>
  )

}

export default Header