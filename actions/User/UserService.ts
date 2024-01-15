'use server'
import { IToken, TokenPayload, signUpData } from "@/interfaces/auth-interfaces";
import prisma from "@/lib/db";
import { verifyToken } from "../utils";
import { hash } from "bcrypt";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function createUser(signUpData: signUpData) {
    await verifyToken()
    const hasUser = await prisma.user.findFirst({
      where: { email: signUpData.email },
    });
  
    if (hasUser) throw new Error("Usuario já cadastrado");
  
    const hashPassword = await hash(signUpData.password, 10);
  
    await prisma.user.create({
      data: {
        name: signUpData.name,
        email: signUpData.email,
        password: hashPassword,
        isAdmin: signUpData.permissions,
      },
    });
  
    redirect("/dashboard/users");
  }
  
  async function getUserByID(id: string) {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  }
  
  async function getUserDetails() {
    const { value: cookie } = cookies().get("token") as any as IToken;
    const token = verify(cookie, process.env.JWT_SECRET) as TokenPayload;
    const simpleName = token.name.split(" ");
    return {
      id: token.sub,
      name: token.name,
      simpleName: simpleName[0],
      email: token.email,
      isAdmin: token.isAdmin,
    };
  }
  
  async function getAllUsers() {
    const allUsers = await prisma.user.findMany({
      select: { id: true, name: true, email: true, isAdmin: true },
      orderBy: { created_at: "desc" },
    });
  
    return allUsers;
  }
  
  async function deleteUser(id: string) {
    await verifyToken()
  
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async function updateUser(userData) {
    verifyToken()
  
    const user = await prisma.user.findFirst({ where: { id: userData.id } });
  
    const password =
      userData.password.length == 0
        ? user.password
        : await hash(userData.password, 10);
    const newUserData = {
      name: userData.name,
      email: userData.email,
      isAdmin: userData.permissions,
      password: password,
    };
  
    await prisma.user.update({
      where: { id: userData.id },
      data: {
        name: newUserData.name,
        email: newUserData.email,
        isAdmin: newUserData.isAdmin,
        password: newUserData.password,
      },
    });
  }

  export {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByID,
  getUserDetails,
  updateUser
};
