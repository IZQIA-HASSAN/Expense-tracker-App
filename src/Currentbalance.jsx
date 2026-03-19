import React from 'react'

const Currentbalance = ({income ,setIcnome}) => {
  return (
    <div>
        <div className='border-4 border-blue-600 h-45 w-70 p-5 rounded-md  shadow-2xl'>
<p className='font-light'>Current balance</p>
<h1 className='text-3xl text-blue-600 font-bold p-2'> ${income}</h1>
</div>
    </div>
  )
}

export default Currentbalance