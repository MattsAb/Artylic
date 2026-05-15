

function PostSkeleton() {

    return (
        <div className="flex w-full h-full shadow-2xl dark:shadow-none animate-pulse gap-3 p-10">
            <div className="flex-2 flex flex-col gap-5 dark:bg-mist-800 p-10 rounded-2xl">
                <div className="w-full h-150 dark:bg-mist-700 rounded" />
                

                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full dark:bg-mist-700" />
                    <div className="w-32 h-4 dark:bg-mist-700 rounded" />
                </div>


                <div className="w-full h-4 dark:bg-mist-700 rounded" />
                <div className="w-2/3 h-4 dark:bg-mist-700 rounded" />
            </div>
            <div className="flex-1">

            </div>
        </div>
    )
}

export default PostSkeleton