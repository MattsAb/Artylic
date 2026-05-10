import ImageComponent from "../components/ImageComponent"
import artImage from "../assets/pexels-diva-30887566.jpg"
import image2 from "../assets/Watercolor Portraits Painting.jpeg"
import image3 from "../assets/pexels-optical-chemist-340351297-31374418.jpg"
import image4 from "../assets/pexels-nicole-avagliano-1132392-16354153.jpg"
import image5 from "../assets/pexels-nicole-avagliano-1132392-16354192.jpg"

function Dashboard() {

  return (
    <div className="">
      <p className="" > Dashboard </p>
      <div className="flex justify-around">
        <div className="flex-1"> some actions </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 w-2/3">
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

        <div className="flex-1"> other stuff </div>
      </div>

    </div>
  )

}

export default Dashboard
