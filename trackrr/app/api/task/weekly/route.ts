import { NextRequest,NextResponse } from "next/server";

export default async function GET(req:NextRequest)
{
    try {
        const body=await req.json();
        const {userId,categoryId,description,dayOfWeek}=body;
        console.log("body",body);
        return NextResponse.json({message:"Hello"},{status:200});
    } catch (error) {
        console.error("Error in weekly task route:", error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
} 