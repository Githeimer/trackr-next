"use client";
import React, { useState, useRef, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { TrashIcon, PencilIcon, CheckIcon, XIcon } from "lucide-react";
import axios from "axios";

const TaskList = ({ task, fetchTaskData, categoryId }: { task: any; fetchTaskData: () => void; categoryId: number }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskText, setTaskText] = useState(task.task_description || "");
  const [isDone, setIsDone] = useState(task.status );
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(task);
 

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
    <div className="flex flex-row items-center gap-2 p-2 rounded-md group">
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
            className="px-2 py-1 rounded text-white flex-grow focus:outline-none"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveTask();
              if (e.key === 'Escape') cancelEdit();
            }}
          />
          <CheckIcon 
            className="text-green-500 cursor-pointer w-5 h-5" 
            onClick={saveTask}
          />
          <XIcon 
            className="text-red-500 cursor-pointer w-5 h-5" 
            onClick={cancelEdit}
          />
        </>
      ) : (
        <>
          <div
            className={`px-2 py-1 rounded flex-grow ${isDone ? "line-through text-gray-500" : ""}`}
          >
            {taskText}
          </div>
          <PencilIcon 
            className="text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5" 
            onClick={handleEdit}
          />
          <TrashIcon 
            className="text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5" 
            onClick={deleteTask}
          />
        </>
      )}
    </div>
  );
};

export default TaskList;