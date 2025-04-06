"use client";
import React, { useState, useRef, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { TrashIcon, PencilIcon, CheckIcon, XIcon } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const TaskList = ({ task, fetchTaskData, categoryId }: { task: any; fetchTaskData: () => void; categoryId: number }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskText, setTaskText] = useState(task.task_description || "");
  const [isDone, setIsDone] = useState(task.status);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleStatusChange = async () => {
    const newStatus = !isDone;
    setIsDone(newStatus);
    
    try {
      await axios.patch("/api/task/status", {
        t_id: task.t_id,
        status: newStatus 
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
      setIsDone(!newStatus); // Revert on error
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const saveTask = async () => {
    if (taskText.trim().length === 0) {
      return deleteTask();
    }

    try {
      await axios.patch("/api/task", {
        task_description: taskText,
        t_id: task.t_id 
      });
      setIsEditing(false);
      fetchTaskData();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const cancelEdit = () => {
    setTaskText(task.task_description || "");
    setIsEditing(false);
  };

  const deleteTask = async () => {
    try {
      if (task.t_id) {
        await axios.delete(`/api/task?t_id=${task.t_id}`);
      }
      fetchTaskData();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <motion.div 
      className={`flex flex-row items-center gap-2 p-2 rounded-md ${
        isHovered ? 'bg-[#0e0e0e]/50' : ''
      } transition-colors duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox 
        checked={isDone} 
        onCheckedChange={handleStatusChange} 
        className="cursor-pointer" 
      />
      
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            className="px-2 py-1 rounded text-white flex-grow focus:outline-none bg-[#0e0e0e]"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveTask();
              if (e.key === 'Escape') cancelEdit();
            }}
          />
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={saveTask}
            className="focus:outline-none"
          >
            <CheckIcon className="text-[#16ae50] cursor-pointer w-5 h-5" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={cancelEdit}
            className="focus:outline-none"
          >
            <XIcon className="text-red-500 cursor-pointer w-5 h-5" />
          </motion.button>
        </>
      ) : (
        <>
          <div
            className={`px-2 py-1 rounded flex-grow text-white ${isDone ? "line-through text-gray-500" : ""}`}
          >
            {taskText}
          </div>
          <div className="flex space-x-2">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className={`focus:outline-none transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <PencilIcon className="text-[#16ae50] cursor-pointer w-5 h-5" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={deleteTask}
              className={`focus:outline-none transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <TrashIcon className="text-red-500 cursor-pointer w-5 h-5" />
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TaskList;