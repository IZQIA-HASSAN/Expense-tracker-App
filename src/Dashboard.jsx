import React from 'react'

const Dashboard = () => {
  return (
    <div className=' flex gap-10 items-center justify-center mt-10'>
        {/* no one div */}
<div className='border-4 border-blue-600 h-45 w-70 p-5 rounded-md  shadow-2xl'>
<p className='font-light'>Current balance</p>
<h1 className='text-3xl text-blue-600 font-bold p-2'> $0.00</h1>
</div>
{/* no 2 div */}
<div className='border-4 border-green-600 h-45 w-70 p-5 rounded-md shadow-2xl '>
<p className='font-light'>Total income</p>
<h1 className='text-2xl text-green-600 font-bold p-2 '> $0.00</h1>
<button className='bg-green-100 h-10 w-full text-green-600 font-bold rounded-md mt-4 transition-all ease-out duration-150 hover:scale-105 hover:bg-green-100 '>Add income</button>
</div>
{/* no 3 div */}
<div className='border-4 border-red-600 h-45 w-70 p-5 rounded-md shadow-2xl '>
<p className='font-light'>Total Expenses</p>
<h1 className='text-2xl text-red-600 font-bold p-2'> $0.00</h1>
<button className='bg-red-100 h-10 w-full rounded-md mt-4 text-red-600 font-bold transition-all ease-out duration-150 hover:scale-105 hover:bg-red-100'>Add Expense</button>

</div>
{/* no 4 div */}
<div className='border-4 border-purple-600 h-45 w-70 p-5 rounded-md shadow-2xl '>
<p className='font-light'>Budget manager</p>
<h1 className='text-2xl text-purple-600 font-bold p-2'> 2 category limits</h1>
<button className='bg-purple-100 h-10 w-full rounded-md  text-purple-600 font-bold mt-4 transition-all ease-out duration-150 hover:scale-105 hover:bg-purple-100'>Set budget</button>

</div>
    </div>
  )
}

export default Dashboard