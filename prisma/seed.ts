import prisma from "@/lib/db";

export async function createAdmin() {
    const id = "$2b$10$tjNCtySA62c3Z2QaWzpu7.sucmGLaXjaiK.BdNd6kIuLz8jvxGCUG"

    const hasUser = await prisma.user.findFirst({where:{id,}})
    if(!!hasUser){
        return
    }

    await prisma.user.create({
        data: {
            name: "Wesley Alves",
            email: "wesleyoliveira.dev01@gmail.com",
            password: "$2b$10$tjNCtySA62c3Z2QaWzpu7.sucmGLaXjaiK.BdNd6kIuLz8jvxGCUG",
            isAdmin: true
        }
    })
}

