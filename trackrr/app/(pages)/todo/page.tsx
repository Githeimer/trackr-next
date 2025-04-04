"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodoCategory from '@/components/TodoCategory'
import { Clock } from 'lucide-react'

export interface Category{
  c_id: string
  category_name: string
  category_type: string
  color: string
  created_at:string
  description: string
  icon_name : string
  u_id:string
}

const Todo = () => {
  const{data:session,status}=useSession();
  const [categoryData,setCategoryData]=useState([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      getCategory();
    }
  }, [status, session]);
  

  const getCategory=async()=>{
    try {
      const response=await axios.get(`/api/category?u_id=${session?.user.id}`);
      
      if(response.data)
      {
        setCategoryData(response.data)
      }
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">

        <div className="mb-8 text-center">
          <h1 className="md:text-4xl text-2xl font-bold text-white mb-2">
            {session?.user?.name}'s Tasks
          </h1>
          <p className="text-[#a9d8be] md:text-lg text-sm">Organize your day with style</p>
        </div>
   
        <div className="w-full backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex overflow-x-auto p-4 gap-2 border-b border-white/10">
           
             <div className='flex flex-col w-full gap-4'>
               {/* Heading part */}
                <div className='flex flex-row justify-between'>
                  <h1 className='md:text-2xl text-md font-semibold'>To-do-List</h1>
                  <Clock/>
                </div>
                {/* Todo Cards */}
                <div className='flex flex-col pl-2'>
                {categoryData.map((data,index)=>{
                  return <TodoCategory key={index} props={data}></TodoCategory>
                })}
                </div>
             </div>
             
             
           </div>
        </div>
      </div>
    </div>
  )
}

export default Todo