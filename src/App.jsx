import { useState } from 'react'

import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Table from  "./Table"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Navbar/>
<Dashboard/>
<Table/>
    </>
  )
}

export default App
