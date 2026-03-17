import React from 'react'
import Card from './Card'
import Card1  from './Card1'
import Card2 from './Card2'
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
  Legend,
  scales
}from "chart.js"

import {Bar , Line , Doughnut} from "react-chartjs-2"

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

// bar data
const barData = {
  labels:["Food" , "Transport"],
  datasets:[
    {
      label:"Actual spent",
      data : [100 ,0 ],
      backgroundColor: "#ff4d6d",
      barThickness:15,
    },
    {
      label:"Budget Limit",
      data : [10 , 200],
      backgroundColor : "#4361ee",
      barThickness:15,
    },
  ],
}

const linedata = {
  labels : ["2026-03-13"],
  datasets:[
    {
      label:"Spending",
      data : [100],
      borderColor :"#4361ee",
      backgroundColor:"#4361ee",
    },
  ],
  scales:{
    x:{
      grid:{
        display:false,
      }
    },
    y:{
      min:0,
      max:150,
      ticks:{
        stepSize : 50
      },
      grid:{
        display:false,
      }
    },
  },
}

const Doughnutdata = {
  labels :["Food"],
  datasets:[
    {
      data:[100],
      backgroundColor:["#4361ee"],
      cutout:"70%"
    },
  ],
}
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 12,
        padding: 20,
        color: "#6b7280",
        font: {
          size: 12,
        },
      },
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#6b7280",
        font: {
          size: 12,
        },
      },
    },

    y: {
      min:0, 
      max:150,
      
      grid: {
        display: false ,
        color: "#f1f5f9",
      },
      ticks: {
        color: "#6b7280",
      },
    },
  },
};
const Dashboard = () => {
  return (
    <>
    <div className=' flex gap-10 items-center justify-center mt-10'>
        {/* no one div */}
<Card/>
{/* no 2 div */}
<Card2/>
{/* no 3 div */}
<Card1/>
{/* no 4 div */}
<Card3/>

    </div>
    <div className=' flex gap-10 justify-center  items-center p-5 '>
      <div className="bg-white p-5  w-[600px] rounded-xl shadow-xl">

  <h2 className="text-lg font-semibold mb-4 text-gray-800">
    Budget vs. Actual Spending
  </h2>

  <Bar data={barData} options={options} />

</div>
<div className='shadow-2xl h-80 w-[600px] rounded-md p-2 flex justify-center items-center'>
<div className='h-45 w-45  '><Doughnut   data={Doughnutdata}/></div>
</div>

</div>
<div className='flex gap-10  justify-center items-center'>
<div className='h-100 w-[650px] shadow-2xl p-10  w-[500px] m-2'><b>Spending trend</b><Line data={linedata}/></div>
<div className=''><h3 className='ml-5 p-2 font-bold'>Expense by category</h3>
<div className='shadow-2xl h-80 w-[600px] rounded-2xl p-2 flex justify-center items-center'>
<div className='h-45 w-45  '><Doughnut   data={Doughnutdata}/></div>
</div>
</div>
</div>
<Button/>


    </>
  )
}

export default Dashboard