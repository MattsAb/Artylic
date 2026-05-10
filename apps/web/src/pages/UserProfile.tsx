import ImageComponent from "../components/ImageComponent"

import artImage from "../assets/pexels-diva-30887566.jpg"
import image2 from "../assets/Watercolor Portraits Painting.jpeg"
import image3 from "../assets/pexels-optical-chemist-340351297-31374418.jpg"
import image4 from "../assets/pexels-nicole-avagliano-1132392-16354153.jpg"
import image5 from "../assets/pexels-nicole-avagliano-1132392-16354192.jpg"
import SimpleButton from "../components/simple_components/SimpleButton"

function UserProfile () {
    return (
        <div className="w-full flex flex-col">

            <div className="w-full dark:bg-mist-800 py-15 flex gap-10 shadow-2xl">
                <div className="w-30 h-30 bg-slate-400 rounded-full ml-18"/>
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold text-2xl"> Someuser </h1>
                    <p className="text-xl"> this this a test bio to a test user profile</p>
                    <SimpleButton label="Follow" onClick={() => console.log("followed!")}/>
                </div>
            </div>

            <div className="w-2/3 dark:bg-mist-800 h-full self-center mt-10 p-10 rounded-2xl flex flex-col gap-10 shadow-2xl">
                <h1 className="font-bold text-2xl"> Posts </h1>
                <div className="columns-2 md:columns-3 lg:columns-5 gap-4 w-full">
                    <ImageComponent ImageUrl={artImage}/>
                    <ImageComponent ImageUrl={image2}/>
                    <ImageComponent ImageUrl={image3}/>
                    <ImageComponent ImageUrl={image4}/>
                    <ImageComponent ImageUrl={image5}/>
                    <ImageComponent ImageUrl={image3}/>
                    <ImageComponent ImageUrl={image4}/>
                    <ImageComponent ImageUrl={artImage}/>
                    <ImageComponent ImageUrl={image2}/>
                    <ImageComponent ImageUrl={image5}/>
                    <ImageComponent ImageUrl={artImage}/>
                    <ImageComponent ImageUrl={image2}/>
                    <ImageComponent ImageUrl={image3}/>
                    <ImageComponent ImageUrl={image4}/>
                    <ImageComponent ImageUrl={image5}/>
                    <ImageComponent ImageUrl={image3}/>
                    <ImageComponent ImageUrl={image4}/>
                    <ImageComponent ImageUrl={artImage}/>
                    <ImageComponent ImageUrl={image2}/>
                    <ImageComponent ImageUrl={image5}/>
                </div>
            </div>
        </div>
    )
}

export default UserProfile