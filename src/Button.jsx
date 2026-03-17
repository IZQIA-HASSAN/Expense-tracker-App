import React from 'react'

const Button = () => {
  return (
    <div className='flex  p-2 ml-35 mt-5 gap-7'>
        <button className=' rounded-md w-30 h-9 bg-slate-400 font-semibold'>import CSV</button>
        <button className=' rounded-md w-30 h-9 bg-slate-400 font-semibold'>Export CSV</button>

    </div>
  )
}

export default Button