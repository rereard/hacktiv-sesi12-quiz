import Link from 'next/link'

export default function Home(props) {
  const findNameById = (userId) => {
    let user = props.users.find((u) => u.id === userId)
    return user.name
  }
  return (
    <div className="flex flex-col items-center mt-10 mb-8">
        <h1 className="mb-10 text-4xl w-2/4 md:text-left text-center">User Post</h1>
        {props.posts.map((post) => (
            <div key={post.id} className="border-2 border-slate-400 rounded-lg md:w-2/4 w-9/12 flex flex-col flex-wrap p-3 mb-5">
              <div className="border-b-2">
                  <Link href={`/${post.id}`}><h2 className="hover:underline hover:cursor-pointer md:text-2xl font-medium text-xl">{post.title}</h2></Link>
                  <h4 className="text-slate-400 md:text-lg mt-2 text-base">{findNameById(post.userId)}</h4>
              </div>
              <p className="mt-3">{post.body}</p>
          </div>
        ))}
    </div>
  )
}

export async function getServerSideProps(context){
  const resPosts = await fetch('https://jsonplaceholder.typicode.com/posts')
  const resUsers = await fetch("https://jsonplaceholder.typicode.com/users")
  const posts = await resPosts.json()
  const users = await resUsers.json()
  return {
      props: { posts, users }
  }
}