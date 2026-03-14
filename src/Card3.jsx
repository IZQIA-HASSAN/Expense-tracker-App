import React, { useState } from 'react'
import cross from "./assets/cross.svg"
const Card3 = () => {
    const [ budget , setBudget] = useState(false)
  return (
    <div>
        <div className='border-4 border-purple-600 h-45 w-70 p-5 rounded-md shadow-2xl '>
<p className='font-light'>Budget manager</p>
<h1 className='text-2xl text-purple-600 font-bold p-2'> 2 category limits</h1>
<button className='bg-purple-100 h-10 w-full rounded-md  text-purple-600 font-bold mt-4 transition-all ease-out duration-150 hover:scale-105 hover:bg-purple-100'>Set budget</button>
{budget &&(
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-40">
    
    <div className="h-[410px] w-[450px] bg-white rounded-2xl shadow-xl">
    
      <div className="border-b border-gray-300 h-15 flex justify-between items-center">
        <h1 className="p-3 text-2xl font-bold">Add income</h1>
    
        <button
          className="rounded-full hover:bg-gray-300 mr-4 p-2 transition"
          onClick={()=>setBudget(false)}
        >
          <img className="h-5" src={cross} alt="" />
        </button>
      </div>
    
      <div className="flex flex-col">
    
        <div className="flex flex-col p-3">
          <label className="text-sm font-medium mb-1">Name</label>
          <input className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none "
          type="text" placeholder="eg. Salary, Freelance" />
        </div>
    
        <div className="flex flex-col p-3">
          <label className="text-sm font-medium mb-1">Amount ($)</label>
          <input className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none "
          type="number" placeholder="0.0" />
        </div>
    
        <div className="flex flex-col p-3">
          <label className="text-sm font-medium mb-1">Date</label>
          <input className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none  "
          type="date" />
        </div>
    
        <div className="flex justify-center mt-5 px-3">
          <button className="w-full transition-all ease-out duration-100 hover:scale-101 rounded-md h-10 bg-blue-600 hover:bg-blue-700 text-white">
            Save income
          </button>
        </div>
    
      </div>
    
    </div>
    
    </div>
    
)}
</div>
    </div>
  )
}

export default Card3