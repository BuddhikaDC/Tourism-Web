
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
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100/30"></div>
          <div className="relative">
            <Hero />
          </div>
        </section>
        
        {/* Destinations Section */}
        <section id="service" className="py-16 bg-white scroll-mt-20">
          <Service />
        </section>
        
        {/* About Section */}
        <section id="about" className="py-16 bg-gray-50 scroll-mt-20">
          <About />
        </section>
        
        {/* Map Section */}
        <section id="destinations" className="py-16 bg-white scroll-mt-20">
          <Map />
        </section>
        
        {/* Contact Section */}
        <section id="feelt" className="py-16 bg-emerald-50 scroll-mt-20">
          <RideBookingForm />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default App;
