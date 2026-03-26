import React, { useState, useEffect } from 'react'
import Currentbalance from './Currentbalance'
import Expenser from './Expenser'
import Showincome from './Showincome'
import Card3 from './Card3'
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
  const [income, setIncome] = useState(() => {
    const saved = localStorage.getItem("income")
    const parsed = Number(saved)
    return isNaN(parsed) ? 0 : parsed
  })

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses")
    return saved ? JSON.parse(saved) : []
  })

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

  // For doughnut chart
  const spendinByCategory = expenses.reduce((acc, exp) => {
    const cat = exp.category || "other"
    acc[cat] = (acc[cat] || 0) + exp.amount
    return acc
  }, {})

  const categoryColors = {
    food: "#ff4d6d", transport: "#4361ee", utilities: "#f77f00",
    entertainment: "#7209b7", health: "#2dc653", shopping: "#ff9f1c",
    education: "#3a86ff", other: "#adb5bd"
  }

  const barData = {
    labels: ["Food", "Transport"],
    datasets: [
      { label: "Actual spent", data: [100, 0], backgroundColor: "#ff4d6d", barThickness: 15 },
      { label: "Budget Limit", data: [10, 200], backgroundColor: "#4361ee", barThickness: 15 },
    ],
  }

  const linedata = {
    labels: Object.keys(spendingByDate),
    datasets: [{ label: "Spending", data: Object.values(spendingByDate), borderColor: "#4361ee", backgroundColor: "#4361ee" }],
  }

  const Doughnutdata = {
    labels: Object.keys(spendinByCategory),
    datasets: [{
      data: Object.values(spendinByCategory),
      backgroundColor: Object.keys(spendinByCategory).map(k => categoryColors[k] || "#adb5bd"),
      cutout: "70%"
    }],
  }

  const options = { responsive: true, plugins: { legend: { position: "bottom" } } }

  return (
    <>
      <div className='flex gap-10 items-center justify-center mt-10'>
        <Currentbalance balance={balance} />
        <Showincome 
          income={income} 
          setIncome={setIncome} 
          transaction={transaction} 
          setTransaction={setTransaction} 
          editTransaction={editTransaction} 
          setEditTransaction={setEditTransaction} 
        />
        <Expenser 
          expenses={expenses} 
          setExpense={setExpenses} 
          transaction={transaction} 
          setTransaction={setTransaction} 
          editTransaction={editTransaction} 
          setEditTransaction={setEditTransaction} 
        />
        <Card3 />
      </div>

      <div className='flex gap-10 justify-center items-center p-5'>
        <div className="bg-white p-5 w-[600px] rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Budget vs. Actual Spending</h2>
          <Bar data={barData} options={options} />
        </div>
        <div className='shadow-2xl h-80 w-[600px] rounded-md p-2 flex justify-center items-center'>
          <Doughnut data={Doughnutdata} />
        </div>
      </div>

      <div className='flex gap-10 justify-center items-center'>
        <div className='h-100 w-[500px] shadow-2xl p-10 m-2'>
          <b>Spending trend</b>
          <Line data={linedata} />
        </div>
        <div>
          <h3 className='ml-5 p-2 font-bold'>Expense by category</h3>
          <div className='shadow-2xl h-80 w-[600px] rounded-2xl p-2 flex justify-center items-center'>
            {/* <Doughnut data={Doughnutdata} /> */}
          </div>
        </div>
      </div>

      <Button />
    </>
  )
}

export default Dashboard