import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const initialPosts:Prisma.PostCreateInput[] = [
  {
    title:"Post 1",
    slug: "post-1",
    content: "1st post",
    author: {
      connectOrCreate : {
        where : {
          email : "sunny@gmail.com",
        },
        create : {
          email : "sunny@gmail.com",
          hashedPassword: "qwert"
        }
      }
    }
  }
]
async function main() {
   console.log("Starting ...");
   for(const post of initialPosts){
    const newPost = await prisma.post.create({
      data:post,
    })
    console.log(`post created with ${newPost.id}`)
   }
   console.log('seeding finished')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })