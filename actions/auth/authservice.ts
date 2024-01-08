"use server";
import {
  IToken,
  TokenPayload,
  authData,
  signUpData,
} from "@/interfaces/auth-interfaces";
import prisma from "@/lib/db";
import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login({ email, password }: authData) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("Usuario não cadastrado");
  const isMatch = await compare(password, user.password);
  if (!isMatch) throw new Error("email ou senha invalido");

  const token = sign(
    {
      name: user.name as string,
      email: user.email as string,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
      subject: user.id,
    }
  );

  const oneMount = 24 * 60 * 60 * 1000 * 30; // um mes

  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    expires: Date.now() + oneMount,
  });

  redirect("/dashboard");
}

async function createUser(signUpData: signUpData) {
  const { value: cookie } = cookies().get("token") as any as IToken;
  const token = verify(cookie, process.env.JWT_SECRET) as TokenPayload;

  if (!token.isAdmin) throw new Error("Usuario sem permissão");

  const hasUser = await prisma.user.findFirst({
    where: { email: signUpData.email },
  });

  if (hasUser) throw new Error("Usuario já cadastrado");
  
  const hashPassword = await hash(signUpData.password, 10);

  const newUser = await prisma.user.create({
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
  const { value: cookie } = cookies().get("token") as any as IToken;
  const token = verify(cookie, process.env.JWT_SECRET) as TokenPayload;

  if (!token.isAdmin) throw new Error("Usuario sem permissão");

  await prisma.user.delete({
    where: {
      id,
    },
  });
}

async function signOut() {
  cookies().delete("token");
  redirect("/");
}

export {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByID,
  getUserDetails,
  login,
  signOut,
};
