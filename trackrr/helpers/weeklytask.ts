import supabase from '@/config/dbConfig';

export type Task = {
  t_id: number;
  u_id: number;
  c_id: number;
  task_description: string;
  status: boolean;
  date: string;
  is_weekly: boolean;
  category_name: string;
  category_type: string;
  icon_name: string | null;
  color: string | null;
};

// Get tasks for a specific date (includes automatic weekly task generation)
export async function getTasksForDate(date: string, userId: number) {
  try {
   //user's time zone;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    //calling the supabase's function that is created in the database
    const { data, error } = await supabase
      .rpc('get_tasks_with_weekly_generation', {
        p_date: date,
        p_user_id: userId,
        p_timezone: userTimezone
      });
    
    if (error) throw error;
    return data as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function createWeeklyTask(
  userId: number, 
  categoryId: number, 
  description: string, 
  dayOfWeek: number // 0-6 for Sunday-Saturday
) {
  try {
    const { data, error } = await supabase
      .from('weekly_task')
      .insert({
        u_id: userId,
        c_id: categoryId,
        task_description: description,
        day_of_week: dayOfWeek
      })
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating weekly task:', error);
    throw error;
  }
}

export async function updateWeeklyTask(
  weeklyTaskId: number,
  updates: {
    task_description?: string;
  }
) {
  try {
    const { data, error } = await supabase
      .from('weekly_task')
      .update(updates)
      .eq('wt_id', weeklyTaskId)
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating weekly task:', error);
    throw error;
  }
}

export async function deleteWeeklyTask(weeklyTaskId: number) {
  try {
    const { error } = await supabase
      .from('weekly_task')
      .delete()
      .eq('wt_id', weeklyTaskId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting weekly task:', error);
    throw error;
  }
}
