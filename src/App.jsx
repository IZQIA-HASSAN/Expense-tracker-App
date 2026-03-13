import { useState } from 'react'

import Navbar from './Navbar'
import Dashboard from './Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Navbar/>
<Dashboard/>
    </>
  )
}

export default App
