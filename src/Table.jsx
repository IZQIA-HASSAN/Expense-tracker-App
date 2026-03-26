import React, { useState } from 'react'
import search from "./assets/search.svg"
import arrow from "./assets/arrrow.svg"
import dustbin from './assets/dustbin.svg'
import edit from "./assets/edit.svg"

const Table = ({ transaction, setTransaction, setEditTransaction, expenses, setExpense, income, setIncome }) => {

    const [searchTerm , setSearchTerm] = useState("")

  const handleDelete = (t) => {
    // Remove from transaction list
    setTransaction(prev => prev.filter(item => item.id !== t.id))

    // Remove from respective income/expense list
    if (t.type === "income") {
      setIncome(prev => prev - t.amount) // decrease total income
    } else if (t.type === "expense") {
      setExpense(prev => prev.filter(item => item.id !== t.id))
    }
  }

  const handleEdit = (t) => {
    setEditTransaction(t)
  }
  const filterTransactions = transaction.filter(t=>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className='flex justify-center mb-10'>
        <div className="w-[1300px] gap-2 rounded-md flex flex-col justify-between">

          <nav className='flex bg-white shadow-2xl justify-between h-20 w-full items-center'>
            <div className='ml-5 flex gap-2'>
              <div className='border rounded-md flex items-center'>
                <img src={search} className='h-8 p-2 flex justify-center items-center' alt="" />
                <input className='focus:outline-none w-80 rounded-md h-10 p-2' type="text" placeholder='Search by name...' 
                
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                />
              </div>
              <select className='border h-10 rounded-md p-2' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}>
                <option value="">All type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
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
              {filterTransactions.map(t => (
                <tr className='flex justify-around items-center mr-10 h-15 hover:bg-gray-200 w-full' key={t.id}>
                  <td className='font-bold'>{t.name}</td>
                  <td className='font-light'>{t.category}</td>
                  <td className='border w-15 rounded-2xl text-sm flex justify-center'>{t.type}</td>
                  <td className='font-light'>{t.date}</td>
                  <td className=''>{t.type === "income" ? `+$${t.amount}` : `-$${t.amount}`}</td>
                  <td className='flex gap-4'>
                    <span>
                      <button onClick={() => handleEdit(t)}>
                        <img className='w-6' src={edit} alt="Edit" />
                      </button>
                    </span>
                    <span>
                      <button onClick={() => handleDelete(t)}>
                        <img className='w-6' src={dustbin} alt="Delete" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
                 {filterTransactions.length === 0 && (
                <tr>
                  <td colSpan="6" className='text-center p-4 text-gray-500'>
                    No matching transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default Table