import React from 'react'
import { Users } from '@/components/Users'
import { Navbar } from '@/components/Navbar'
import { Balance } from '@/components/Balance'

export const Dashboard = () => {
  return (

    <div>
        <Navbar />
        <div className="m-8">
            <Balance />
            <Users />
        </div>
    </div>
  )
}
