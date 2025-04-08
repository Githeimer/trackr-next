import supabase from "@/config/dbConfig";
import { error } from "console";
import { url } from "inspector";
import { NextApiHandler } from "next";
import { NextRequest,NextResponse } from "next/server";

interface TaskData{
    t_id: number
    u_id: number
    c_id: number
    task_description: string
    status: boolean
    date: string
}


export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const categoryId = searchParams.get("cid");
      const today=searchParams.get("date");
      console.log(today);
  
      const { data, error } = await supabase.from("task").select("*").eq("c_id", categoryId).eq("date",today);
  

      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return NextResponse.json(
          { message: "No tasks found for today", tasks: [] },
          { status: 200 }
        );
      }
  
      return NextResponse.json({ tasks: data }, { status: 200 });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json(
        { message: "Either API hit failed or no task", error },
        { status: 500 }
      );
    }
  }

export async function POST(request:NextRequest){
    try {
      const data=await request.json();
      const {c_id,u_id,task_description}=data;

      const {data:DBresponse, error}=await supabase.from("task").insert([{task_description,c_id,u_id}]).select("*");
   
      if(error)
      {
        throw error;
      }
      
      return NextResponse.json({taskData:DBresponse},{status:200})
    } catch (error) {
      console.error(error);
      return NextResponse.json({message:"API HIT FAIL"},{status:500})

    }
  }

  export async function DELETE(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const task_id = searchParams.get("t_id");
  
      if (!task_id) {
        throw "Task Id not found";
      }
  
      // First, get the task details to check its status and get c_id and date
      const { data: taskData, error: taskError } = await supabase
        .from("task")
        .select("*")
        .eq("t_id", task_id)
        .single();
  
      if (taskError) {
        throw taskError;
      }
  
      if (!taskData) {
        throw "Task not found";
      }
  
      // Store task details before deletion
      const { status, c_id, u_id, date } = taskData;
  
      // Delete the task
      const { data: DBresponse, error: DBerror } = await supabase
        .from("task")
        .delete()
        .eq("t_id", task_id)
        .select();
  
      if (DBerror) {
        throw DBerror;
      }
  
      // If the task status was true, decrease intensity in cell_data
      let cellDataResponse = null;
      if (status === true) {
        // Fetch the cell_data record
        const { data: cellData, error: cellError } = await supabase
          .from("cell_data")
          .select("*")
          .eq("c_id", c_id)
          .eq("date", date);
  
        if (cellError) {
          throw cellError;
        }
  
        if (cellData && cellData.length > 0) {
          const currentIntensity = cellData[0].intensity;
  
          if (currentIntensity <= 1) {
            // If intensity is 1 or 0, delete the record
            const { data: deletedData, error: deleteError } = await supabase
              .from("cell_data")
              .delete()
              .eq("c_id", c_id)
              .eq("date", date);
  
            if (deleteError) {
              throw deleteError;
            }
            cellDataResponse = { message: "Cell data record deleted" };
          } else {
            // Decrease intensity by 1
            const newIntensity = currentIntensity - 1;
            const { data: updatedData, error: updateError } = await supabase
              .from("cell_data")
              .update({ intensity: newIntensity })
              .eq("c_id", c_id)
              .eq("date", date)
              .select();
  
            if (updateError) {
              throw updateError;
            }
            cellDataResponse = updatedData;
          }
        }
      }
  
      return NextResponse.json({
        message: "Task removed",
        cellDataUpdated: status === true,
        cellDataResponse
      }, { status: 200 });
  
    } catch (error) {
      console.error("Error deleting task:", error);
      return NextResponse.json(
        { message: "API hit fail", error },
        { status: 500 }
      );
    }
  }

export async function PATCH(request:NextRequest){
  try {
    const data= await request.json();
    const {task_description:updatedTaskDescription,t_id}=data;
    const {data:DBresponse,error:DBerror}=await supabase.from("task").update({ task_description: updatedTaskDescription }).eq("t_id", t_id).select("*");


    if(DBerror)
    {
      throw DBerror
    }

    return NextResponse.json({message:"Task Edited",updatedTask:DBresponse},{status:200});
  } 
  catch (error) {
    console.error("Error editing task:", error);
    return NextResponse.json(
      { message: "API hit fail", error },
      { status: 500 }
    );
  }
}