import React, { useEffect, useState } from 'react'
import axios from "axios";

export const Navbar = () => {
        const [val,setVal] = useState("");
        const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        async function getUser(){
            try{
                const token = localStorage.getItem("paytmToken");
                const response = await axios.get(`${BASE_URL}/api/v1/account/balance`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }) 
                setVal(response.data.firstName);
            }catch(err){
                console.log(err);
            }
        }
        getUser();

    },[])
    const K = val?.[0]?.toUpperCase() || "?";
  return (
<div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center text-lg h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {K}
                </div>
            </div>
        </div>
    </div>
  )
}
