"use client"
import LandingPage from '@/components/Landing'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
type Props = {}

const Home = (props: Props) => {
  return (
   <>
   <SessionProvider>
  
   <LandingPage></LandingPage>
   </SessionProvider>
   
   </>
   
  )
}

export default Home