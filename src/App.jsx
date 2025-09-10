import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'
import RideBookingForm from './components/RideBookingForm/RideBookingForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Hero />
      
      {/* Space Section */}
      <section className="py-20 bg-gray-100">
      </section>

      <div className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <RideBookingForm />
        </div>
      </div>
    </>
  )
}

export default App
