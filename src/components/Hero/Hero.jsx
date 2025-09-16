import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Mountain, PawPrint, Compass, Plane } from 'lucide-react'
import { motion } from 'framer-motion'
import hero2 from '../../assets/hero-2.jpg'
import hero1 from '../../assets/hero-1.jpg'
import hero3 from '../../assets/hero-3.jpg'

function Hero() {
  const [isLoading, setIsLoading] = useState(false)
  const rotatingWords = ["Adventure", "Journey", "Escape", "Expedition"]
  const [typedTitle, setTypedTitle] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)

  // Feature slider data
  const featureCards = [
    { title: 'Explore Diverse Landscapes', icon: Mountain, description: 'From lush jungles to arid plains, traverse unique environments.' },
    { title: 'Encounter Rare Wildlife', icon: PawPrint, description: 'Spot leopards, elephants, sloth bears, and endemic birds in natural habitat.' },
    { title: 'Guided Expeditions', icon: Compass, description: 'Experienced naturalists lead personalized tours, ensuring safety & insight.' },
    { title: 'Seamless Travel Planning', icon: Plane, description: 'We handle permits, transport, and lodging for a worry-free trip.' },
  ]

  const sliderRef = useRef(null)

  // Typewriter effect
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

  // Slideshow images
  const slideshowImages = [
    hero1,
    hero2,
    hero3,
  ]
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    }, 8000)
    return () => clearInterval(intervalId)
  }, [slideshowImages.length])

  // Feature slider auto-scroll
  const getCardStep = () => {
    const el = sliderRef.current
    if (!el) return 0
    const first = el.querySelector('.slider-card')
    if (!first) return 0
    const rect = first.getBoundingClientRect()
    return Math.ceil(rect.width + 16)
  }

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    let timer = setInterval(() => {
      const step = getCardStep()
      if (!step) return
      const setWidth = step * featureCards.length
      let nextLeft = el.scrollLeft + step
      if (nextLeft >= setWidth) {
        el.scrollTo({ left: 0, behavior: 'auto' })
        nextLeft = step
      }
      el.scrollTo({ left: nextLeft, behavior: 'smooth' })
    }, 3000)
    return () => clearInterval(timer)
  }, [featureCards.length])

  return (
    <section className="relative min-h-[100vh] w-full rounded-none  bg-cover bg-center bg-no-repeat px-4 bg-white">
      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <span className="gradient-blob gradient-emerald left-[-40px] top-10 h-56 w-56"></span>
        <span className="gradient-blob gradient-cyan right-[-30px] top-24 h-48 w-48" style={{ animationDelay: '0.6s' }}></span>
        <span className="gradient-blob gradient-violet left-20 bottom-[-30px] h-52 w-52" style={{ animationDelay: '1.2s' }}></span>
      </div>

      <div className={`relative mx-auto  rounded-3xl flex min-h-[100vh] max-w-full flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center text-white transition-opacity duration-700 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Preload */}
        <img src={hero1} alt="" className="hidden" onLoad={() => setHeroLoaded(true)} />

        {/* Slides */}
        <div className="">
          {slideshowImages.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/50 rounded-none"></div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Embark on Your Next Safari <br />
            <span className="text-emerald-500">{typedTitle}</span>
            <span className="typewriter-caret text-emerald-300">|</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-white/90 sm:text-base">
            Discover the beauty and heritage of Sri Lanka with peace of mind. At Mr.travel, your safety and comfort are our top priorities. Enjoy secure, expertly guided trips to ancient cities, stunning beaches, and vibrant wildlife.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md p-3">
            <button className="w-full sm:w-auto rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-500">
              Destination
            </button>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-500"
            >
              Book Now
            </button>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="relative z-10 mt-6 w-full"
        >
          <div ref={sliderRef} className="mx-auto flex w-full max-w-5xl gap-4 overflow-x-auto no-scrollbar px-8 py-2 snap-x snap-mandatory">
            {[...featureCards, ...featureCards].map((card, idx) => {
              const Icon = card.icon
              return (
                <div key={idx} className="slider-card flex-none w-full md:w-1/3 snap-start rounded-2xl border border-white/10 bg-white/10 p-4 text-center text-white/90 shadow-lg backdrop-blur">
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-xs text-white/80">{card.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
