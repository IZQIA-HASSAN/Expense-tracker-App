import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import logo from "./assets/logo.png"
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Navbar/>
    </>
  )
}

export default App
