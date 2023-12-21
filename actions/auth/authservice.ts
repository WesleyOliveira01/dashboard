"use server";
import prisma from "@/lib/db";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

class authService {
  static async login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error("User not found");
    const isMatch = compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email/password");

    const token = sign(
      {
        name: user.name as string,
        email: user.email as string,
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
  }
}

export { authService };
