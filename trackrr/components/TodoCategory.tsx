"use client";
import { Category } from "@/helpers/db/category";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskAddButton from "./TaskAddButton";

// Fix the props structure
const TodoCategory = ({ category }: { category: Category }) => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");


  useEffect(() => {
    if (category?.c_id) {
      fetchTaskData();
    }
  }, [category?.c_id]);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`/api/task?cid=${category.c_id}`);
      console.log(response);
      if (response.data.tasks) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleAddTask = () => {
    setIsAddingNew(true);
  };

  const handleNewTaskSubmit = async () => {
    if (newTaskText.trim()) {
      try {
        await axios.post("/api/task", {
          task_description: newTaskText,
          c_id: category.c_id,
          u_id: category.u_id
        });
        setNewTaskText("");
        setIsAddingNew(false);
        fetchTaskData();
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    } else {
      setIsAddingNew(false);
    }
  };

  // Add null check for category
  if (!category) {
    return <div>No category data available</div>;
  }

  return (
    <div className="flex flex-col p-4 rounded-lg shadow-sm">
      {/* List Title */}
      <div className="flex-col flex w-full mb-3">
        <h1 className="text-xl font-semibold">{category.category_name}</h1>
        <hr style={{ borderColor: category.color }} className="w-full mt-1 border-2 rounded" />
      </div>

      {/* To do list */}
      <div className="flex flex-col gap-2 mt-2">
        {tasks.map((task) => (
          <TaskList 
            key={task.t_id || Math.random().toString()} 
            task={task} 
            fetchTaskData={fetchTaskData} 
            categoryId={Number(category.c_id)} 
          />
        ))}
      </div>

      {/* New Task Input */}
      {isAddingNew ? (
        <div className="flex flex-row items-center gap-2 mt-3">
          <div className="w-4 h-4"></div> {/* Spacer to align with other tasks */}
          <input
            type="text"
            className="px-2 py-1 rounded text-white flex-grow focus:outline-none focus:ring-1"
            placeholder="Enter new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleNewTaskSubmit();
              } else if (e.key === 'Escape') {
                setIsAddingNew(false);
                setNewTaskText("");
              }
            }}
            autoFocus
            onBlur={handleNewTaskSubmit}
          />
        </div>
      ) : (
        <div className="mt-3">
          <TaskAddButton handleAddTask={handleAddTask} />
        </div>
      )}
    </div>
  );
};

export default TodoCategory;