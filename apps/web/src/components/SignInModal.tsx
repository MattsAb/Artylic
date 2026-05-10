import { useState } from "react";
import { login } from "@artylic/api-client";

import GoogleButton from "./simple_components/googleSIgnIn/GoogleButton";

type SignInModalProps = {
    open: boolean
    onClose: () => void
}

function SignInModal({open, onClose}: SignInModalProps) {



    if (!open) return null

    const [isSigned, setIsSigned] = useState(true);

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
                className="w-full px-4 py-2 border rounded-lg mb-3 dark:border-slate-700" 
                />
            }

            <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg mb-3 border-slate-700"
            />
            
            <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg mb-6 border-slate-700" 
            />
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
                onClick={() => login()}
            >
                {isSigned ? "Log in" : "Sign in"}
            </button>
        </div>
        </div>
    )
}

export default SignInModal

