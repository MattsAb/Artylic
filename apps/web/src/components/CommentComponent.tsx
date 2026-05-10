
type CommentComponentProps = {
    username: string
    body: string
}

function CommentComponent({username, body}: CommentComponentProps) {
    return (
        <div className="p-8 rounded-xl flex gap-4">
            <div className="rounded-full bg-slate-400 w-10 h-10"/>
            <div className="flex flex-col gap-3">
                <h1 className="font-bold"> {username} </h1>
                <p> {body} </p>
            </div>
        </div>
    )
}

export default CommentComponent