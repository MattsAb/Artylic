import { useEffect, useState } from "react"
import ImageComponent from "../components/ImageComponent"

import SimpleButton from "../components/simple_components/SimpleButton"
import { getUserProfile } from "@artylic/api-client"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { useParams } from "react-router-dom";


function UserProfile () {

    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { id } = useParams();

    useEffect(() => {
        async function getProfile () {
            if (!id) return
            const result = await getUserProfile(id);
            if (result.success && result.data) {
                setUsername(result.data.username)
                setAvatar(result.data.avatarUrl ?? '')
                setBio(result.data.bio ?? '')
            }
            else {
                if (result.error)
                {
                    console.log(result.error)
                    setErrorMessage(result.error)
                }
            }

        }
        getProfile()
    }, []) 

    return (
        <div className="w-full flex flex-col">

            <div className="w-full dark:bg-mist-800 py-15 flex gap-10 shadow-2xl">
                <div className="w-30 h-30 bg-slate-400 rounded-full ml-18"/>
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold text-2xl"> {username} </h1>
                    <p className="text-xl"> {bio}</p>
                    <SimpleButton label="Follow" onClick={() => console.log("followed!")}/>
                </div>
                <ErrorMessageComponent message={errorMessage}/>
            </div>

            <div className="w-2/3 dark:bg-mist-800 h-full self-center mt-10 p-10 rounded-2xl flex flex-col gap-10 shadow-2xl">
                <h1 className="font-bold text-2xl"> Posts </h1>
                <div className="columns-2 md:columns-3 lg:columns-5 gap-4 w-full">

                </div>
            </div>
        </div>
    )
}

export default UserProfile