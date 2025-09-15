
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
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100/30"></div>
          <div className="relative">
            <Hero />
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <About />
        </section>
        
        <section className="py-16 bg-gray-50">
          <Service />
        </section>
        
        <section className="py-16 bg-white">
          <Map />
        </section>
        
        <section className="py-16 bg-emerald-50">
          <RideBookingForm />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default App;
