import React from "react";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";

const TaskAddButton = ({ handleAddTask }: { handleAddTask: () => void }) => {
  return (
    <motion.div 
      className="flex items-center gap-2 cursor-pointer bg-[#0e0e0e]/30 hover:bg-[#0e0e0e]/50 p-2 rounded-md transition-colors duration-200" 
      onClick={handleAddTask}
      whileTap={{ scale: 0.98 }}
    >
      <PlusIcon className="text-[#16ae50] w-5 h-5" />
      <span className="text-gray-400 font-medium">Add new task</span>
    </motion.div>
  );
};

export default TaskAddButton;