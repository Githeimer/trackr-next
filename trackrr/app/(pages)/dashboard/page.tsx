"use client"
import AddCategoryDialog from '@/components/TrackerAdd'
import { Button } from '@/components/ui/button'
import { AuthState, useAuthStore } from '@/store/store'
import { useSession } from 'next-auth/react'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Category } from '../todo/page'
import Contribution from '@/components/contribution/Contribution'

const Dashboard = () => {
    const {user,logout}=useAuthStore() as AuthState;
    const [CategoryData, setCategoryData] = useState([])
    const {data:session,status}=useSession();
    
        useEffect(() => {
          if (status === "authenticated" && session?.user?.id) {
            getCategory();
          }
        }, [status, session]);

        const getCategory = async() => {
          try {
            const response = await axios.get(`/api/category?u_id=${session?.user.id}`);
            if(response.data) {
              setCategoryData(response.data)
            }

          } catch (error) {
            console.log(error);
          }
        }

    
  return (
    <div className=' mt-8 flex-col'>
      {/* Top section */}
      <div className='flex flex-row justify-between'>
      <div className='opening-text flex flex-col items-start justify-center gap-2'>
            <div className='text-3xl font-[600]'>
                Hello {"there"} 
            </div>
        </div>
        <div>
           <AddCategoryDialog></AddCategoryDialog>
        </div>
       
      </div>
      <div className='text-sm font-medium text-[var(--brand-color)] py-2'>
                Complete Daily Tasks across different categories and build up your activity history.
            </div>
      {/* Tracker Section */}
      <div className='flex flex-col gap-3 justify-center items-center mt-4'>
        {CategoryData.map((ele,index)=>{
          return <Contribution key={index} category={ele}></Contribution> 
        })}
       
         
      </div>     
    </div>
  )
}

export default Dashboard