import React from 'react'
import { Button } from './ui/button'
import { PlusCircle } from 'lucide-react'
import { Category } from '@/helpers/db/category'
import { useSession } from 'next-auth/react'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from './ui/dialog'
import WeekDayComponent from './WeekDayComponent'

const AddWeeklyTask = ({categoryId}:{categoryId:number}) => {
    const {data:session,status}=useSession();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button  className="w-full cursor-pointer" onClick={() => setIsOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4 text-green-400 "  />
            </Button>
          </DialogTrigger>
            <DialogContent className="w-[90%] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] md:max-h-[100vh] overflow-y-auto  
              bg-black/70 md:bg-black/80 sm:bg-black border border-white/10 rounded-xl shadow-xl text-white">
                  <DialogHeader>
                      <div className='flex-col gap-1 flex'>
                        <DialogTitle className="text-xl font-bold">Add Weekly Tasks</DialogTitle>
                        <p className='text-gray-400 text-xs'>Add tasks for each day and it will be auto assigned</p>
                      </div>
                   </DialogHeader>

                   <div className='flex flex-col gap-1'>
                       {days.map((day,index)=>{
                         return <WeekDayComponent categoryId={categoryId} dayName={day} day={index} key={index}></WeekDayComponent>
                     })}
                      
                     {/* Render Each days component */}
                   </div>
                  


            </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddWeeklyTask