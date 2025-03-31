import { NextResponse, NextRequest } from "next/server";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "@/helpers/db/task";
import { TaskCreateData } from "@/helpers/db/task";

// Get tasks for a user
export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const u_id = searchParams.get("u_id");
      
      if (!u_id) {
        return NextResponse.json({ error: "u_id is required" }, { status: 400 });
      }
      
      const tasks = await getTasks(u_id);
      return NextResponse.json(tasks);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  
// Create new task
export async function POST(request: NextRequest) {
    try {
      const body: TaskCreateData = await request.json();
      const newTask = await createTask(body);
      return NextResponse.json(newTask, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


// Update a task
export async function PATCH(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const t_id = searchParams.get("t_id");
      
      if (!t_id) {
        return NextResponse.json({ error: "t_id is required" }, { status: 400 });
      }
      
      const updates = await request.json();
      const updatedTask = await updateTask(t_id, updates);
      
      return NextResponse.json(updatedTask, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  

// Delete a task
export async function DELETE(request: NextRequest) {
try {
    const { searchParams } = new URL(request.url);
    const t_id = searchParams.get("t_id");
    
    if (!t_id) {
    return NextResponse.json({ error: "t_id is required" }, { status: 400 });
    }
    
    const deletedTask = await deleteTask(t_id);
    
    return NextResponse.json(deletedTask, { status: 200 });
} catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}