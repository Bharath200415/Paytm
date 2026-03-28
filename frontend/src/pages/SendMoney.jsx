import React from 'react'
import { useSearchParams } from 'react-router-dom'; //used to select specific content from the url (req.query)
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SendMoney = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    const [success,setSuccess] = useState(false);
    const [error,setError] = useState("");

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-2">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="px-6 pb-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4 py-3">
                    <div class="space-y-2">
                    <label
                        className="text-sm mb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={() => {

                      try{
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("paytmToken")
                                }
                        })
                        setSuccess(true);
                        
                        setTimeout(() => {
                          setSuccess(false);
                        }, 2000);

                        setTimeout(()=>{
                          navigate("/dashboard");
                        },2500)

                      }catch(err){
                        setError(err.response.data.message);
                        console.log(err.response.data.message);
                        setTimeout(()=>{
                          setError("");
                        },3000)
                      }
   

                    }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
      {success && (
        <div className="fixed z-10 top-4 left-1/2 -translate-x-1/2 bg-green-500  text-white px-4 py-2 rounded-md shadow-md">
          Transaction Successfull!
        </div>
      )}
      {error && (
        <div className="fixed z-10 top-4 left-1/2 -translate-x-1/2 bg-red-400  text-white px-4 py-2 rounded-md shadow-md">
          {error}
        </div>
      )}
    </div>
}