import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const middleware = async (req:NextRequest) => {
    const token = cookies().get("token") as any as string;
    
    const isValidToken = jwt.verify(token,process.env.JWT_SECRET)

    if(!isValidToken){
        NextResponse.redirect(new URL("/",req.url))
    }
    
}

export const config = {
    matcher: ["/dashboard/:path*"]
}