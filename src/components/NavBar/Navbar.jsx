import { useEffect, useState } from 'react'
import { Menu as MenuIcon, X as XIcon } from "lucide-react"
import { motion } from 'framer-motion'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrolledAmount, setScrolledAmount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is typical md breakpoint
    }
    
    // Initial check
    checkIsMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    let ticking = false

    function updateScrollData() {
      const currentScrollY = window.scrollY
      
      // Calculate scroll progress (0 to 1) for the first 100px of scroll
      const scrollProgress = Math.min(currentScrollY / 100, 1)
      setScrolledAmount(scrollProgress)
      
      // Toggle scrolled state with a threshold
      setIsScrolled(currentScrollY > 10)
      
      // Reset scroll behavior when reaching top
      if (currentScrollY === 0) {
        setScrolledAmount(0)
      }
      
      ticking = false
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollData)
        ticking = true
      }
    }

    // Initial check
    updateScrollData()
    
    // Add scroll event listener with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Calculate border radius based on scroll and device
  const getBorderRadius = () => {
    if (isMobile) {
      return isScrolled ? '20px' : '0' // No border radius on mobile when not scrolled
    }
    return isScrolled ? '20px' : '20px' // Always rounded on desktop
  }

  return(
    <motion.div
      initial={{ y: 0, scale: 1, opacity: 1 }}
      animate={{
        y: isScrolled && !isMobile ? 10 : 0, // Only apply y-transformation on desktop
        scale: isScrolled && !isMobile ? 0.97 : 1, // Only apply scaling on desktop
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${isScrolled ? "md:top-4" : "top-0"}`}
      style={{
        zIndex: 1001,
        width: "100%",
        position:"sticky", // Fixed on mobile, sticky on desktop
        top: 0,
        left: 0,
        right: 0,
        marginBottom: isMobile ? "0" : "0.25rem", // Adjust margin for mobile
      }}
    >
      <div 
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: isMobile ? '1rem' : '1.5rem', // Adjust padding for mobile
          paddingRight: isMobile ? '1rem' : '1.5rem',
          transition: 'all 0.3s ease',
          borderRadius: getBorderRadius(), // Use the function to determine border radius
          borderWidth: isScrolled ? '1px' : '0',
          borderColor: isScrolled ? `rgba(209, 250, 229, ${0.5 + (scrolledAmount * 0.5)})` : 'transparent',
          backgroundColor:'white',
          backdropFilter: isMobile ? 'none' : 'blur(12px)', // No blur on mobile for performance
		  boxShadow: isScrolled 
		  ? `0 6px 12px -2px rgba(0, 0, 0, ${0.15 + (scrolledAmount * 0.07)}), 
			 0 4px 8px -2px rgba(0, 0, 0, ${0.08 + (scrolledAmount * 0.06)})` 
		  : isMobile 
			? '0 2px 6px 0 rgba(0, 0, 0, 0.85), 0 2px 4px 0 rgba(0, 0, 0, 0.65)' 
			: '0 4px 10px 0 rgba(0, 0, 0, 0.25)', // Instead of "none", still show a subtle shadow
			boxShadow: isMobile 
			? (isScrolled 
				? '0 4px 6px -1px rgba(27, 26, 26, 0.44)' 
				: 'none') 
			: 'none',		  
		
          transform: isMobile ? 'none' : `scale(${1 - (scrolledAmount * 0.01)})`, // No scaling on mobile
        }}
      >
        <div 
          style={{
            height: isMobile ? '3.5rem' : (isScrolled ? '3.5rem' : '4rem'), // Consistent height on mobile
            transition: 'all 0.3s ease',
          }}
          className="flex items-center justify-between"
        >
          <a href="#" className="flex items-center gap-2 group">
            <img src="src/assets/mr travel2.png" alt="Safari" className="h-8 w-auto md:h-9 transition-transform group-hover:scale-105" />
          </a>

          {/* Desktop nav - custom links */}
          <nav className="hidden md:flex items-center gap-8 mx-auto">
            <a href="#" className={`${isScrolled ? 'text-emerald-700 hover:text-emerald-500' : 'text-emerald-800 hover:text-emerald-600'} text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50`}>Home</a>
            <a href="#service" className={`${isScrolled ? 'text-emerald-700 hover:text-emerald-500' : 'text-emerald-800 hover:text-emerald-600'} text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50`}>Packages</a>
            <a href="#activities" className={`${isScrolled ? 'text-emerald-700 hover:text-emerald-500' : 'text-emerald-800 hover:text-emerald-600'} text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50`}>Activities</a>
            <a href="#about" className={`${isScrolled ? 'text-emerald-700 hover:text-emerald-500' : 'text-emerald-800 hover:text-emerald-600'} text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50`}>About Us</a>
            <a href="#destinations" className={`${isScrolled ? 'text-emerald-700 hover:text-emerald-500' : 'text-emerald-800 hover:text-emerald-600'} text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50`}>Destinations</a>
            <a href="#feelt" className={`${isScrolled ? 'text-emerald-700 hover:text-emerald-500' : 'text-emerald-800 hover:text-emerald-600'} text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50`}>Our Fleet</a>
            <a href="#contact" className="bg-emerald-600 text-white text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-emerald-700 shadow-sm hover:shadow-md">Contact</a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`inline-flex items-center justify-center rounded-full p-2 transition md:hidden ${isScrolled ? 'text-emerald-700 hover:bg-emerald-100' : 'text-emerald-700 hover:bg-emerald-100'}`}
            aria-label="Toggle menu"
            onClick={() => setOpen(v => !v)}
          >
            {open ? <XIcon className="size-6 text-emerald-700" /> : <MenuIcon className="size-6 text-emerald-700" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <motion.div 
              className="fixed top-0 left-0 w-full bg-white shadow-lg border-b border-emerald-100"
              style={{ zIndex: 1002 }}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-emerald-100">
                <a href="#" className="flex items-center gap-2">
                  <img src="src/assets/mr travel2.png" alt="Safari" className="h-8 w-auto" />
                </a>
                <button
                  className="inline-flex items-center justify-center p-2 text-emerald-700 hover:bg-emerald-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                >
                  <XIcon className="size-6" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                <a href="#" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block px-3 py-3 text-base font-medium text-emerald-800 transition hover:bg-emerald-50">Home</a>
                <a href="#service" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block px-3 py-3 text-base font-medium text-emerald-800 transition hover:bg-emerald-50">Packages</a>
                <a href="#activities" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block px-3 py-3 text-base font-medium text-emerald-800 transition hover:bg-emerald-50">Activities</a>
                <a href="#about" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block px-3 py-3 text-base font-medium text-emerald-800 transition hover:bg-emerald-50">About Us</a>
                <a href="#destinations" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block px-3 py-3 text-base font-medium text-emerald-800 transition hover:bg-emerald-50">Destinations</a>
                <a href="#feelt" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block px-3 py-3 text-base font-medium text-emerald-800 transition hover:bg-emerald-50">Our Fleet</a>
                <a href="#contact" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block w-full text-center px-4 py-3 mt-4 text-base font-medium text-white bg-emerald-600 transition hover:bg-emerald-700">Contact Us</a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Navbar;