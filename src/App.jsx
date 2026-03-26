import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Table from  "./Table"

function App() {
  const [editTransaction , setEditTransaction] = useState(null)

  const [transaction , setTransaction] = useState(()=>{
    const saved = localStorage.getItem("transaction")
    return saved ? JSON.parse(saved):[]
  }) 

  useEffect(()=>{
    localStorage.setItem("transaction" , JSON.stringify(transaction))
  }, [transaction])
  
  return (
    <>
      <Navbar/>
      <Dashboard 
        transaction={transaction} 
        setTransaction={setTransaction} 
        editTransaction={editTransaction} 
        setEditTransaction={setEditTransaction} 
      />
      <Table 
        transaction={transaction} 
        setTransaction={setTransaction} 
        editTransaction={editTransaction} 
        setEditTransaction={setEditTransaction} 
      />
    </>
  )
}

export default App