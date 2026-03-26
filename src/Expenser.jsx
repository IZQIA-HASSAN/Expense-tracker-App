import React, { useEffect, useState } from 'react'
import cross from "./assets/cross.svg"

const Expenser = ({ expenses, setExpense, transaction, setTransaction, editTransaction, setEditTransaction }) => {
  const [showExpense, setShowExpense] = useState(false)
  const [formData, setFormData] = useState({ name: "", amount: "", category: "", date: "" })

  // Open modal with pre-filled data if editing
  useEffect(() => {
    if (editTransaction && editTransaction.type === "expense") {
      setShowExpense(true)
      setFormData({
        name: editTransaction.name,
        amount: editTransaction.amount,
        category: editTransaction.category,
        date: editTransaction.date
      })
    }
  }, [editTransaction])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, amount, category, date } = formData
    const numAmount = Number(amount)
    if (!name || isNaN(numAmount) || numAmount <= 0) return

    if (editTransaction) {
      // Update existing expense
      setExpense(prev => prev.map(exp =>
        exp.id === editTransaction.id
          ? { ...exp, name, amount: numAmount, category, date }
          : exp
      ))
      setTransaction(prev => prev.map(t =>
        t.id === editTransaction.id
          ? { ...t, name, amount: numAmount, category, date }
          : t
      ))
      setEditTransaction(null)
    } else {
      // Add new expense
      const newExpense = {
        id: Date.now(),
        name,
        amount: numAmount,
        category,
        date
      }
      setExpense(prev => [...prev, newExpense])
      setTransaction(prev => [...prev, { ...newExpense, type: "expense" }])
    }

    setFormData({ name: "", amount: "", category: "", date: "" })
    setShowExpense(false)
  }

  const totalExpense = expenses.reduce((acc, exp) => acc + exp.amount, 0)

  return (
    <div>
      <div className='border-4 border-red-600 h-45 w-70 p-5 rounded-md shadow-2xl'>
        <p className='font-light'>Total Expenses</p>
        <h1 className='text-2xl text-red-600 font-bold p-2'>${totalExpense}</h1>
        <button
          onClick={() => setShowExpense(true)}
          className='bg-red-100 h-10 w-full rounded-md mt-4 text-red-600 font-bold transition-all ease-out duration-150 hover:scale-105 hover:bg-red-100'
        >
          Add Expense
        </button>

        {showExpense && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-40">
            <div className="h-[500px] w-[450px] bg-white rounded-2xl shadow-xl">

              <div className="border-b border-gray-300 h-15 flex justify-between items-center">
                <h1 className="p-3 text-2xl font-bold">{editTransaction ? "Edit Expense" : "Add Expense"}</h1>
                <button
                  className="rounded-full hover:bg-gray-300 mr-4 p-2 transition"
                  onClick={() => {
                    setShowExpense(false)
                    setEditTransaction(null)
                  }}
                >
                  <img className="h-5" src={cross} alt="" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col p-3">
                <div className="flex flex-col p-3">
                  <label className="text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="eg. Starbucks, Rent, Groceries"
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
                  <label className="text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="border border-gray-300 h-10 rounded-md focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="utilities">Utilities</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="shopping">Shopping</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
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
                    {editTransaction ? "Update Expense" : "Save Expense"}
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

export default Expenser