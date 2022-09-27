import { useRouter } from 'next/router'
export default function PostDetail(props) {
    return (
        <div className="flex flex-col items-center mt-10">
            <div className="md:w-2/4 w-9/12 flex flex-col flex-wrap p-3 mb-5">
                <h2 className="text-3xl font-medium">{props.posts.title}</h2>
                <h4 className="text-slate-400 mt-1">{props.users.name}</h4>
                <h4 className="text-slate-400 mb-2">{props.users.email}</h4>
                <p className="text-lg">{props.posts.body}</p>
            </div>
            <div className="md:w-2/4 w-9/12 flex flex-col flex-wrap p-3 mb-5">
                <h5 className="mb-3 text-xl"><b>Comments:</b></h5>
                {props.comments.map((comment) => (
                    <div key={comment.id} className="border-b-2 mb-3">
                        <h4 className="font-medium">{comment.name}</h4>
                        <h4 className="mb-2 text-slate-400">{comment.email}</h4>
                        <p className="mb-3">{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    const id = context.params.id
    const resPosts = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const resComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    const posts = await resPosts.json()
    const comments = await resComments.json()
    const resUsers = await fetch(`https://jsonplaceholder.typicode.com/users/${posts.userId}`)
    const users = await resUsers.json()
    return {
        props: { posts, users, comments }
    }
}