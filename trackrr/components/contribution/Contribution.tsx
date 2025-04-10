import { Category } from '@/helpers/db/category'
import React from 'react'
import ContributionBox from './ContributionBox'
import EditCategoryDialog from './EditCategoryDialog'
import { MoreHorizontal, Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import axios from 'axios'

const Contribution = ({category, onUpdate}: {category: Category, onUpdate?: () => void}) => {
  const {c_id, u_id} = category;
  
  const handleDeleteCategory = async () => {
    try {
      // Show confirmation
      if (!confirm('Are you sure you want to delete this category?')) {
        return;
      }
      
      const response = await axios.delete(`/api/category?c_id=${c_id}`);
      
      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        // Refresh data if callback provided
        if (onUpdate) {
          onUpdate();
        } else {
          // Fallback to page reload if no callback provided
          window.location.reload();
        }
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error occurred while deleting the category");
    }
  };

  return (
    <div className="md:w-[90%] w-[100%] flex-col gap-3 p-3 bg-[#171717] rounded-md" draggable>
      {/* Top section */}
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-3 items-start'>
          
        <div className='rounded-full w-2.5 h-2.5 mt-4' style={{backgroundColor: category.color}}></div>
          <div className='flex flex-col'>
            <span className='md:text-2xl text-lg'>{category.category_name}</span>
          <span className='md:text-sm text-sm text-gray-500'>{category.description}</span>
          </div>
          
         
        </div>
        
        {/* Category controls dropdown */}
        <div className="relative flex items-center">
          <EditCategoryDialog category={category} onEditComplete={onUpdate} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white ml-1">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 border-white/10 text-white">
              <DropdownMenuItem 
                className="text-red-500 focus:bg-red-900/20 focus:text-red-400 cursor-pointer"
                onClick={handleDeleteCategory}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* ContributionBox component */}
      <ContributionBox categoryId={Number(c_id)} userId={Number(u_id)} color={category.color} />
    </div>
  )
}

export default Contribution