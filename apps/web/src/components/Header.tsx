import { useState } from "react"
import SignInModal from "./SignInModal"
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useAuthStore } from "@artylic/api-client";
import defaultICon from '../assets/icons8-male-user-30.png';
import HeaderOptionsComponent from "./simple_components/HeaderOptionsComponent";

function Header() {

    const [open, setOpen] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthStore()

    const goBack = () => navigate('/');
    const goToCreate = () => navigate('/create');

  return (
    <div className="fixed left-0 right-0 text-black dark:text-white dark:bg-mist-900 bg-gray-50 h-14 flex ">
        <div className="flex w-full items-center ml-5">
            <button 
            className="font-bold text-2xl cursor-pointer" 
            onClick={() => goBack()}
            > Artylic </button>
        </div>

        <div className="flex w-full items-center justify-center">

            <input className="border dark:border-mist-800 border-mist-300 bg-white dark:bg-mist-900 w-full h-10 items-center rounded-3xl px-5"
            placeholder="Search"
            />

            <button className="ml-2 hover:cursor-pointer items-center dark:border p-2 rounded-full border-mist-800 hover:dark:bg-mist-800 hover:bg-gray-200"> 
                <MagnifyingGlassIcon className="h-6 w-6"/>
            </button>
        </div>

        <div className="flex w-full items-center justify-end mr-5 gap-5">

            
            { !isAuthenticated ? ( <button 
            className="font-bold cursor-pointer"
            onClick={() => setOpen(true)}
            > Sign In </button> ) : (
            <> 
                <button
                className="font-bold cursor-pointer"
                onClick={() => goToCreate()}
                > Create </button>

                <button className="rounded-full p-1 bg-white items-center cursor-pointer"
                    onClick={() => setOpenOptions(!openOptions)}
                >
                    <img src={user?.avatarUrl ? user.avatarUrl : defaultICon}/>
                </button>
                <HeaderOptionsComponent open={openOptions}/>
            </>
            )}
        </div>
            <SignInModal open={open} onClose={() => setOpen(false)}/>
    </div>
  )

}

export default Header