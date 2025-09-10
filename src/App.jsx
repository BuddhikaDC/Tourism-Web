import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Hero />
    </>
  )
}

export default App
