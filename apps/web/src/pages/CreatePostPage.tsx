import { useState } from "react";
import SimpleButton from "../components/simple_components/SimpleButton";

function CreatePostPage () {

    const [image, setImage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImage(url);
    };

    return (
        <div className="ml-18">
            <div className="dark:bg-mist-800 mx-18 w-1/2 rounded-2xl p-10 flex flex-col gap-10">
                <h1 className="font-bold text-2xl"> Create your post </h1>
                    <div className="flex flex-col mt-10 gap-5">
                        <h2 className="text-xl"> Add image </h2>
                          <>
                            <input type="file" accept="image/*" onChange={handleChange} className="hidden" id="upload" />
                            <label htmlFor="upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
                            Upload Photo
                            </label>
                            {image && <img src={image} className="w-full object-contain max-h-150" />}
                        </>
                    </div>
                    <div className="">
                        <h2 className="text-xl"> Description </h2>
                        <textarea 
                            placeholder="description"
                            rows={2} 
                            className="w-full p-3 border-b dark:border-mist-700 resize-none"/>
                    </div>
                    <div className="flex self-end ">
                        <SimpleButton label="Create" onClick={() => console.log("created!")}/>
                    </div>
            </div>
        </div>
    )
}

export default CreatePostPage