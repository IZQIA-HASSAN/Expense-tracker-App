import React, { useState } from 'react'
import search from "./assets/search.svg"
import arrow from "./assets/arrrow.svg"
import dustbin from './assets/dustbin.svg'
import edit from "./assets/edit.svg"

const Table = ({ transaction, setTransaction, setEditTransaction, expenses, setExpense, income, setIncome }) => {

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

  const handleDelete = (t) => {
    setTransaction(prev => prev.filter(item => item.id !== t.id))
    if (t.type === "income") {
      setIncome(prev => prev - t.amount)
    } else if (t.type === "expense") {
      setExpense(prev => prev.filter(item => item.id !== t.id))
    }
  }

  const handleEdit = (t) => {
    setEditTransaction(t)
  }

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    )
  }

  const filteredTransactions = transaction.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || t.type === filterType
    return matchesSearch && matchesType
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig.key) return 0

    let aVal = a[sortConfig.key]
    let bVal = b[sortConfig.key]

    if (sortConfig.key === "date") {
      aVal = new Date(aVal)
      bVal = new Date(bVal)
    } else if (sortConfig.key === "amount") {
      aVal = Number(aVal)
      bVal = Number(bVal)
    } else {
      aVal = aVal?.toLowerCase()
      bVal = bVal?.toLowerCase()
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  const SortArrow = ({ colKey }) => {
    if (sortConfig.key !== colKey) return <img className='h-4' src={arrow} alt="" />
    return <span className="text-blue-500 font-bold">{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
  }

  return (
    <div>
      <div className='flex justify-center mb-10'>
        <div className="w-full max-w-[1300px] gap-2 rounded-md flex flex-col justify-between px-2 sm:px-4">

          <nav className='flex bg-white shadow-2xl flex-col sm:flex-row justify-between min-h-20 w-full items-center gap-3 py-3 sm:py-0'>
            <div className='ml-0 sm:ml-5 flex flex-col sm:flex-row gap-2 w-full sm:w-auto px-3 sm:px-0'>
              <div className='border rounded-md flex items-center'>
                <img src={search} className='h-8 p-2 flex justify-center items-center' alt="" />
                <input
                  className='focus:outline-none w-full sm:w-80 rounded-md h-10 p-2'
                  type="text"
                  placeholder='Search by name...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select className='border h-10 rounded-md p-2 w-full sm:w-auto' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className='shadow-2xl bg-white flex gap-3 sm:gap-10 mr-0 sm:mr-5 px-3 sm:px-0 w-full sm:w-auto justify-start sm:justify-end'>
              <span className='font-light text-gray-500'>sort by:</span>
              <button onClick={() => handleSort("category")} className='flex justify-center items-center p-1 rounded-md text-gray-500 font-light hover:bg-gray-200'>
                Category <SortArrow colKey="category" />
              </button>
              <button onClick={() => handleSort("date")} className='flex justify-center items-center p-1 rounded-md text-gray-500 font-light hover:bg-gray-200'>
                Date <SortArrow colKey="date" />
              </button>
              <button onClick={() => handleSort("amount")} className='flex justify-center items-center p-1 rounded-md text-gray-500 font-light hover:bg-gray-200'>
                Amount <SortArrow colKey="amount" />
              </button>
            </div>
          </nav>

          {/* Desktop table */}
          <div className='hidden sm:block'>
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
                {sortedTransactions.map(t => (
                  <tr className='flex justify-around items-center mr-10 h-15 hover:bg-gray-200 w-full' key={t.id}>
                    <td className='font-bold'>{t.name}</td>
                    <td className='font-light'>{t.category}</td>
                    <td className='border w-15 rounded-2xl text-sm flex justify-center'>{t.type}</td>
                    <td className='font-light'>{t.date}</td>
                    <td>{t.type === "income" ? `+$${t.amount}` : `-$${t.amount}`}</td>
                    <td className='flex gap-4'>
                      <button onClick={() => handleEdit(t)}>
                        <img className='w-6' src={edit} alt="Edit" />
                      </button>
                      <button onClick={() => handleDelete(t)}>
                        <img className='w-6' src={dustbin} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
                {sortedTransactions.length === 0 && (
                  <tr>
                    <td colSpan="6" className='text-center p-4 text-gray-500'>
                      No matching transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className='flex sm:hidden flex-col gap-3 mt-2'>
            {sortedTransactions.map(t => (
              <div key={t.id} className='bg-white rounded-md shadow p-4 flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                  <span className='font-bold text-base'>{t.name}</span>
                  <span className={`text-sm font-semibold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                    {t.type === "income" ? `+$${t.amount}` : `-$${t.amount}`}
                  </span>
                </div>
                <div className='flex justify-between text-sm text-gray-500'>
                  <span>{t.category}</span>
                  <span>{t.date}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='border rounded-2xl text-xs px-2 py-0.5 text-gray-600'>{t.type}</span>
                  <div className='flex gap-4'>
                    <button onClick={() => handleEdit(t)}>
                      <img className='w-5' src={edit} alt="Edit" />
                    </button>
                    <button onClick={() => handleDelete(t)}>
                      <img className='w-5' src={dustbin} alt="Delete" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {sortedTransactions.length === 0 && (
              <p className='text-center p-4 text-gray-500'>No matching transactions found</p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Table