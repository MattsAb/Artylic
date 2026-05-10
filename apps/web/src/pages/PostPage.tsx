import { useState } from "react";
import CommentComponent from "../components/CommentComponent"
import { HandThumbUpIcon } from '@heroicons/react/16/solid';

import image5 from "../assets/pexels-nicole-avagliano-1132392-16354192.jpg"
import SimpleButton from "../components/simple_components/SimpleButton";



function PostPage () {

    const [commentMode, setCommentMode] = useState(false);

    return (
        <div className="w-2/3 shadow-2xl dark:shadow-none ml-18">
            <div className="p-10 dark:bg-mist-800 rounded-2xl flex flex-col gap-3"> 
                <img src={image5} className="w-full object-contain max-h-200" />

                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <h1> by: </h1>
                        <h2 className="font-bold text-xl">Someuser</h2>
                    </div>
                   <div className="flex gap-3 items-center"> 

                        <button className="dark:bg-mist-700 p-2 rounded-full items-center cursor-pointer">
                            <HandThumbUpIcon className="h-6 w-6"/> 
                        </button>

                        <h2 className="font-bold text-xl">123</h2>
                    </div>
                </div>

                <p> A random paragraph can also be an excellent way for a writer to tackle writers' block. Writing block can often happen due to being stuck with a current project that the writer is trying to complete. By inserting a completely random paragraph from which to begin, it can take down some of the issues that may have been causing the writers' block in the first place.
</p>
            </div>
            <div className="mt-10">
                <div className="dark:bg-mist-800 rounded-2xl p-5 flex flex-col gap-5">
                    <h1 className="text-2xl ml-5"> Leave a comment </h1>
                    <textarea 
                    onClick={() => setCommentMode(true)}
                    rows={commentMode ? 2 : 1} 
                    className="w-full p-3 border-b dark:border-mist-700 resize-none"/>
                    {commentMode && <div className="self-end flex gap-5 mr-5">
                        <SimpleButton label="Cancel" onClick={() => setCommentMode(false)}/>
                        <SimpleButton label="Comment" onClick={() => console.log("commented!")}/>
                    </div>}
                </div>

                <div className="mt-10">
                    <h1 className="text-2xl ml-5"> Comments </h1>
                    <div className="mt-10 flex flex-col gap-5 dark:bg-mist-800 rounded-2xl">
                        <CommentComponent username="Someuser" body="this is a test body for the test comment"/>
                        <CommentComponent username="Someuser" body="this is a test body for the test comment"/>
                        <CommentComponent username="Someuser" body="this is a test body for the test comment"/>
                        <CommentComponent username="Someuser" body="this is a test body for the test comment"/>
                        <CommentComponent username="Someuser" body="this is a test body for the test comment"/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default PostPage