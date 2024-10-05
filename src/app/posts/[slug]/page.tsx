import prisma from "@/lib/db";
import { GetStaticPropsContext } from "next"; // Import the context for typing

// type 2
import { unstable_cache as cache } from "next/cache";

// Define a caching mechanism (optional)
const getCachedPost = cache((slug: string) => {
  return prisma.post.findUnique({
    where: {
      slug,
    },
  });
});

// Define the type for 'params'
interface PostPageParams {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageParams) {
  // type 2 (caching with next/cache)
  // const post = await getCachedPost(params.slug);

  // type 1 (direct Prisma query)
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    // cacheStrategy: { ttl: 60 }, // Prisma cache strategy (optional)
  });

  return (
    <main className="flex flex-col items-center pag-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
