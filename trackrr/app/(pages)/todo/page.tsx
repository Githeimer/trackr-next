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
  created_at: string
  description: string
  icon_name: string
  u_id: string
}

const Todo = () => {
  const { data: session, status } = useSession();
  const [categoryData, setCategoryData] = useState([]);
  const today = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

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
    <div className="min-h-screen  p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="md:text-4xl text-2xl font-bold text-[#16ae50] mb-2">
            {session?.user?.name}'s Tasks
          </h1>
          <p className="text-[#6b716e] md:text-lg text-sm">Organize your day with style</p>
        </div>
   
        <div className="w-full backdrop-blur-md bg-white/5 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col w-full gap-4">
              {/* Heading part */}
              <div className="flex flex-row justify-between items-center mb-4 border-b border-[#707070]/20 pb-4">
                <h1 className="md:text-2xl text-md font-semibold text-white">To-do-List</h1>
                <div className="flex flex-row items-center gap-2 text-[#16ae50]">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{today}</span>
                </div>
              </div>
              
              {/* Todo Cards */}
              <div className="flex flex-col gap-5">
                {categoryData.map((data, index) => (
                  <TodoCategory key={index} category={data} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo