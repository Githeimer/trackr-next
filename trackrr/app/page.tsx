"use client"
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
type Props = {}

const Home = (props: Props) => {
  return (
   <>
   <SessionProvider>
   <Navbar></Navbar>
  LandingPAge
   </SessionProvider>
   
   </>
   
  )
}

export default Home