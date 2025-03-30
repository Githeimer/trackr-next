"use client"
import { AuthState, useAuthStore } from '@/store/store'
import React from 'react'

const Dashboard = () => {
    const {user,logout}=useAuthStore() as AuthState;
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard