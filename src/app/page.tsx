"use client"
import Link from "next/link";

export default function Home() {

  return (
    <div>
    <main className="flex flex-col items-center pag-y-5 pt-24 text-center bg-neutral-300 dark:text-white dark:bg-neutral-900"> 
    <h1 className="text-3xl font-semibold">welcome to my blog</h1>
    <Link href="/posts" className="underline">view posts</Link>
  </main>
  </div>
  );
}
