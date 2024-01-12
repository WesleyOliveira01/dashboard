"use server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { IToken, TokenPayload } from "@/interfaces/auth-interfaces";

export async function verifyToken() {
  const { value: cookie } = cookies().get("token") as any as IToken;
  const token = verify(cookie, process.env.JWT_SECRET) as TokenPayload;

  if (!token.isAdmin) throw new Error("Usuario sem permissão");
}
