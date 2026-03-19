import React from 'react'
import search from "./assets/search.svg"
import arrow from "./assets/arrrow.svg"

const Table = () => {
    return (
        <div>
            <div className='flex justify-center mb-10'>
                <div className="w-[1300px] gap-2 rounded-md flex flex-col justify-between">
                    
                    <nav className='flex bg-white shadow-2xl justify-between h-20 w-full items-center'>
                        <div className='ml-5 flex gap-2'>
                            <div className='border rounded-md flex items-center'>
                                <img src={search} className='h-8 p-2 flex justify-center items-center' alt="" />
                                <input className='focus:outline-none w-80 rounded-md h-10 p-2' type="text" placeholder='Search by name...' />
                            </div>
                            <select className='border h-10 rounded-md p-2' name="" id="">
                                <option value="">All type</option>
                                <option value="">income</option>
                                <option value="">expense</option>
                            </select>
                        </div>
                        <div className='shadow-2xl bg-white flex gap-10 mr-5'>
                            <span className='font-light text-gray-500'>sort by:</span>
                            <button className='flex justify-center items-center p-1 rounded-md text-gray-500 font-light hover:bg-gray-200'>category <img className='h-4' src={arrow} alt="" /></button>
                            <button className='flex justify-center items-center p-1 rounded-md text-gray-500 font-light hover:bg-gray-200'>Date <img className='h-4' src={arrow} alt="" /></button>
                            <button className='flex justify-center items-center p-1 rounded-md text-gray-500 font-light hover:bg-gray-200'>Amount <img className='h-4' src={arrow} alt="" /></button>
                        </div>
                    </nav>

                    <table className="w-full">
                        <thead>
                            <tr className='flex justify-around'>
                                <th className='text-gray-500'>NAME</th>
                                <th className='text-gray-500'>CATEGORY</th>
                                <th className='text-gray-500'>TYPE</th>
                                <th className='text-gray-500'>DATE</th>
                                <th className='text-gray-500'>AMOUNT</th>
                                <th className='text-gray-500'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* rows go here */}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default Table