import type { Post } from "@artylic/types"
import ImageComponent from "../components/ImageComponent"
import { useEffect, useState } from "react"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { getFeed } from "@artylic/api-client";

function Dashboard() {

  const [feed, setFeed] = useState<Post[]>()
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    async function getFeedInfo() {
      const result = await getFeed() 

      if (result.success && result.data)
      {
        setFeed(result.data)
      } else if (result.error) {
        setErrorMessage(result.error)
      }
    }
    getFeedInfo();
      },[])


  return (
    <div className="">
      <p className="" > Dashboard </p>
      <div className="flex justify-around">
        <div className="flex-1"> some actions </div>
        
        <ErrorMessageComponent message={errorMessage}/>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 w-2/3">
            {feed && feed.map((post) => (
              <ImageComponent 
                key={post.id}
                url={post.photoUrl}
                id={post.id}
                username={post.user.username}
                likes={post._count?.likes || 0}
              />
            ))}
        </div>

        <div className="flex-1"> other stuff </div>
      </div>

    </div>
  )

}

export default Dashboard
