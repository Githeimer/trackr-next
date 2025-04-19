import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';

export interface DaysComponentProps {
    dayName:string,
    day:number,
    categoryId:number}

const WeekDayComponent = ({dayName,day,categoryId}:DaysComponentProps) => {
    const {data:session,status}=useSession();   

    // useEffect(()=>{
    //     getWeeklyTask();
    // }
    // ,[status,session])

    // const getWeeklyTask = async() => {  
    //     if(status==="authenticated" && session?.user?.id)
    //     {
    //         try {
    //             const dataToSend=
    //             {
    //                 userId:session?.user?.id,
    //                 categoryId:categoryId,
    //                 dayOfWeek:day
    //             }

    //             const response = await axios.post('/api/task/weekly',dataToSend);

    //             const data = response.data;
    //             console.log("Weekly Task Data",data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    return (
    <div className='py-2 px-1'>
        <div className='text-lg text-gray-300'>{dayName}</div>
        <hr className='border-1 border-gray-800'/>
    </div>
  )
}

export default WeekDayComponent