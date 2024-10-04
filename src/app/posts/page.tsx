import { createPost } from "@/actions";
import prisma from "@/lib/db"
import Link from "next/link"

export default async function PostPage() {
  // const posts = await prisma.post.findMany();
  const userData = await prisma.user.findUnique({
    where:{
      email:"sunny@gmail.com"
    },
    include:{
      post:true
    }
  })
  // console.log(userData)
  return(
    <main className="flex flex-col items-center pag-y-5 pt-24 text-center"> 
      <h1 className="text-3xl font-semibold">All Posts ({userData.post.length})</h1>
      <ul className="border-t border-b border-black\10 py-5 leading-8">
        {userData.post.map((post)=> 
          <li key={post.id}>
            <Link href={`posts/${post.slug}`}> {post.title}</Link>
          </li>
        )}
      </ul>
      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input type="text" name="title" placeholder="Title" className="px-2 py-1 rounded-sm"/>
        <textarea name="content" placeholder="Content" className="px-2 py-1 rounded-sm" rows={5}/>
        <button type="submit" className="bg-blue-500 py-2 text-white rounded-sm">Create Post</button>
      </form>
    </main>
  )
}




// {
//   where : {
//     content : {endsWith: "post"}
//   },
//   orderBy:{
//     createdAt : "desc"
//   },
//   select: {
//     id: true,
//     title: true,
//     slug: true,
//   },
//   take:1,
//   skip:1,

// }