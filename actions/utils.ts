"use server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { IToken, TokenPayload } from "@/interfaces/auth-interfaces";

async function verifyToken() {
  const { value: cookie } = cookies().get("token") as any as IToken;
  const token = verify(cookie, process.env.JWT_SECRET) as TokenPayload;

  if (!token.isAdmin) throw new Error("Usuario sem permissão");
}


function formatarData(data) {
  if(!data) return "";
  const dia = data.slice(0, 2);
  const mes = data.slice(2, 4);
  const ano = data.slice(4);
  return `${dia}/${mes}/${ano}`;
}


export {verifyToken, formatarData};