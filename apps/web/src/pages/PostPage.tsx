import { useEffect, useState } from "react";
import CommentComponent from "../components/CommentComponent"
import { HandThumbUpIcon } from '@heroicons/react/16/solid';

import SimpleButton from "../components/simple_components/SimpleButton";
import type { Post } from "@artylic/types";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, likePost, postComment, unlikePost, useAuthStore } from "@artylic/api-client";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import defaultIcon from '../assets/new_artylic_user_Icon.png'



function PostPage () {

    const [commentMode, setCommentMode] = useState(false);
    const [userComment, setUserComment] = useState('');
    const [postInfo, setPostInfo] = useState<Post>();
    const [postLikes, setPostLikes] = useState<number>(0);
    const [isLiked, setIsLiked] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

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
                setPostLikes(result.data._count?.likes || 0)
                if(result.data.likes.length > 0) setIsLiked(true);
                if (result.data.userId == user?.id) setCanEdit(true);

            } else if (result.error) {
                setErrorMessage(result.error);
            }
        }
        getInfo();
    },[])

    async function handleComment() {
        if (userComment == '' || !id) return;

        const result = await postComment(id, userComment)
        if (result.success && result.data) {
            setPostInfo(prev => {
                if (!prev || !result.data) return prev
                return {
                    ...prev,
                    comments: [...prev.comments, result.data]
                }
            })
        }

    }

    async function handleLike() {
        if (!id) return;

        let result;
        if (!isLiked){
            result = await likePost(id);
        } else {
            result = await unlikePost(id);
        }

        if (result.success) {
            setIsLiked(!isLiked);
            isLiked ? setPostLikes(postLikes - 1) : setPostLikes(postLikes + 1);
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    const goToProfile = () => navigate(`/profile/${postInfo?.userId}`)
    const goToEdit = () => navigate('edit');

    return (
        <div className="flex shadow-2xl dark:shadow-none">
            <div className="flex-3 px-10">
                <div className="p-10 dark:bg-mist-800 rounded-2xl flex flex-col gap-3"> 
                    <img src={postInfo?.photoUrl} className="w-full object-contain max-h-200 rounded dark:bg-mist-900" />
                    <ErrorMessageComponent message={errorMessage}/>
                    <div className="flex items-center gap-3">

                        <button 
                            onClick={() => goToProfile()}
                            className="bg-mist-500 p-0.5 rounded-full cursor-pointer"
                        >
                            <img 
                                className="w-12 h-12 rounded-full"
                                src={postInfo?.user.avatarUrl ?? defaultIcon}
                            />
                        </button>

                        <h2 className="font-bold text-xl ">{postInfo?.user.username}</h2>

                        <div className="flex gap-3 items-center ml-auto"> 
                            <button className="dark:bg-mist-700 p-2 rounded-full items-center cursor-pointer"
                                onClick={() => handleLike()}
                            >
                                <HandThumbUpIcon className={`h-6 w-6 ${isLiked && `text-green-500`}`}/> 
                            </button>

                            <h2 className="font-bold text-xl">{postLikes}</h2>
                        </div>

                    </div>

                    <p>{postInfo?.description}</p>

                    { canEdit && <div className="self-end">
                        <SimpleButton 
                            onClick={() => goToEdit()}
                            label="Edit post"
                        />
                    </div>}
                </div>
                <div className="mt-10">
                    <div className="dark:bg-mist-800 rounded-2xl p-5 flex flex-col gap-5">
                        <h1 className="text-2xl ml-5"> Leave a comment </h1>
                        <textarea 
                        onClick={() => setCommentMode(true)}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        rows={commentMode ? 2 : 1} 
                        className="w-full p-3 border-b dark:border-mist-700 resize-none"/>
                        {commentMode && <div className="self-end flex gap-5 mr-5">
                            <SimpleButton label="Cancel" onClick={() => setCommentMode(false)}/>
                            <SimpleButton label="Comment" onClick={() => handleComment()}/>
                        </div>}
                    </div>

                    <div className="mt-10">

                        <div className="flex items-center text-2xl ml-5 gap-3">
                            <p> {postInfo?._count?.comments}</p>
                            <p> comments </p>
                        </div>

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
                    </div>
                    
                </div>
            </div>

            <div className="flex-1 hidden lg:flex">
                
            </div>
        </div>
    )
}

export default PostPage