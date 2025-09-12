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
      <section className="py-20 bg-gray-50">
      </section>

      <div className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RideBookingForm />
        </div>
      </div>
    </>
  )
}

export default App
