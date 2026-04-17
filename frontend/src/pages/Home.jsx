import React, { useState, useEffect } from "react";

function useInterval(fn, n){
    useEffect(()=>{
        const id = setInterval(()=>{
            fn();
        },n*1000);
        return () => {
            clearInterval(id);
        };
    },[])

}
 
//creating a debounce hook
function useDebounce(inputVal,delay){
    const [debounceValue, setDebounceValue] = useState(inputVal);

    useEffect(()=>{
        //set up a timer to update the debounced value after the specified delay
        const timerId = setTimeout(()=>{
            setDebounceValue(inputVal);
        },delay)

    //clean up the timer if the value changes before the delay has passed
    return ()=>clearTimeout(timerId);
    },[debounceValue,delay]);

    return debounceValue;

}

export const Home = ()=>{
    const [count,setCount] = useState(0);

    useInterval(()=>{
        setCount(c=>c+1);
    },1)
        return <div>
            Your current value is : {count}
        </div>
}