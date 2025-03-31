import supabase from "@/config/dbConfig";

export interface Task {
  t_id: string;
  u_id: string;
  c_id: string;
  task_name: string;
  description?: string;
  date: string;
  status: string;
  created_at?: string;
}

export interface TaskCreateData {
    // since t_id and created_at are auto-generated, discarded
    u_id: string;
    c_id: string;
    task_name: string;
    description?: string;
    amount: number;
    date: string;
    status: string;
  }


// Get all tasks for a user
export async function getTasks(u_id: string): Promise<Task[]> {
    const { data: tasks, error } = await supabase
      .from("task")
      .select('*')
      .eq('u_id', u_id);
  
    if (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  
    return tasks || [];
  }


// Create code:
export async function createTask(data: TaskCreateData): Promise<Task> {
    console.log("Creating task with data:", data);
    const { data: newTask, error } = await supabase
      .from("task")
      .insert([data])
      .select()
      .single();
  
    if (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
    return newTask;
  }


// Update an existing task
export async function updateTask(t_id: string, updates: Partial<TaskCreateData>): Promise<Task> {
    const { data: updatedTask, error } = await supabase
      .from("task")
      .update(updates)
      .eq("t_id", t_id)
      .select()
      .single();
  
    if (error) throw error;
    return updatedTask;
  }


// Delete a task
export async function deleteTask(t_id: string): Promise<Task> {
    const { data: deletedTask, error } = await supabase
      .from("task")
      .delete()
      .eq("t_id", t_id)
      .select()
      .single();
  
    if (error) throw error;
    return deletedTask;
  }