"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  console.log("formdata", formData.get("title"), formData.get("content"))
  try {
    const userr=await prisma.post.create({
      data:{
        title: formData.get("title") as string,
        slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
        content: formData.get("content") as string,
        author:{
          connect:{
            email:"sunny@gmail.com"
          }
        }
        // authorId: "cm1ua6zia00009nyl8zpsph4o"
      }
    })
    console.log("userdata", userr)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === "P2002"){
        console.log("there is a unique constraint voilation, a nw user connot be created with this email")
      }
    }
  }

  revalidatePath("/posts")
}

export async function editPost(formData: FormData, id : string) {
  await prisma.post.update({
    where: {id},
    data:{
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
      .replace(/\s+/g, "-")
      .toLowerCase(),
      content: formData.get("content") as string,
    }
  })
}

export async function deletePost(id: string) {
  await prisma.post.delete({where : {id}})
}
