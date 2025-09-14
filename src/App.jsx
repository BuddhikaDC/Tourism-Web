
import './App.css'
import NavBar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'
import Service from './components/Service/Service'
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
      <Service />
      <Map />
      {/* Space Section */}
      <section className="py-20 bg-gray-50">
      </section>
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RideBookingForm />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App;
