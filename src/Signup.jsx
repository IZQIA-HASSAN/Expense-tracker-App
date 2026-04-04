import React, { useState } from 'react'
import google from './assets/google.svg'
import hide from "./assets/hide.svg"
// import show from "./assets/Show.svg"
import expense from "./assets/expense.png"
import {Link, useNavigate} from "react-router-dom"
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const Signup = () => {
    const navigate = useNavigate();
   const handleGoogleSignup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const googleUser = {
      username: user.displayName,
      email: user.email,
    };

    localStorage.setItem("currentuser", JSON.stringify(googleUser));
    navigate("/");
  } catch (error) {
    console.log(error); // ← change alert to console.log
    alert(error.message); // ← show real error message
  }
};
    const [FormData , setFormData] = useState({
        username:"",
        email:"",
        password:""
    })


    const Handlesignup = (e)=>{
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        //Check if email already exist
        if(users.some(u => u.email === FormData.email)){
            alert("Email already exist");
            return ;
        }
        //otherwise save new user 
        const newUser = {
            username:FormData.username,
            email:FormData.email,
            password:FormData.password
        }
        users.push(newUser);
        localStorage.setItem("users" , JSON.stringify(users));
        alert("signup successful")
        navigate("/Login")
    }

  return (
    <div className='flex min-h-screen bg-gray-300'>
      {/* Image - hidden on mobile, visible on large screens */}
      <img className='hidden lg:block lg:w-1/2 object-cover' src={expense} alt="" />

      {/* Form */}
      <form action="" className='flex flex-col flex-1 items-center justify-center bg-white rounded-3xl p-6'>
        <div className=' flex flex-col gap-8 justify-center items-center w-full max-w-md min-h-screen rounded-3xl p-8'>
          
          <legend className='font-bold text-3xl'>Signup</legend>

          <input value={FormData.username} onChange={(e)=> setFormData({...FormData , username:e.target.value})} className='border rounded-md p-1 h-9 w-full' type="text" placeholder='Enter username' />

          <input value={FormData.email} onChange={(e)=> setFormData({...FormData , email:e.target.value})}  className='border rounded-md p-1 h-9 w-full' type="email" placeholder='Enter Email' />

          <span className='border rounded-md p-1 h-9 w-full flex justify-around'>
            <input value={FormData.password} name='password' onChange={(e)=> setFormData({...FormData , password:e.target.value})}  className='w-full focus:outline-none' type="password" placeholder='Enter password' />
            <button  type="button" className='transition-all duration-100 ease-out scale-95 active:scale-100'>
              <img  src={hide} className='w-7' alt="" />
            </button>
          </span>

          <button onClick={Handlesignup} className='text-white bg-blue-500 w-full h-10 rounded-md transition-all duration-100 ease-out scale-95 active:scale-100'>
            Signup
          </button>

          <button onClick={handleGoogleSignup} type="button" className='w-full h-10 flex justify-center items-center bg-gray-300 rounded-md shadow-2xl transition-all duration-100 ease-out scale-95 active:scale-100'>
            <img src={google} className='w-7' alt="" />
          </button>

          <p>Already have an account? 
            <Link to="/Login"><span className='text-blue-500'>Login</span></Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup