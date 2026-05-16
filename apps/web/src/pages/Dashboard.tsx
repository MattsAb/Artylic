import type { Post } from "@artylic/types"
import ImageComponent from "../components/ImageComponent"
import { useEffect, useState } from "react"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import { getFeed, useAuthStore } from "@artylic/api-client";
import ImageSkeleton from "../components/skeleton_components/ImageSKeleton";

function Dashboard() {

  const [feed, setFeed] = useState<Post[]>()
  const [errorMessage, setErrorMessage] = useState(''); 
  const {user, isAuthenticated} = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFeedInfo() {
      if (!user)  {
        setFeed(undefined);
        return
      }
      const result = await getFeed() 

      if (result.success && result.data)
      {
        console.log(result.data)
        setIsLoading(false);
        setFeed(result.data)
      } else if (result.error) {
        setErrorMessage(result.error)
      }
    }
    getFeedInfo();
      },[user?.id])


  return (
    <div className="">
      <div className="flex justify-around">
        <div className="px-20 pt-10 w-2/3 flex-3">
          <p 
          className="mb-5 text-2xl" > Dashboard </p>
          <ErrorMessageComponent message={errorMessage}/>
          {feed?.length  ? (<div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {feed && feed.map((post) => (
                <ImageComponent 
                  key={post.id}
                  url={post.photoUrl}
                  id={post.id}
                  username={post.user.username}
                  likes={post._count?.likes || 0}
                />
              ))}
          </div>) : ( <ImageSkeleton load={isAuthenticated && isLoading}/> )}

        </div>

      </div>

    </div>
  )

}

export default Dashboard
