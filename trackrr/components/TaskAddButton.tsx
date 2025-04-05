import React from "react";
import { PlusIcon } from "lucide-react";

const TaskAddButton = ({ handleAddTask }: { handleAddTask: () => void }) => {
  return (
    <div 
      className="flex items-center gap-2 cursor-pointer bg-black/10 p-2 rounded-md transition-colors" 
      onClick={handleAddTask}
    >
      <PlusIcon className="text-green-600 w-5 h-5" />
      <span className="text-gray-600 font-medium">Add new task</span>
    </div>
  );
};

export default TaskAddButton;