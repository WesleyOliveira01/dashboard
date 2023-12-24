import prisma from "@/lib/db";

async function createAdmin() {
    await prisma.user.create({
        data: {
            name: "Wesley Alves",
            email: "wesleyoliveira.dev01@gmail.com",
            password: "$2b$10$tjNCtySA62c3Z2QaWzpu7.sucmGLaXjaiK.BdNd6kIuLz8jvxGCUG",
            isAdmin: true
        }
    })
}

createAdmin().catch((e) => {
    console.error(`error: ${e.message}`)
})