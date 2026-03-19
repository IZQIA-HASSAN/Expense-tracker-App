import React from 'react'
import logo from './assets/logo.png'
import logout from "./assets/logout.svg"

const Navbar = () => {
    return (
        <div className=' flex justify-around shadow-md w-full bg-white '>
            <li className='flex items-center  h-17'><img src={logo} className='h-20 w-20' alt="" /><h1 className='text-2xl font-bold'>Expensify</h1></li>
            <ul className=' flex gap-3 justify-center items-center' >
                <li>Welcome,</li>
                <li className='text-blue-500 font-bold'>izqia ul hassan </li>
               <div className=' h-10 rounded-full flex justify-center items-center w-10 border-gray-600 hover:bg-gray-500 transition-all ease-out duration-100 scale-100 active:scale-90'> <li className=''>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon text-slate-600 __web-inspector-hide-shortcut__" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>
                </li></div>
                <li className='font-bold flex items-center gap-3'><img src={logout} className='h-10 flex ' alt="" />Logout </li>

            </ul>

        </div>
    )
}

export default Navbar