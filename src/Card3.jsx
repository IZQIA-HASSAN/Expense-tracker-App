import React, { useState } from 'react'
import cross from "./assets/cross.svg"

const Card3 = ({ categoryLimits, setCategoryLimits }) => {
  const [budget, setBudget] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [monthlyBudget, setMonthlyBudget] = useState("")
  const [error, setError] = useState("")

  const handleSave = () => {
    if (!selectedCategory || !monthlyBudget || Number(monthlyBudget) <= 0) {
      setError("Please select a category and enter a valid amount")
      return
    }
    setCategoryLimits(prev => ({
      ...prev,
      [selectedCategory]: Number(monthlyBudget),
    }))
    setSelectedCategory("")
    setMonthlyBudget("")
    setError("")
    setBudget(false)
  }

  const handleClose = () => {
    setSelectedCategory("")
    setMonthlyBudget("")
    setError("")
    setBudget(false)
  }

  return (
    <div>
      <div className='border-4 border-purple-600 h-45 w-70 p-5 rounded-md shadow-2xl'>
        <p className='font-light'>Budget manager</p>
        <h1 className='text-2xl text-purple-600 font-bold p-2'>
          {Object.keys(categoryLimits).length} category limits
        </h1>
        <button
          onClick={() => setBudget(true)}
          className='bg-purple-100 h-10 w-full rounded-md text-purple-600 font-bold mt-4 hover:scale-105'
        >
          Set budget
        </button>

        {budget && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-40">
            <div className="h-[380px] w-[450px] bg-white rounded-2xl shadow-xl">
              <div className="border-b border-gray-200 h-15 flex justify-between items-center p-3">
                <h1 className="text-xl font-bold">Set Monthly Budget</h1>
                <button
                  className="rounded-full hover:bg-gray-300 mr-4 p-2"
                  onClick={handleClose}
                >
                  <img className="h-5" src={cross} alt="close" />
                </button>
              </div>

              <div className="flex flex-col p-4">
                <div className="flex flex-col p-3">
                  <label className="text-sm font-medium mb-1 text-gray-500">Category</label>
                  <select
                    className='border border-gray-300 h-10 rounded-md focus:outline-none px-2'
                    value={selectedCategory}
                    onChange={e => {
                      setSelectedCategory(e.target.value)
                      setError("")
                    }}
                  >
                    <option value="">Select category</option>
                    {["food", "transport", "utilities", "entertainment", "health", "shopping", "education", "other"].map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col p-3">
                  <label className="text-sm font-medium mb-1 text-gray-500">Monthly Budget ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    min="1"
                    className="border border-gray-300 rounded-md h-10 p-2 focus:outline-none"
                    value={monthlyBudget}
                    onChange={e => {
                      setMonthlyBudget(e.target.value)
                      setError("")
                    }}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm px-3">{error}</p>
                )}

                <div className="flex justify-center mt-3 px-3">
                  <button
                    className="w-full rounded-md h-10 bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleSave}
                  >
                    Save Budget
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