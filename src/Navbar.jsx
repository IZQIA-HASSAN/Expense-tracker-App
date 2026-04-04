import React, { useState } from 'react'
import logo from './assets/logo.png'
import logout from "./assets/logout.svg"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem("currentuser"))

    const Handlelogout = () => {
        localStorage.removeItem("currentuser")
        navigate("/Signup")
    }

    return (
        <div className='shadow-md w-full bg-white'>
            {/* Main bar */}
            <div className='flex justify-between md:justify-around items-center px-4 md:px-0'>
                {/* Logo */}
                <div className='flex items-center h-17'>
                    <img src={logo} className='h-20 w-20' alt="" />
                    <h1 className='text-2xl font-bold'>Expensify</h1>
                </div>

                {/* Hamburger button — visible only on mobile */}
                <button
                    className='md:hidden flex flex-col justify-center items-center gap-1.5 p-2'
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>

                {/* Nav items — hidden on mobile, visible on md+ */}
                <ul className='hidden md:flex gap-3 justify-center items-center'>
                    <li>Welcome,</li>
                    <li className='text-blue-500 font-bold'>{user?.username}</li>

                    <div className='h-10 rounded-full flex justify-center items-center w-10 border-gray-600 hover:bg-gray-500 transition-all ease-out duration-100 scale-100 active:scale-90'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="white"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-moon text-slate-600"
                            aria-hidden="true"
                        >
                            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                        </svg>
                    </div>

                    <li onClick={Handlelogout} className='font-bold flex items-center gap-3 cursor-pointer'>
                        <img src={logout} className='h-10 flex' alt="" />
                        Logout
                    </li>
                </ul>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <ul className='flex flex-col md:hidden gap-3 px-6 pb-4'>
                    <li>Welcome,</li>
                    <li className='text-blue-500 font-bold'>{user?.username}</li>

                    <li className='flex items-center gap-2'>
                        <div className='h-10 rounded-full flex justify-center items-center w-10 border-gray-600 hover:bg-gray-500 transition-all ease-out duration-100 scale-100 active:scale-90'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="white"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-moon text-slate-600"
                                aria-hidden="true"
                            >
                                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                            </svg>
                        </div>
                        <span className='text-sm text-gray-600'>Toggle theme</span>
                    </li>

                    <li onClick={Handlelogout} className='font-bold flex items-center gap-3 cursor-pointer'>
                        <img src={logout} className='h-10 flex' alt="" />
                        Logout
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Navbar