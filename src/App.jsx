
import './App.css'
import NavBar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/AboutUs/About'
import Map from './components/Map/Map'
import Footer from './components/Footer/Footer'
import RideBookingForm from './components/RideBookingForm/RideBookingForm'

function App() {

  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Map />
      <Footer />
      </>

      <div className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <RideBookingForm />
        </div>
      </div>
    </>
  )
}

export default App
