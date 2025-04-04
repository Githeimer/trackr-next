"use client"
import { Category } from "@/helpers/db/category";
import axios from "axios"
import { Code,BookOpen,Music,Heart,Zap,CheckCircle,Leaf,BarChart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";



const TodoCategory = ({...props}) => {
    const {data:session}=useSession();
    const categoryData:Category=props.props;

    
  return (
    <div className="flex flex-col">
        <div className="flex-col flex">
            {/* List Title */}
            <div className="flex-col flex w-full">
                <h1 className="text-xl font-semibold">{categoryData.category_name}</h1>
                <hr  style={{borderColor:categoryData.color}} className=" w-[90%]"/>
            </div>

            {/* To do list CRUD */}
           
        </div>
    </div>
  )
}

export default TodoCategory