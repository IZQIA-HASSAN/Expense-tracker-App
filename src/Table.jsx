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

  // Toggle sort: same key flips direction, new key starts asc
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

  // Apply sorting on top of filtering
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
      // category — alphabetical, case-insensitive
      aVal = aVal?.toLowerCase()
      bVal = bVal?.toLowerCase()
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  // Returns ↑ or ↓ arrow when that column is active
  const SortArrow = ({ colKey }) => {
    if (sortConfig.key !== colKey) return <img className='h-4' src={arrow} alt="" />
    return <span className="text-blue-500 font-bold">{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
  }

  return (
    <div>
      <div className='flex justify-center mb-10'>
        <div className="w-[1300px] gap-2 rounded-md flex flex-col justify-between">

          <nav className='flex bg-white shadow-2xl justify-between h-20 w-full items-center'>
            <div className='ml-5 flex gap-2'>
              <div className='border rounded-md flex items-center'>
                <img src={search} className='h-8 p-2 flex justify-center items-center' alt="" />
                <input
                  className='focus:outline-none w-80 rounded-md h-10 p-2'
                  type="text"
                  placeholder='Search by name...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select className='border h-10 rounded-md p-2' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className='shadow-2xl bg-white flex gap-10 mr-5'>
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
      </div>
    </div>
  )
}

export default Table