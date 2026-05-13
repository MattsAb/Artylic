import { useState } from "react";
import SimpleButton from "../components/simple_components/SimpleButton";
import { createPost } from "@artylic/api-client";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";

function CreatePostPage () {

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [description, setDescrition] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit() {
        if (!imageFile) {
            setErrorMessage("please upload an image");
            return;
        }
        const result = await createPost(description, imageFile);
        if (result.success && result.data) {
            console.log('it worked I guess');
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    return (
        <div className="ml-18">
            <div className="dark:bg-mist-800 mx-18 w-1/2 rounded-2xl p-10 flex flex-col gap-10">
                <h1 className="font-bold text-2xl"> Create your post </h1>
                    <div className="flex flex-col mt-10 gap-5">
                        <h2 className="text-xl"> Add image </h2>
                          <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                            />
                            <label htmlFor="upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
                            Upload Photo
                            </label>
                            {imageFile && <img src={imageFile.name} className="w-full object-contain max-h-150" />}
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
                        <SimpleButton label="Create" onClick={() => handleSubmit()}/>
                    </div>
            </div>
        </div>
    )
}

export default CreatePostPage