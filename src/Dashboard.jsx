import React, { useState, useEffect } from 'react'
import Currentbalance from './Currentbalance'
import Expenser from './Expenser'
import Showincome from './Showincome'
import Notification from './Notification'
import Card3 from './Card3'
import Navbar from "./Navbar"
import Table from "./Table"
import Button from './Button'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js"
import { Bar, Line, Doughnut } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
)

const Dashboard = ({ transaction, setTransaction, editTransaction, setEditTransaction }) => {
    const [notification ,setNotification ] = useState(null)
  

  const [income, setIncome] = useState(() => {
    try {
      const saved = localStorage.getItem("income")
      const parsed = Number(saved)
      return isNaN(parsed) ? 0 : parsed
    } catch {
      return 0
    }
  })

  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem("expenses")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [categoryLimits, setCategoryLimits] = useState(() => {
    try {
      const saved = localStorage.getItem("category")
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('category', JSON.stringify(categoryLimits))
  }, [categoryLimits])

  useEffect(() => {
    localStorage.setItem("income", income)
  }, [income])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  const balance = income - expenses.reduce((acc, exp) => acc + exp.amount, 0)

  // For line chart
  const spendingByDate = expenses.reduce((acc, exp) => {
    const date = exp.date?.slice(0, 10)
    acc[date] = (acc[date] || 0) + exp.amount
    return acc
  }, {})

  // For doughnut + budget progress chart
  const spendingByCategory = expenses.reduce((acc, exp) => {
    const cat = exp.category || "other"
    acc[cat] = (acc[cat] || 0) + exp.amount
    return acc
  }, {})

  const categoryColors = {
    food: "#ff4d6d", transport: "#4361ee", utilities: "#f77f00",
    entertainment: "#7209b7", health: "#2dc653", shopping: "#ff9f1c",
    education: "#3a86ff", other: "#adb5bd"
  }

  // ✅ Budget Progress — horizontal bar chart connected to categoryLimits
  const budgetCategories = Object.keys(categoryLimits)
  const budgetProgressData = {
    labels: budgetCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
    datasets: [
      {
        label: "Actual Spent",
        data: budgetCategories.map(cat => spendingByCategory[cat] || 0),
        backgroundColor: budgetCategories.map(cat => {
          const spent = spendingByCategory[cat] || 0
          const limit = categoryLimits[cat] || 1
          const ratio = spent / limit
          if (ratio >= 1) return "#ef4444"
          if (ratio >= 0.75) return "#f97316"
          return "#22c55e"
        }),
        barThickness: 18,
        borderRadius: 6,
      },
      {
        label: "Budget Limit",
        data: budgetCategories.map(cat => categoryLimits[cat] || 0),
        backgroundColor: "#bfdbfe",
        barThickness: 18,
        borderRadius: 6,
      },
    ],
  }

  const budgetProgressOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const cat = budgetCategories[ctx.dataIndex]
            const spent = spendingByCategory[cat] || 0
            const limit = categoryLimits[cat] || 1
            const pct = Math.round((spent / limit) * 100)
            if (ctx.dataset.label === "Actual Spent") {
              return ` Spent: $${spent} (${pct}% of budget)`
            }
            return ` Limit: $${limit}`
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { callback: val => `$${val}` },
        grid: { display: false }
      },
      y: {
        grid: { display: false }
      }
    }
  }

  // Budget vs Actual (vertical grouped bar — top left chart)
  const barData = {
    labels: budgetCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
    datasets: [
      {
        label: "Actual Spent",
        data: budgetCategories.map(cat => spendingByCategory[cat] || 0),
        backgroundColor: "#ff4d6d",
        barThickness: 15
      },
      {
        label: "Budget Limit",
        data: budgetCategories.map(cat => categoryLimits[cat] || 0),
        backgroundColor: "#4361ee",
        barThickness: 15
      },
    ],
  }

  const linedata = {
    labels: Object.keys(spendingByDate),
    datasets: [{
      label: "Spending",
      data: Object.values(spendingByDate),
      borderColor: "#4361ee",
      backgroundColor: "#4361ee"
    }],
  }

  const Doughnutdata = {
    labels: Object.keys(spendingByCategory),
    datasets: [{
      data: Object.values(spendingByCategory),
      backgroundColor: Object.keys(spendingByCategory).map(k => categoryColors[k] || "#adb5bd"),
      cutout: "70%"
    }],
  }

  const options = { responsive: true, plugins: { legend: { position: "bottom" } } }

  return (
    <>
      {/* Cards row — flex-wrap so cards wrap on smaller screens */}
       {notification && (
        <Notification
        message={notification.message}
        type={notification.type}
        onclose={()=>setNotification(null)}
        
        />
      )}
      <Navbar/>
      <div className='flex flex-wrap gap-10 items-center justify-center mt-10'>
        
        <Currentbalance balance={balance} />
        <Showincome
          income={income}
          setIncome={setIncome}
          transaction={transaction}
          setTransaction={setTransaction}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
          setNotification={setNotification}
        />
        <Expenser
          expenses={expenses}
          setExpense={setExpenses}
          transaction={transaction}
          setTransaction={setTransaction}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <Card3 categoryLimits={categoryLimits} setCategoryLimits={setCategoryLimits} />
      </div>

      {/* Bar charts row — flex-wrap so charts stack on smaller screens */}
      <div className='flex flex-wrap gap-10 justify-center items-center p-5'>

        {/* Budget vs Actual Spending — vertical grouped bar */}
        <div className="bg-white p-5 w-[600px] max-w-[calc(100vw-2.5rem)] rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Budget vs. Actual Spending</h2>
          {budgetCategories.length > 0
            ? <Bar data={barData} options={options} />
            : <p className="text-gray-400 text-center mt-10">No budget limits set yet</p>
          }
        </div>

        {/* ✅ Budget Progress — horizontal bar connected to categoryLimits */}
        <div className="bg-white p-5 w-[600px] max-w-[calc(100vw-2.5rem)] rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Budget Progress</h2>
          {budgetCategories.length > 0
            ? <Bar data={budgetProgressData} options={budgetProgressOptions} />
            : <p className="text-gray-400 text-center mt-10">No budget limits set yet</p>
          }
        </div>

      </div>

      {/* Line + Doughnut row — flex-wrap so charts stack on smaller screens */}
      <div className='flex flex-wrap gap-10 justify-center items-center'>
        <div className='h-100 w-[500px] max-w-[calc(100vw-2.5rem)] shadow-2xl p-10 m-2'>
          <b>Spending trend</b>
          <Line data={linedata} />
        </div>
        <div>
          <h3 className='ml-5 p-2 font-bold'>Expense by category</h3>
          <div className='shadow-2xl h-80 w-[600px] max-w-[calc(100vw-2.5rem)] rounded-2xl p-2 flex justify-center items-center'>
            <Doughnut data={Doughnutdata} />
          </div>
        </div>
      </div>

      <Button />
       <Table 
        transaction={transaction} 
        setTransaction={setTransaction} 
        editTransaction={editTransaction} 
        setEditTransaction={setEditTransaction} 
      />
    </>
  )
}

export default Dashboard