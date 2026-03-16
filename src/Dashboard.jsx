import React from 'react'
import Card from './Card'
import Card1  from './Card1'
import Card2 from './Card2'
import Card3 from './Card3'
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
}

const Doughnutdata = {
  labels :["Food"],
  datasets:[
    {
      data:[100],
      backgroundColor:["#4361ee"],
      cutout:"80%"
    }
  ]
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
      grid: {
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
    <div className=' flex gap-10 justify-center border items-center  '>
      <div className="bg-white p-5 rounded-xl shadow-md">

  <h2 className="text-lg font-semibold mb-4 text-gray-800">
    Budget vs. Actual Spending
  </h2>

  <Bar data={barData} options={options} />

</div>
<div className='border h-70 w-70 p-2 flex justify-center items-center'>
<div className='h-45 w-45  '><Doughnut   data={Doughnutdata}/></div>
</div>
</div>
<div className='h-60 border w-[500px] m-2'><Line data={linedata}/></div>


    </>
  )
}

export default Dashboard