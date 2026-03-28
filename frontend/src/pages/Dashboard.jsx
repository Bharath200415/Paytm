import React from 'react'
import { Users } from '@/components/Users'
import { Appbar } from '@/components/Appbar'
import { Balance } from '@/components/Balance'

export const Dashboard = () => {
  return (

    <div>
        <Appbar />
        <div className="m-8">
            <Balance />
            <Users />
        </div>
    </div>
  )
}
