import axios from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const ContributionBox = ({categoryId,userId}:{categoryId:number,userId:number}) => {
    const today= new Date().toISOString().split('T')[0];
    const oneYearAgo: string = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];

    useEffect(()=>{
        getCellData();
    },[])

    const getCellData=async()=>{
        try {
            const DataToServer={
                today,
                oneYearAgo,
                categoryId,
                userId                
            }
            const response = await axios.get("/api/cell", {
                params: DataToServer,
              });

              console.log(response);
            
        } catch (error:any)
         {
            console.log(error)
            toast.error(error.message)
        }
    }

  return (
    <div className='border-1 mt-2 mb-1 bg-[#101010] border-[#3f3f3f]  rounded-sm p-2'>
        
    </div>
  )
}

export default ContributionBox