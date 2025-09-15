import { useEffect, useState } from 'react'
import { Menu as MenuIcon, X as XIcon } from "lucide-react"
import {motion} from 'framer-motion'

function Navbar() {
	const [open, setOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [scrolledAmount, setScrolledAmount] = useState(0)

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

	return(
		<motion.div
      initial={{ y: 0, scale: 1, opacity: 1 }}
      animate={{
        y: isScrolled ? 10 : 0,
        scale: isScrolled ? 0.97 : 1,
        opacity: isScrolled ? 0.95 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${isScrolled ? "md:top-4" : "top-0"}`}
      style={{
        zIndex: 1001,
        width: "100%",
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        marginBottom: "0.25rem",
      }}
    >
			<div 
				style={{
					
					marginLeft: 'auto',
					marginRight: 'auto',
					paddingLeft: '1.5rem',
					paddingRight: '1.5rem',
					transition: 'all 0.3s ease',
					borderRadius: isScrolled ? '20px' : '20px',
					borderWidth: isScrolled ? '1px' : '0',
					borderColor: isScrolled ? `rgba(209, 250, 229, ${0.5 + (scrolledAmount * 0.5)})` : 'transparent',
					backgroundColor: isScrolled 
						? `rgba(255, 255, 255, ${0.9 + (scrolledAmount * 0.1)})` 
						: `rgba(255, 255, 255, ${0.95 - (scrolledAmount * 0.2)})`,
					backdropFilter: 'blur(12px)',
					boxShadow: isScrolled 
						? `0 4px 6px -1px rgba(0, 0, 0, ${0.05 + (scrolledAmount * 0.05)}), 0 2px 4px -1px rgba(0, 0, 0, ${0.01 + (scrolledAmount * 0.04)})` 
						: 'none',
					transform: `scale(${1 - (scrolledAmount * 0.01)})`,
				}}
			>
				<div 
					style={{
						height: isScrolled ? '3.5rem' : '4rem',
						transition: 'all 0.3s ease',
					}}
					className="flex items-center justify-between"
				>
					<a href="#" className="flex items-center gap-2 group">
						<img src="src\assets\mr travel2.png" alt="Safari" className="h-8 w-auto md:h-9 transition-transform group-hover:scale-105" />
						
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
				<div className="md:hidden fixed inset-0 top-16 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)}>
					<div className="bg-emerald-50/95 p-4 shadow-lg border border-emerald-100 animate-fadeIn">
						<div className="space-y-1">
							<a href="#" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-800 transition hover:bg-white hover:text-emerald-700">Home</a>
							<a href="#service" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-800 transition hover:bg-white hover:text-emerald-700">Packages</a>
							<a href="#activities" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-800 transition hover:bg-white hover:text-emerald-700">Activities</a>
							<a href="#about" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-800 transition hover:bg-white hover:text-emerald-700">About Us</a>
							<a href="#destinations" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-800 transition hover:bg-white hover:text-emerald-700">Destinations</a>
							<a href="#feelt" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-800 transition hover:bg-white hover:text-emerald-700">Our Fleet</a>
							<a href="#contact" onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="block text-center rounded-lg px-3 py-2.5 text-sm font-medium text-white bg-emerald-600 transition hover:bg-emerald-700 mt-4">Contact Us</a>
						</div>
						</div>
				</div>
			)}
			</div>
		</motion.div>
	)
}

export default Navbar;