import { useState } from "react";
import { login, register } from "@artylic/api-client";
import { useAuthStore } from "@artylic/api-client";

import GoogleButton from "./simple_components/googleSIgnIn/GoogleButton";
import ErrorMessageComponent from "./simple_components/ErrorMessageComponent";

type SignInModalProps = {
    open: boolean
    onClose: () => void
}

function SignInModal({open, onClose}: SignInModalProps) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigned, setIsSigned] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { setAuth } = useAuthStore()

    if (!open) return null

    async function handleLogin () {

        let result;
        if (isSigned) {
            result = await login({ email, password })
        }
        else
        {
            result = await register({username, email, password})
        }

        if (result.success && result.data) {
            console.log(result.data.user)
            setAuth(result.data.user, result.data.token);
            onClose();
        } else {
            if (result.error)
            {
                console.log(result.error)
                setErrorMessage(result.error)
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className=" dark:bg-mist-900 bg-gray-50 rounded-xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{isSigned ? "Log in" : "Sign in"}</h2>
                <button 
                className="rounded-full dark:bg-mist-800 px-2 cursor-pointer"
                onClick={onClose}
                > x </button>
            </div>

            {
                !isSigned && <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(v) => setUsername(v.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mb-3 dark:border-slate-700" 
                />
            }

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(v) => setEmail(v.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-3 border-slate-700"
            />
            
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(v) => setPassword(v.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-6 border-slate-700" 
            />

            <ErrorMessageComponent message={errorMessage}/>
            
            <div className="w-full flex justify-end items-center">
                <GoogleButton/>
            </div>
            
            <button 
            className="text-blue-400 active:text-blue-300 mb-4 cursor-pointer"
            onClick={() => setIsSigned(!isSigned)}
            >
                Don't have an account?
            </button>
            <button 
                className="w-full bg-sky-500 active:bg-sky-400 text-white py-2 rounded-lg font-medium cursor-pointer"
                onClick={() => handleLogin()}
            >
                {isSigned ? "Log in" : "Sign in"}
            </button>
        </div>
        </div>
    )
}

export default SignInModal

