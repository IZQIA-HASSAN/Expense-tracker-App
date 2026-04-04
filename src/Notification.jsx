import React, { useEffect } from 'react'

const Notification = ({message , type , onclose }) => {
    useEffect(()=>{
        const timer = setTimeout(() => {
            onclose();
        }, duration);
        return ()=> clearTimeout(timer) 
    },[onclose ,3000])
  return (
    <div className='border bg-black' style={{ backgroundColor: type === "success" ? '#4caf50' : '#f44336'}}>
{message}
    </div>
  )
}

export default Notification