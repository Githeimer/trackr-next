import supabase from "@/config/dbConfig";
import { NextRequest,NextResponse } from "next/server";

export async function PATCH(request:NextRequest)
{
    try {
        const data= await request.json();
        const {t_id:task_id,status}=data;

        const {data:DBresponse,error:DBerror}=await supabase.from("task").update([{status:status}]).eq("t_id",task_id).select("*");

        if(DBerror)
        {
            throw DBerror;
        }

        console.log(DBresponse);
        return NextResponse.json({taskStatus:DBresponse},{status:200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({message:"API HIT FAIL"},{status:500})
    }
}