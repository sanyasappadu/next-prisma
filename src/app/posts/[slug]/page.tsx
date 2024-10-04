import prisma from "@/lib/db"
// type 2
// import { unstable_cache as  cache} from "next/cache";
// const getCachedPost = cache((slug)=>{
//   return prisma.post.findUnique({
//     where:{
//       slug,
//     }
//   })
// })

export default async function PostPage({params}) {
// type 2
  // const post = await getCachedPost( params.slug );
// type 1
  const post = await prisma.post.findUnique({
    where:{slug :params.slug},
    // cacheStrategy : { ttl:60}
  });
  
  return(
    <main className="flex flex-col items-center pag-y-5 pt-24 text-center"> 
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  )
}