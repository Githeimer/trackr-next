"use client"
import AddCategoryDialog from '@/components/TrackerAdd'
import { Button } from '@/components/ui/button'
import { AuthState, useAuthStore } from '@/store/store'
import React from 'react'


const Dashboard:React.FC = () => {
  

    const {user,logout}=useAuthStore() as AuthState;
    
  return (
    <div className='ml-6 mt-8 flex-row'>
      <div className='flex flex-row justify-between'>
      <div className='opening-text flex flex-col items-start justify-center gap-2'>
            <div className='text-3xl font-[600]'>
                Hello {user?user.username:"there"} 
            </div>
            <div className='text-sm font-medium text-[var(--brand-color)]'>
                Track your activities across different categories and build up your activity history.
            </div>
        </div>
        <div>
           <AddCategoryDialog></AddCategoryDialog>
           
        </div>
      </div>
    </div>
  )
}

export default Dashboard