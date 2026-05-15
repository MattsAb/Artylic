import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

type PostImageComponentProps = {
    id: number
    url: string
    likes?: number
}

function PostImageComponent ({url, id, likes}: PostImageComponentProps) {

    const navigate = useNavigate();

    const handleImage = () => {
        window.scrollTo(0, 0)
        navigate(`/post/${id}`)};

    return (
<button 
    className=" relative break-inside-avoid mb-4 rounded-lg cursor-pointer shadow-gray-400 dark:shadow-black shadow-2xl mr-10"
    onClick={() => handleImage()}
>
    <img src={url} className="w-full object-cover rounded-lg" />
    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
        <HandThumbUpIcon className="w-4 h-4 text-white"/>
        <span className="text-white text-sm font-medium">{likes || 0}</span>
    </div>
</button>
    )
}
export default PostImageComponent 