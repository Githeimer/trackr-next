import { Category } from '@/helpers/db/category'
import Image from 'next/image'
import React from 'react'
import ContributionBox from './ContributionBox'


const Contribution = ({category}:{category:Category}) => {
  const {c_id,u_id}=category;
  return (
    <div className="flex-col gap-3  p-3 bg-[#171717] rounded-md" draggable>
      {/* Top section */}
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-3 items-center' >
        <span className='text-2xl'>{category.category_name}</span>
        <div className='rounded-full w-2.5 h-2.5' style={{backgroundColor:category.color}}></div>
        </div>
        
        <Image
          src="/dragicon.png"
          alt="Draggable-icon"
          className="timeline-title-icon"
          height={30}
          width={30}
        />
      </div>
      {/* Category */}
      <ContributionBox categoryId={Number(c_id)} userId={Number(u_id)}></ContributionBox>
    </div>
  )
}

export default Contribution