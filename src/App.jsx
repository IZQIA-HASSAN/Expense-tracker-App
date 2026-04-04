import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Table from  "./Table"
import Signup from './Signup'
import Login from "./Login"
import {BrowserRouter , Routes ,Route} from "react-router-dom"
import Protectedroute from "./Protectedroute";



function App() {
  const [editTransaction , setEditTransaction] = useState(null)

  const [transaction , setTransaction] = useState(()=>{
    const saved = localStorage.getItem("transaction")
    return saved ? JSON.parse(saved):[]
  }) 

  useEffect(()=>{
    localStorage.setItem("transaction" , JSON.stringify(transaction))
  }, [transaction])

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);
  
  return (
    <BrowserRouter>
    <Routes>
     
     <Route path='/Signup' element={<Signup/>}/>
     <Route path='/Login' element={<Login/>}/>
      
      < Route path='/' element={
        <Protectedroute>
        <Dashboard transaction={transaction} 
        setTransaction={setTransaction} 
        editTransaction={editTransaction} 
        setEditTransaction={setEditTransaction} 
        theme={theme}
        setTheme={setTheme}
        />
        </Protectedroute>

      } 
       />
     
      </Routes>
    </BrowserRouter>
  )
}

export default App