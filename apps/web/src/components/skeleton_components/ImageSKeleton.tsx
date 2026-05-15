type ImageSkeletonProps = {
    load: boolean
}



function ImageSkeleton({load}: ImageSkeletonProps) {

    if (!load) return null

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="break-inside-avoid mb-4 animate-pulse">
          <div className={`w-full ${ i % 2 == 0 ? 'h-100' : 'h-75'} dark:bg-mist-700 rounded-lg`}/>
        </div>
      ))}
    </div>
  )
}

export default ImageSkeleton