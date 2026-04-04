import React, { useEffect, useState } from 'react'
import cross from "./assets/cross.svg"
import Notification from './Notification'

const Showincome = ({ income, setIncome, transaction, setTransaction, editTransaction, setEditTransaction , notification , setNotification }) => {
  
  const [showIncome, setShowIncome] = useState(false)
  const [formData, setFormData] = useState({ name: "", amount: "", date: "" })

  // Open modal in edit mode
  useEffect(() => {
    if (editTransaction && editTransaction.type === "income") {
      setShowIncome(true)
      setFormData({
        name: editTransaction.name,
        amount: editTransaction.amount,
        date: editTransaction.date
      })
    }
  }, [editTransaction])

  const handleIncomeSubmit = (e) => {
    e.preventDefault()
    const { name, amount, date } = formData
    const numAmount = Number(amount)
    if (!name || isNaN(numAmount) || numAmount <= 0) return

    if (editTransaction) {
      // Update existing transaction
      setTransaction(prev => prev.map(t =>
        t.id === editTransaction.id
          ? { ...t, name, amount: numAmount, date }
          : t
      ))
      // Update income total
      const oldAmount = editTransaction.amount
      setIncome(prev => prev - oldAmount + numAmount)
      setEditTransaction(null)
      setNotification({message : "income updated" , type:'success'})
    } else {
      // Add new transaction
      const newTransaction = {
        id: Date.now(),
        name,
        amount: numAmount,
        category: "income",
        type: "income",
        date
      }
      setTransaction(prev => [...prev, newTransaction])
      setIncome(prev => prev + numAmount)
    }

    // Reset form and close modal
    setFormData({ name: "", amount: "", date: "" })
    setShowIncome(false)
  }

  return (
    <div className=''>
      <div className='border-4 border-green-600 h-45 w-70 p-5 rounded-md shadow-2xl'>
        <p className='font-light'>Total Income</p>
        <h1 className='text-2xl text-green-600 font-bold p-2'>${income}</h1>
        <button
          onClick={() => setShowIncome(true)}
          className='bg-green-100 h-10 w-full text-green-600 font-bold rounded-md mt-4 transition-all ease-out duration-150 hover:scale-105 hover:bg-green-100'
        >
          Add Income
        </button>
       

        {showIncome && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-40">
            <div className="h-[410px] w-[450px] bg-white rounded-2xl shadow-xl">
              <div className="border-b border-gray-300 h-15 flex justify-between items-center">
                <h1 className="p-3 text-2xl font-bold">
                  {editTransaction ? "Edit Income" : "Add Income"}
                </h1>
                <button
                  className="rounded-full hover:bg-gray-300 mr-4 p-2 transition"
                  onClick={() => {
                    setShowIncome(false)
                    setEditTransaction(null)
                  }}
                >
                  <img className="h-5" src={cross} alt="" />
                </button>
              </div>

              <form onSubmit={handleIncomeSubmit}>
                <div className="flex flex-col p-3">
                  <label className="text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="eg. Salary, Freelance"
                    className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col p-3">
                  <label className="text-sm font-medium mb-1">Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.0"
                    className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col p-3">
                  <label className="text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none"
                  />
                </div>

                <div className="flex justify-center mt-5 px-3">
                  <button
                    type='submit'
                    className="w-full transition-all ease-out duration-100 hover:scale-101 rounded-md h-10 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editTransaction ? "Update Income" : "Save Income"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Showincome