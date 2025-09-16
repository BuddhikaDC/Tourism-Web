import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.png";
import banner4 from "../../assets/banner-4.jpg";

const packageImages = [banner2, banner3, banner4];
const packageImages2 = [banner3, banner2, banner4];
const packageImages3 = [banner2, banner3, banner4]; // You can use different images if needed

const packages = [
  {
    id: 1,
    images: packageImages,
    sale: "5 Days / 4 Nights",
    title: "Sri Lanka Round Tour Package",
    subtitle: "Sigiriya, Kandy, Dambulla, Ella, Nuwara Eliya, Galle, Hiriketiya, Ahangama, Colombo",
    overview: "Experience the highlights of Sri Lanka in 5 days with guided tours, scenic drives, and comfortable vehicles.",
    route: [
      "Day 1: Sigiriya (Night 1)",
      "Day 2: Kandy - Dambulla (Night 2)",
      "Day 3: Ella / Nuwara Eliya (Night 3)",
      "Day 4: Galle / Hiriketiya / Ahangama (Night 4)",
      "Day 5: Colombo (Airport)"
    ],
    vehicles: [
      { type: "Sedan", capacity: 4, price: "30,000 LKR" },
      { type: "Mini", capacity: 4, price: "27,000 LKR" },
      { type: "Van", capacity: 7, price: "45,000 LKR" }
    ]
  },
  {
    id: 2,
    images: packageImages2,
    sale: "8 Days / 7 Nights",
    title: "Sri Lanka 8 Days Round Tour Package",
    subtitle: "Sigiriya, Kandy, Ella, Yala, Udawalawa, Tangalla, Hiriketiya, Galle, Bentota, Colombo",
    overview: "Discover Sri Lanka's best destinations in 8 days, including cultural sites, nature, and beaches.",
    route: [
      "Day 1: Sigiriya (Night 1)",
      "Day 2: Kandy (Night 2)",
      "Day 3: Ella (Night 3)",
      "Day 4: Yala / Udawalawa (Night 4)",
      "Day 5: Tangalla / Hiriketiya (Night 5)",
      "Day 6: Galle (Night 6)",
      "Day 7: Bentota (Night 7)",
      "Day 8: Colombo (Airport)"
    ],
    vehicles: [
      { type: "Mini", capacity: 4, price: "27,000 LKR" },
      { type: "Sedan", capacity: 4, price: "30,000 LKR" },
      { type: "Van", capacity: 7, price: "45,000 LKR" }
    ]
  },
  {
    id: 3,
    images: packageImages2, // use same images as second package
    sale: "8 Days / 7 Nights",
    title: "Sri Lanka 8 Days Round Tour Package", // same title as second package
    subtitle: "Sigiriya, Kandy, Ella, Yala, Udawalawa, Tangalla, Hiriketiya, Galle, Bentota, Colombo",
    overview: "Discover Sri Lanka's best destinations in 8 days, including cultural sites, nature, and beaches.",
    route: [
      "Day 1: Sigiriya (Night 1)",
      "Day 2: Kandy (Night 2)",
      "Day 3: Ella (Night 3)",
      "Day 4: Yala / Udawalawa (Night 4)",
      "Day 5: Tangalla / Hiriketiya (Night 5)",
      "Day 6: Galle (Night 6)",
      "Day 7: Bentota (Night 7)",
      "Day 8: Colombo (Airport)"
    ],
    vehicles: [
      { type: "Mini", capacity: 4, price: "27,000 LKR" },
      { type: "Sedan", capacity: 4, price: "30,000 LKR" },
      { type: "Van", capacity: 7, price: "45,000 LKR" }
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.32, 0, 0.67, 0]
    }
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.32, 0, 0.67, 0],
      scale: { type: 'spring', stiffness: 100, damping: 15 }
    }
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction < 0 ? 50 : -50,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.32, 0, 0.67, 0]
    }
  })
};

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const vehicleCardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const Service = () => {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    let interval;
    if (packages[selectedPackage]?.images?.length > 1) {
      interval = setInterval(() => {
        const nextSlide = () => {
          setDirection(1);
          setSlideIdx((prev) => (prev + 1) % packages[selectedPackage].images.length);
        };

        const prevSlide = () => {
          setDirection(-1);
          setSlideIdx((prev) => 
            prev === 0 ? packages[selectedPackage].images.length - 1 : prev - 1
          );
        };

        nextSlide();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [selectedPackage]);

  const tabButtonClass = (tab) =>
    `px-3 sm:px-4 py-2 rounded-lg sm:rounded-t-lg font-medium text-sm sm:text-base transition-colors duration-200 ${
      activeTab === tab
        ? "bg-emerald-600 text-white shadow-md"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`;

  const packageTabClass = (idx) =>
    `px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-colors duration-200 whitespace-nowrap ${
      selectedPackage === idx
        ? "bg-emerald-600 text-white shadow-md"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`;

  const pkg = packages[selectedPackage];

  const handlePackageChange = (idx) => {
    setSelectedPackage(idx);
    setSlideIdx(0);
    setActiveTab("overview");
    // Smooth scroll to top of component
    if (isMobile) {
      document.getElementById('service-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      id="service-section"
      className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Title section */}
      <motion.div 
        className="w-full max-w-7xl mx-auto mb-8 md:mb-12 text-center"
        variants={titleVariants}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Our <span className="">Tour Packages</span>
        </motion.h2>
        <motion.p 
          className="mt-3 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto"
          variants={titleVariants}
        >
          Discover the best of Sri Lanka with our carefully curated tour packages. Experience the beauty and diversity of our island.
        </motion.p>
      </motion.div>

      {/* Package tabs */}
      <motion.div 
        className="w-full max-w-7xl mx-auto mb-8 md:mb-12"
        variants={tabVariants}
      >
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          <div className="flex space-x-2 sm:space-x-3 mx-auto">
            {packages.map((pkg, idx) => (
              <motion.button 
                key={pkg.id}
                className={packageTabClass(idx)} 
                onClick={() => handlePackageChange(idx)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {pkg.sale}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card with tabs */}
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch"
        variants={cardVariants}
      >
        {/* Left: Image slider */}
        <motion.div 
          className="relative w-full lg:w-1/2 h-[280px] sm:h-[360px] md:h-[420px] rounded-xl overflow-hidden"
          whileHover={{ scale: isMobile ? 1 : 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={`${selectedPackage}-${slideIdx}`}
              className="relative w-full h-full overflow-hidden"
              custom={direction}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.img
                src={pkg.images[slideIdx]}
                alt={pkg.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.32, 0, 0.67, 0],
                  scale: { type: 'spring', stiffness: 100, damping: 10 }
                }}
              />
              {/* Navigation Arrows */}
              {pkg.images.length > 1 && (
                <>
                  <motion.button 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </>
              )}
              {/* Image indicators */}
              <motion.div 
                className="absolute bottom-4 left-0 right-0 flex justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {pkg.images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(index > slideIdx ? 1 : -1);
                      setSlideIdx(index);
                    }}
                    className={`h-1.5 rounded-full transition-all relative overflow-hidden ${
                      index === slideIdx ? 'bg-white w-8' : 'bg-white/50 w-4 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index === slideIdx && (
                      <motion.span
                        className="absolute left-0 top-0 bottom-0 bg-white rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ 
                          duration: 5,
                          ease: 'linear',
                          repeat: Infinity,
                          repeatType: 'loop'
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <motion.div 
            className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 flex items-center font-bold text-sm sm:text-base shadow-lg shadow-emerald-300/30 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="whitespace-nowrap">{pkg.sale}</span>
          </motion.div>
        </motion.div>

        {/* Right: Details with tabs */}
        <motion.div
          className="flex-1 flex flex-col justify-between p-5 sm:p-6 md:p-8 bg-white rounded-2xl border border-emerald-100 shadow-lg"
          whileHover={{ 
            y: isMobile ? 0 : -4,
            boxShadow: isMobile 
              ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
              : "0 20px 25px -5px rgb(6 78 59 / 0.1), 0 10px 10px -5px rgb(6 78 59 / 0.04)"
          }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPackage}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-4"
            >
              <motion.h2 
                className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-2 leading-tight"
                layoutId="package-title"
              >
                {pkg.title}
              </motion.h2>
              <motion.p 
                className="text-emerald-700 text-sm sm:text-base mb-4"
                layoutId="package-subtitle"
              >
                {pkg.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Tabs */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {["overview", "itinerary", "vehicles"].map((tab) => (
              <motion.button 
                key={tab}
                className={tabButtonClass(tab)} 
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {tab === "overview" && "Overview"}
                {tab === "itinerary" && (isMobile ? "Route" : "Full Itinerary")}
                {tab === "vehicles" && (isMobile ? "Cars" : "Our Vehicles")}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="bg-emerald-50/50 rounded-xl p-4 sm:p-5 border border-emerald-100 min-h-[140px] overflow-y-auto max-h-[300px] sm:max-h-[350px] scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent"
            layout
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div 
                  className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-3"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p>{pkg.overview}</p>
                  {pkg.additionalInfo && (
                    <p className="text-sm text-gray-600">{pkg.additionalInfo}</p>
                  )}
                </motion.div>
              )}
              {activeTab === "itinerary" && (
                <motion.ul 
                  key="itinerary"
                  className="space-y-3 text-gray-700 text-sm sm:text-base"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {pkg.route.map((r, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-2"
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mt-0.5 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>{r}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
              {activeTab === "vehicles" && (
                <motion.div 
                  key="vehicles"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {pkg.vehicles.map((v, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-white border border-emerald-100 rounded-lg p-3 sm:p-4 text-gray-800 text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                      variants={vehicleCardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ 
                        scale: isMobile ? 1 : 1.03,
                        y: isMobile ? 0 : -2,
                        boxShadow: isMobile 
                          ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                          : "0 10px 15px -3px rgb(6 78 59 / 0.1), 0 4px 6px -4px rgb(6 78 59 / 0.1)"
                      }}
                    >
                      <div className="font-bold text-base text-gray-900 mb-1">{v.type}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">{v.capacity} {v.capacity > 1 ? 'people' : 'person'}</span>
                        <span className="text-emerald-700 font-bold">
                          {v.price} <span className="text-xs text-gray-500">/day</span>
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 w-full mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <motion.a
              href={`https://wa.me/94717244821?text=${encodeURIComponent(
                `Hello, I am interested in the "${pkg.title}" package.\n\nItinerary:\n${pkg.route.join('\n')}\n\nI would like to know more about the pricing and availability.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-0 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg px-4 sm:px-6 py-3 text-sm sm:text-base transition-all shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-200/50"
              whileHover={{ 
                y: isMobile ? 0 : -2,
                scale: isMobile ? 1 : 1.02,
                backgroundColor: "#059669"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.05 4.91a10 10 0 00-16.68 11.48l-1.88 6.84 7.02-1.84a10 10 0 0011.54-3.24 10 10 0 000-12.24zm-1.5 11.1a8 8 0 11-9.23-9.23 8 8 0 019.23 9.23zm-1.38-6.7c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.12-.17.25-.64.8-.79.97s-.29.18-.54.06c-.25-.11-1.05-.39-1.99-1.24-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.1.25-.27.37-.4.12-.14.17-.23.25-.4.08-.16.04-.31-.02-.43s-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01s-.41.06-.62.28c-.21.22-.8.78-.8 1.9s.82 2.21.94 2.36c.12.15 1.63 2.49 3.95 3.49.54.23.96.3 1.29.36.56.1 1.07.09 1.47.05.45-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.27z" clipRule="evenodd" />
              </svg>
              <span>Book Now on WhatsApp</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Service;