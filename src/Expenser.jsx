import React, { useState } from 'react'
import cross from "./assets/cross.svg"

const Expenser = ({expenses , setExpense}) => {
    const [showexpense , setShowexpense] = useState(false)

  const handlesubmit = () =>{
    e.preventDefault();
const amount = Number(e.target.amount.value)
if(isNaN(amount || amount <= 0)) return
setExpense(prev => prev + amount)
e.target.reset()
setShowexpense(false)

  }
  return (
    <div>
        <div className='border-4 border-red-600 h-45 w-70 p-5 rounded-md shadow-2xl '>
<p className='font-light'>Total Expenses</p>
<h1 className='text-2xl text-red-600 font-bold p-2'> ${expenses}</h1>
<button onClick={()=> setShowexpense(true)} className='bg-red-100 h-10 w-full rounded-md mt-4 text-red-600 font-bold transition-all ease-out duration-150 hover:scale-105 hover:bg-red-100'>Add Expense</button>
{showexpense &&(
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-40">
  
  <div className="h-[500px] w-[450px] bg-white rounded-2xl shadow-xl">
  
    <div className="border-b border-gray-300 h-15 flex justify-between items-center">
      <h1 className="p-3 text-2xl font-bold">Add income</h1>
  
      <button
        className="rounded-full hover:bg-gray-300 mr-4 p-2 transition"
        onClick={()=>setShowexpense(false)}
      >
        <img className="h-5" src={cross} alt="" />
      </button>
    </div>
  
    <div className="flex flex-col">

      <form onSubmit={handlesubmit}>  
      <div className="flex flex-col p-3">
        <label className="text-sm font-medium mb-1">Name</label>
        <input className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none "
        type="text" placeholder="eg. Starbucks , rents , groceries" />
      </div>
  
      <div className="flex flex-col p-3">
        <label className="text-sm font-medium mb-1">Amount ($)</label>
        <input className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none "
        type="number" name='amount' placeholder="0.0" />
      </div>
      <div className="flex flex-col p-3">
        <label className="text-sm font-medium mb-1">Category</label>
        <select className='border border-gray-300 h-10 rounded-md focus:outline-none'  name="" id="">
          
            <option value="">select category</option>
          <option value="food">food</option>
          <option value="transport">Transport</option>
          <option value="utilities">utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">health</option>
          <option value="shopping">shopping</option>
          <option value="education">education</option>
          <option value="other">other</option>
          
        </select>
      </div>

      <div className="flex flex-col p-3">
        <label className="text-sm font-medium mb-1">Date </label>
        <input className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none "
        type="date" placeholder="0.0" />
      </div>
  
      
  
      <div className="flex justify-center mt-5 px-3">
        <button className="w-full transition-all ease-out duration-100 hover:scale-101 rounded-md h-10 bg-blue-600 hover:bg-blue-700 text-white">
          Save income
        </button>
      </div>
  </form>
    </div>
  
  </div>
  
  </div>
)}
</div>
    </div>
  )
}

export default Expenser