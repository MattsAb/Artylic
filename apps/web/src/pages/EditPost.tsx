import { useEffect, useRef, useState } from "react";
import SimpleButton from "../components/simple_components/SimpleButton";
//import { createPost, useAuthStore } from "@artylic/api-client";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import {  useNavigate, useParams } from "react-router-dom";
import { deletePost, editPost, getPost, useAuthStore } from "@artylic/api-client";
import type { Post } from "@artylic/types";
import CommentComponent from "../components/CommentComponent";
import DeleteButton from "../components/simple_components/DeleteButton";

function EditPost () {

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [description, setDescrition] = useState('');
    const [preview, setPreview] = useState('');
    const [postInfo, setPostInfo] = useState<Post>();
    const [openComments, setOpenComments] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const {id} = useParams();

    const {user} = useAuthStore();

        useEffect(() => {
    
            async function getInfo() {
                if (!id) {
                    return;
                }
                const result = await getPost(id);
                if (result.success && result.data) {
                    console.log(result.data)
                    setPostInfo(result.data)
                    setDescrition(result.data.description)
                } else if (result.error) {
                    setErrorMessage(result.error);
                }
            }
            getInfo();
        },[])

    async function handleEdit() {
        if (!id) return;
        const result = await editPost(id, description, imageFile || undefined)
        if (result.success) {
            navigate(`/post/${id}`);
        } else if (result.error) {
            setErrorMessage(result.error);
        }
    }

    async function handleDelete() {
        if (!id) return;

        const result = await deletePost(id);
        if (result.success) {
            navigate(`/profile/${postInfo?.userId}`)
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }


    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setImageFile(file)
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    return (
        <div className="ml-18">
            <div className="dark:bg-mist-800 mx-18 w-1/2 rounded-2xl p-10 flex flex-col gap-10">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-2xl"> Edit post </h1>
                    <DeleteButton 
                        label="Delete post"
                        onDelete={() => handleDelete()}
                    />
                </div>
                
                    <div className="flex flex-col mt-10 gap-5">
                          <>
                            <input
                                ref={fileInputRef}
                                className="hidden"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <button
                                className="bg-blue-500 active:bg-blue-400 py-3 self-start px-4 rounded-xl cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            > Change image </button>
                            {<img src={preview ? preview : postInfo?.photoUrl} className="w-full object-contain max-h-150 bg-mist-900" />}
                        </>
                    </div>
                    <div className="">
                        <h2 className="text-xl"> Description </h2>
                        <textarea 
                            placeholder="description"
                            rows={2} 
                            className="w-full p-3 border-b dark:border-mist-700 resize-none"
                            value={description}
                            onChange={e => setDescrition(e.target.value)}
                        />

                    </div>

                    <ErrorMessageComponent message={errorMessage}/>

                    <div className="flex self-end ">
                        <SimpleButton label="Edit post" onClick={() => handleEdit()}/>
                    </div>
                    <div>
                        <div className="flex gap-3">
                            <h1 className="text-2xl"> Comments </h1>
                            <SimpleButton label="open" onClick={() => setOpenComments(!openComments)}/>
                        </div>
                        {openComments && 
                        
                            <div className="mt-10 flex flex-col gap-5 dark:bg-mist-800 rounded-2xl pb-5">
                                {
                                    postInfo?.comments && (
                                        postInfo.comments.map((comment) => (
                                            <CommentComponent 
                                                username={comment.user.username}
                                                body={comment.body}
                                                key={comment.id}
                                                avatar={comment.user.avatarUrl ?? ''}
                                                ids={[comment.userId, postInfo.userId]}
                                                userId={user?.id}
                                                id={comment.id}
                                                postId={comment.postId}
                                            />
                                        ))
                                    )
                                }
                            </div>
                        }
                    </div>
            </div>
        </div>
    )
}

export default EditPost