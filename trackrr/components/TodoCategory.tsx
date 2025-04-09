"use client";
import { Category } from "@/helpers/db/category";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskAddButton from "./TaskAddButton";
import { AnimatePresence, motion } from "framer-motion";

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
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      console.log(formattedDate);
      
      const response = await axios.get(`/api/task?cid=${category.c_id}&date=${formattedDate}`);

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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col p-4 rounded-lg"
    >
      {/* List Title */}
      <div className="flex-col flex w-full mb-3">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-white">{category.category_name}</h1>
        </div>
        <hr style={{ borderColor: category.color }} className="w-full mt-2 border-2 rounded opacity-70" />
      </div>

      {/* To do list */}
      <div className="flex flex-col gap-2 mt-2">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task.t_id || Math.random().toString()}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <TaskList 
                task={task} 
                fetchTaskData={fetchTaskData} 
                categoryId={Number(category.c_id)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Task Input */}
      <AnimatePresence>
        {isAddingNew ? (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="flex flex-row items-center gap-2 mt-3"
          >
            <div className="w-4 h-4"></div>
            <input
              type="text"
              className="px-3 py-2 rounded text-white flex-grow focus:outline-none focus:ring-1 focus:ring-[#16ae50] bg-[#0e0e0e]"
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
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-3"
          >
            <TaskAddButton handleAddTask={handleAddTask} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoCategory;