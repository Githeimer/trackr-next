import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req:NextRequest){
    const token= await getToken({req,secret:process.env.NEXTAUTH_SECRET});
    
    const protectedRoutes=["/dashboard","/todo"];

    if(protectedRoutes.includes(new URL(req.url).pathname))
    {
        if(!token)
        {
            return NextResponse.redirect(new URL("/auth",req.url));
        }
    }

    if((new URL(req.url).pathname).includes("/auth"))
    {
        if(token)
        {
            return NextResponse.redirect(new URL("/dashboard",req.url));
        }
    }

    return NextResponse.next();
}

export const config={
    matcher:["/dashboard","/todo","/auth"]
}