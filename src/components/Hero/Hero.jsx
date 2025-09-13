import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Mountain, PawPrint, Compass, Plane } from 'lucide-react'
import hero1 from '../../assets/hero-1.png'

function BookingButton({ isLoading }) {
	return (
		<button
			type="submit"
			disabled={isLoading}
			className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 w-full md:w-auto`}
		>
			{isLoading ? (
				<span className="relative inline-flex items-center gap-2">
					<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
					Booking...
				</span>
			) : (
				'Book Now'
			)}
		</button>
	)
}

function Hero() {
	const [isLoading, setIsLoading] = useState(false)
	const [destination, setDestination] = useState("")
	const [travelDate, setTravelDate] = useState("")
	const [peopleCount, setPeopleCount] = useState("")
	const rotatingWords = ["Adventure", "Journey", "Escape", "Expedition"]
	const [typedTitle, setTypedTitle] = useState("")
	const [wordIndex, setWordIndex] = useState(0)
	const [isDeleting, setIsDeleting] = useState(false)
	const [heroLoaded, setHeroLoaded] = useState(false)

	// Feature slider data
	const featureCards = [
		{
			title: 'Explore Diverse Landscapes',
			icon: Mountain,
			description: 'From lush jungles to arid plains, traverse unique environments.'
		},
		{
			title: 'Encounter Rare Wildlife',
			icon: PawPrint,
			description: 'Spot leopards, elephants, sloth bears, and endemic birds in natural habitat.'
		},
		{
			title: 'Guided Expeditions',
			icon: Compass,
			description: 'Experienced naturalists lead personalized tours, ensuring safety & insight.'
		},
		{
			title: 'Seamless Travel Planning',
			icon: Plane,
			description: 'We handle permits, transport, and lodging for a worry-free trip.'
		},
	]

	const sliderRef = useRef(null)
	const getCardStep = () => {
		const el = sliderRef.current
		if (!el) return 0
		const first = el.querySelector('.slider-card')
		if (!first) return 0
		const rect = first.getBoundingClientRect()
		// gap-4 = 16px
		return Math.ceil(rect.width + 16)
	}

	function sendToWhatsApp() {
		const phoneNumber = "94776140369"
		const text = `Hello, here are my booking details:\n\nDestination: ${destination}\nDate: ${travelDate}\nPeople: ${peopleCount}`
		const encodedText = encodeURIComponent(text)
		const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
		const url = isMobile
			? `whatsapp://send?phone=${phoneNumber}&text=${encodedText}`
			: `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`
		window.open(url, "_blank")
	}

	function handleSubmit(e) {
		e.preventDefault()
		setIsLoading(true)
		sendToWhatsApp()
		setTimeout(() => setIsLoading(false), 800)
	}

	// Slideshow images
	const slideshowImages = [
		hero1,
		'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop',
	]
	const [currentSlide, setCurrentSlide] = useState(0)

	// Auto-advance slides (slower)
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
		}, 9000)
		return () => clearInterval(intervalId)
	}, [slideshowImages.length])

	// Continuous typewriter effect for the last word
	useEffect(() => {
		const currentWord = rotatingWords[wordIndex]
		let speed = isDeleting ? 200 : 350

		if (!isDeleting && typedTitle === currentWord) {
			const pause = setTimeout(() => setIsDeleting(true), 1600)
			return () => clearTimeout(pause)
		}

		if (isDeleting && typedTitle === "") {
			setIsDeleting(false)
			setWordIndex((prev) => (prev + 1) % rotatingWords.length)
			return
		}

		const timer = setTimeout(() => {
			const next = isDeleting
				? currentWord.slice(0, Math.max(0, typedTitle.length - 1))
				: currentWord.slice(0, typedTitle.length + 1)
			setTypedTitle(next)
		}, speed)

		return () => clearTimeout(timer)
	}, [typedTitle, isDeleting, wordIndex, rotatingWords])

	// Auto-scroll the feature slider (continuous loop)
	useEffect(() => {
		const el = sliderRef.current
		if (!el) return
		let timer = setInterval(() => {
			const step = getCardStep()
			if (!step) return
			const setWidth = step * featureCards.length
			let nextLeft = el.scrollLeft + step
			if (nextLeft >= setWidth) {
				// Jump back seamlessly (list is duplicated)
				el.scrollTo({ left: 0, behavior: 'auto' })
				nextLeft = step
			}
			el.scrollTo({ left: nextLeft, behavior: 'smooth' })
		}, 3000)
		return () => clearInterval(timer)
	}, [featureCards.length])

	function scrollSliderPage(direction) {
		const el = sliderRef.current
		if (!el) return
		const step = getCardStep() || el.clientWidth
		const setWidth = step * featureCards.length
		let nextLeft = direction === 'next' ? el.scrollLeft + step : el.scrollLeft - step
		if (nextLeft < 0) {
			el.scrollTo({ left: setWidth, behavior: 'auto' })
			nextLeft = Math.max(0, setWidth - step)
		}
		if (nextLeft >= setWidth) {
			el.scrollTo({ left: 0, behavior: 'auto' })
			nextLeft = step
		}
		el.scrollTo({ left: nextLeft, behavior: 'smooth' })
	}

	return (
		
		<section
  className="relative min-h-[100vh] w-full rounded-none bg-cover bg-center bg-no-repeat"
>
	{/* Gradient blobs background */}
	<div className="absolute inset-0 -z-10 overflow-hidden ">
					<span className="gradient-blob gradient-emerald left-[-40px] top-10 h-56 w-56"></span>
					<span className="gradient-blob gradient-cyan right-[-30px] top-24 h-48 w-48" style={{ animationDelay: '0.6s' }}></span>
					<span className="gradient-blob gradient-violet left-20 bottom-[-30px] h-52 w-52" style={{ animationDelay: '1.2s' }}></span>
				</div>
			<div className={`relative mx-auto flex min-h-[100vh] max-w-full flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center text-white transition-opacity duration-700 rounded-none ${heroLoaded ? 'opacity-100' : 'opacity-0'}`} 
			style={{
				backgroundImage: `url(${hero1})`,
				
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				}}>
				{/* Preload image to drive fade-in */}
				<img src={hero1} alt="" className="hidden" onLoad={() => setHeroLoaded(true)} />
				{/* Slides */}
				<div className="absolute inset-0 -z-10">
					{/* {slideshowImages.map((src, idx) => (
						<div
							key={idx}
							className={`absolute inset-0 transition-opacity ease-in-out ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
							style={{
								backgroundImage: `url(${src})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
								transition: 'opacity 3000ms ease-in-out',
								willChange: 'opacity',
							}}
						/>
					))} */}
				</div>

				<div className={`absolute inset-0 rounded-none ${heroLoaded ? 'bg-black/50 transition-colors duration-700' : 'hero-skeleton'}`}></div>
				
				<div className="relative z-10 space-y-4">
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl whitespace-nowrap">
					Embark on Your Next Safari <br></br><span className='text-emerald-500'>{typedTitle}</span>
						<span className="typewriter-caret text-emerald-300 !text-emerald-30">|</span>
					</h1>
					<p className="mx-auto max-w-2xl text-sm text-white/90 sm:text-base animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150">
						Discover breathtaking landscapes and unforgettable wildlife experiences across Yala.
					</p>
				</div>
				
				<form
					onSubmit={handleSubmit}
					aria-busy={isLoading}
					className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300"
				>
					<div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-3 rounded-md bg-white/90 p-3 shadow-2xl backdrop-blur sm:grid-cols-2 md:grid-cols-4">
						<input
							type="text"
							placeholder="Destination"
							disabled={isLoading}
							onChange={(e) => setDestination(e.target.value)}
							className="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/50 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
							required
						/>
						<input
							type="date"
							disabled={isLoading}
							onChange={(e) => setTravelDate(e.target.value)}
							className="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/50 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
							required
						/>
						<input
							type="number"
							min="1"
							placeholder="People"
							disabled={isLoading}
							onChange={(e) => setPeopleCount(e.target.value)}
							className="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/50 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
							required
						/>
						<div className="flex items-center justify-center md:justify-end">
							<BookingButton isLoading={isLoading} />
						</div>
					</div>
				</form>

				{/* Horizontal slider cards */}
				<div className="relative z-10 mt-6 w-full">
					<button
						aria-label="Previous"
						onClick={() => scrollSliderPage('prev')}
						className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/20 p-2 text-white shadow-md backdrop-blur transition hover:bg-white/30 focus:outline-none"
					>
						<ChevronLeft className="h-5 w-5" />
					</button>

					<button
						aria-label="Next"
						onClick={() => scrollSliderPage('next')}
						className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/20 p-2 text-white shadow-md backdrop-blur transition hover:bg-white/30 focus:outline-none"
					>
						<ChevronRight className="h-5 w-5" />
					</button>

					<div ref={sliderRef} className="mx-auto flex w-full max-w-5xl gap-4 overflow-x-auto no-scrollbar px-8 py-2 snap-x snap-mandatory smooth-scroll">
						{[...featureCards, ...featureCards].map((card, idx) => {
							const Icon = card.icon
							return (
								<div key={idx} className="slider-card flex-none w-full md:w-1/3 snap-start rounded-2xl border border-white/10 bg-white/10 p-4 text-left text-white/90 shadow-lg backdrop-blur">
									<div className='flex justify-center mb-2'>
									<Icon className="h-5 w-5" />
									</div>
									<div className="mb-2 flex items-center justify-center gap-2 text-base font-semibold text-white">
										<span className="text-center">{card.title}</span>
									</div>
									<p className="text-xs leading-relaxed text-white/80">{card.description}</p>
								</div>
							)
						})}
					</div>
				</div>

				<div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl z-10"></div>
				<div className="pointer-events-none absolute bottom-10 right-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl z-10"></div>
			</div>
		</section>
	)
}

export default Hero;
