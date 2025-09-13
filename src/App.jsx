
import './App.css'
import NavBar from './components/NavBar/Navbar'
import Hero from './components/Hero/Hero'
import Service from './components/Service/Service'
import About from './components/AboutUs/About'
import Map from './components/Map/Map'
import Footer from './components/Footer/Footer'


function App() {

  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Service />
      <Map />
<<<<<<< HEAD
=======
      {/* Space Section */}
      <section className="py-20 bg-gray-50">
      </section>
      <div className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <RideBookingForm />
        </div>
      </div>
>>>>>>> f0383bb644fa0807b3b8e90c62bb3290de61a9ca
      <Footer />
    </>
  )
}

export default App;
