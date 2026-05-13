import { useNavigate } from "react-router-dom";
import { HandThumbUpIcon } from '@heroicons/react/16/solid';

type ImageComponentProps = {
    url: string,
    id: number,
    username: string,
    likes: number,
}



function ImageComponent({url, id, username, likes}: ImageComponentProps) {

    const navigate = useNavigate();

    const handleImage = () => navigate(`/post/${id}`);

  return (
        <button 
        className="break-inside-avoid mb-4 rounded-lg overflow-hidden dark:bg-mist-800 bg-gray-100 cursor-pointer
         shadow-gray-400 dark:shadow-black shadow-2xl hover:dark:bg-mist-700 transition-colors duration-100 ease-in-out hover:bg-mist-200"
        onClick={() => handleImage()}
        >
        <img src={url} className="w-full object-cover" />
        <div className="px-2 py-1 flex flex-col">
            <h1 className="self-start">by: {username} </h1>
            <div className="self-end mr-2">
            <p className="flex gap-2 items-center"><HandThumbUpIcon className="h-4 w-4"/>{likes}</p>
            </div>
        </div>
        </button>
  )

}

export default ImageComponent
