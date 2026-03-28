import { useState,useEffect } from "react";
import axios from "axios";

export const Balance = () => {
    const [val,setVal] = useState(0);
    
    useEffect(()=>{

        async function getBalance(){
            try{
                const token = localStorage.getItem("paytmToken");
                const response = await axios.get(
                    "http://localhost:3000/api/v1/account/balance",
                    {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    }
                );

                setVal(response.data.balance);
            }catch(err){
                console.log(err);
            }
        }
        getBalance();
    },[])


    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {val}
        </div>
    </div>
}