import React from 'react'
import { Heading } from '@/components/Heading'
import { InputBox } from '@/components/InputBox'
import { Button } from '@/components/Button'
import { BottomWarning } from '@/components/BottomWarning'
import { SubHeading } from '@/components/SubHeading'

export const Signin = () => {
  return (
    <div className='bg-white min-h-screen w-full flex justify-center mx-auto '>
        <div className='flex flex-col justify-center '>
            <div className='rounded-lg w-100 shadow-sm shadow-neutral-300 px-5 h-auto py-5 text-center bg-neutral-100'>
                <Heading label={"Log In"}/>
                <SubHeading label={"Create a new account instantly "}/>
                <InputBox placeholder="John" label={"First Name"}/>
                <InputBox placeholder="Doe" label={"Second Name"}/>
                <InputBox placeholder="bharath@123" label={"Email"}/>
                <InputBox placeholder="123453" label={"Password"}/>    
                <Button label={"Submit"}/>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />

            </div>

        </div>

    </div>
  )
}
