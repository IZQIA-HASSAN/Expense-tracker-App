import React, { useState } from 'react'
import hide from "./assets/hide.svg"
// import show from "./assets/Show.svg"
import expense from "./assets/expense.png"
import {Link , useNavigate}  from "react-router-dom"

const Login = () => {
    // const [loggedin , setLoggedin] = useState("")
    const navigate = useNavigate();
    const [FormData , setFormData] = useState({
        email:"",
        password:""
    })
    const Handlechange = (e) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
}

     const Handlelogin =(e)=>{
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === FormData.email && u.password === FormData.password)

        if(!user){
            alert("credentials are wrong !")
            return
       
        
        }
        localStorage.setItem("currentuser" , JSON.stringify(user))
        alert(`welcome back ${user.username}`)
  
        navigate("/")
        
    }
  return (
     <div className='flex min-h-screen bg-gray-300'>
          {/* Image - hidden on mobile, visible on large screens */}
          <img className='hidden lg:block lg:w-1/2 object-cover' src={expense} alt="" />
    
          {/* Form */}
          <form action="" className='flex flex-col flex-1 items-center justify-center bg-white rounded-3xl p-6'>
            <div className=' flex flex-col gap-8 justify-center items-center w-full max-w-md min-h-screen rounded-3xl p-8'>
              
              <legend className='font-bold text-3xl'>Login</legend>
    
              {/* <input className='border rounded-md p-1 h-9 w-full' type="text" placeholder='Enter username' /> */}
    
              <input name='email' value={FormData.email} onChange={Handlechange} className='border rounded-md p-1 h-9 w-full' type="email" placeholder='Enter Email' />
    
              <span className='border rounded-md p-1 h-9 w-full flex justify-around'>
                <input name='password' value={FormData.password} onChange={Handlechange} className='w-full focus:outline-none' type="password" placeholder='Enter password' />
                <button type="button" className='transition-all duration-100 ease-out scale-95 active:scale-100'>
                  <img src={hide} className='w-7' alt="" />
                </button>
              </span>
    
              <button onClick={Handlelogin} className='text-white bg-blue-500 w-full h-10 rounded-md transition-all duration-100 ease-out scale-95 active:scale-100'>
                Login
              </button>
    
              {/* <button type="button" className='w-full h-10 flex justify-center items-center bg-gray-300 rounded-md shadow-2xl'>
                <img src={google} className='w-7' alt="" />
              </button> */}
    
              <p>Donot have an account? <Link to={"/Signup"}><span className='text-blue-500'>Signup</span></Link></p>
            </div>
          </form>
        </div>
  )
}

export default Login