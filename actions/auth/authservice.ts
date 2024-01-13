"use server";
import { authData } from "@/interfaces/auth-interfaces";
import prisma from "@/lib/db";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
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

async function signOut() {
  cookies().delete("token");
  redirect("/");
}

export { login, signOut };
