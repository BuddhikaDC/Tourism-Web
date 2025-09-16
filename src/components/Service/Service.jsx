import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.png";
import banner4 from "../../assets/banner-4.jpg";

const packageImages = [banner2, banner3, banner4];
const packageImages2 = [banner3, banner2, banner4];
const packageImages3 = [banner2, banner3, banner4];

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
    images: packageImages3,
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
  }
];

const tabList = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  { key: "vehicles", label: "Vehicle Options" }
];

const Service = () => {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  // Animation variants for the itinerary list
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % packages[selectedPackage].images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedPackage]);

  const packageTabClass = (idx) =>
    `px-4 py-2 rounded-full font-semibold transition-colors duration-150 text-sm sm:text-base ${
      selectedPackage === idx
        ? "bg-emerald-600 text-white shadow-md"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`;

  const tabButtonClass = (tab) =>
    `px-4 py-2 rounded-lg font-semibold transition-colors duration-150 text-sm sm:text-base ${
      activeTab === tab
        ? "bg-emerald-600 text-white shadow-md"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`;

  const pkg = packages[selectedPackage];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
    >
      <div className="max-w-5xl w-full flex flex-col items-center">
        {/* Title and subtitle */}
        <div className="w-full flex flex-col items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight text-center">
            Our Packages
          </h2>
          <p className="mt-1 text-sm text-gray-600 text-center font-medium max-w-2xl">
            Crafting unforgettable journeys across Sri Lanka's wild and wonder.
          </p>
        </div>
        
        {/* Package tab buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-4 sm:mb-6 px-2">
          {packages.map((pkg, idx) => (
            <button 
              key={pkg.id}
              className={`${packageTabClass(idx)} text-xs sm:text-sm px-3 py-1.5`} 
              onClick={() => { 
                setSelectedPackage(idx); 
                setSlideIdx(0); 
                setActiveTab("overview"); 
              }}
            >
              {pkg.sale}
            </button>
          ))}
        </div>
        
        {/* Single card unit with white background */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ boxShadow: "0 10px 15px -3px rgba(5, 150, 105, 0.1), 0 4px 6px -2px rgba(5, 150, 105, 0.05)" }}
          className="w-full flex flex-col lg:flex-row rounded-xl border border-emerald-100 shadow-sm bg-white overflow-hidden max-w-5xl"
        >
          {/* Left: Image slider */}
          <div className="relative w-full lg:w-2/5 aspect-video lg:aspect-[4/5] flex-shrink-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={slideIdx}
                src={pkg.images[slideIdx]}
                alt={pkg.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            
            {/* Image indicator dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
              {pkg.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    slideIdx === index ? 'bg-white scale-125' : 'bg-white/60'
                  }`}
                  onClick={() => setSlideIdx(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute top-2 left-2 bg-emerald-600 text-white rounded px-2 py-0.5 text-xs font-bold shadow z-10">
              {pkg.sale}
            </div>
          </div>
          
          {/* Right: Details with tabs */}
          <div className="flex-1 flex flex-col p-3 sm:p-4">
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-black mb-1">{pkg.title}</h2>
              <div className="text-emerald-700 text-xs sm:text-sm mb-3">{pkg.subtitle}</div>
              
              {/* Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tabList.map(tab => (
                  <button
                    key={tab.key}
                    className={`${tabButtonClass(tab.key)} text-xs px-2.5 py-1`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100 min-h-[120px] sm:min-h-[140px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="h-full text-sm leading-snug"
                  >
                    {activeTab === "overview" && (
                      <div className="text-gray-700 text-xs sm:text-sm leading-relaxed">{pkg.overview}</div>
                    )}
                    {activeTab === "itinerary" && (
                      <motion.ul 
                        key="itinerary"
                        className="space-y-2 text-gray-700 text-xs sm:text-sm"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {pkg.route.map((r, i) => (
                          <motion.li 
                            key={i}
                            className="flex items-start gap-1.5"
                            variants={listItemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: i * 0.04 }}
                          >
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold mt-0.5 flex-shrink-0">
                              {i + 1}
                            </span>
                            <span className="text-xs sm:text-sm">{r}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                    {activeTab === "vehicles" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pkg.vehicles.map((v, i) => (
                          <motion.div 
                            key={i} 
                            className="bg-white border border-emerald-200 rounded-md p-2 text-black text-xs sm:text-sm font-medium shadow-sm hover:shadow transition-all"
                            whileHover={{ scale: 1.02, boxShadow: "0 2px 4px -1px rgba(5, 150, 105, 0.1)" }}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                          >
                            <div className="font-semibold text-emerald-700 text-xs sm:text-sm">{v.type}</div>
                            <div className="text-gray-500 text-[10px] sm:text-xs">({v.capacity} pax)</div>
                            <div className="text-emerald-700 font-bold text-xs sm:text-sm">
                              {v.price} <span className="text-gray-500 font-normal">/day</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Book button */}
            <div className="mt-3 sm:mt-4">
              <motion.a
                whileHover={{ scale: 1.02, backgroundColor: "#047857" }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/94778888888?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(
                  pkg.title
                )}%20tour%20package.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-md px-4 py-2 text-sm sm:text-sm text-center shadow-sm transition-colors"
              >
                Book Now
              </motion.a>
              <p className="text-[10px] text-gray-400 text-center mt-1">
                WhatsApp us to book this package
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Package indicator for mobile */}
        <div className="lg:hidden flex justify-center mt-6 space-x-2">
          {packages.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${
                selectedPackage === idx ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
              onClick={() => {
                setSelectedPackage(idx);
                setSlideIdx(0);
                setActiveTab("overview");
              }}
              aria-label={`Select package ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Service;