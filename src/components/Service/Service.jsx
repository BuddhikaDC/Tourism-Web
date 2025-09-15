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
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % packages[selectedPackage].images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedPackage]);

  const tabButtonClass = (tab) =>
    `px-4 py-2 rounded-t-lg font-semibold transition-colors duration-150 ${
      activeTab === tab
        ? "bg-emerald-600 text-white"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`;

  const packageTabClass = (idx) =>
    `px-4 py-2 rounded-full font-semibold transition-colors duration-150 ${
      selectedPackage === idx
        ? "bg-emerald-600 text-white"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`;

  const pkg = packages[selectedPackage];

  const handlePackageChange = (idx) => {
    setSelectedPackage(idx);
    setSlideIdx(0);
    setActiveTab("overview");
  };

  return (
    <motion.div 
      className="w-full bg-white from-gray-800 to-gray-900 bp-20 py-16 px-4 sm:px-6 lg:px-8 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Title section */}
      <motion.div 
        className="w-full flex flex-col items-center mb-8"
        variants={titleVariants}
      >
        <motion.h2 
          className="text-3xl font-bold text-black tracking-tight text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Our Packages
        </motion.h2>
        <motion.p 
          className="mt-2 text-base text-gray-600 text-center font-medium"
          variants={titleVariants}
        >
          Crafting unforgettable journeys across Sri Lanka's wild and wonder.
        </motion.p>
      </motion.div>

      {/* Package tabs */}
      <motion.div 
        className="flex justify-center gap-4 mb-8"
        variants={tabVariants}
      >
        {packages.map((_, idx) => (
          <motion.button 
            key={idx}
            className={packageTabClass(idx)} 
            onClick={() => handlePackageChange(idx)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {packages[idx].sale}
          </motion.button>
        ))}
      </motion.div>

      {/* Card with tabs */}
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch"
        variants={cardVariants}
      >
        {/* Left: Image slider */}
        <motion.div 
          className="relative w-full lg:w-1/2 h-[260px] lg:h-[420px] flex-shrink-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`${selectedPackage}-${slideIdx}`}
              src={pkg.images[slideIdx]}
              alt={pkg.title}
              className="object-cover w-full h-full rounded-2xl"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          </AnimatePresence>
          <motion.div 
            className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg px-4 py-2 flex flex-col items-center font-bold text-base shadow shadow-emerald-300 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
          >
            <span>{pkg.sale}</span>
          </motion.div>
        </motion.div>

        {/* Right: Details with tabs */}
        <motion.div
          className="flex-1 flex flex-col justify-between px-4 py-6 sm:px-8 sm:py-8 bg-white rounded-2xl border border-emerald-200 shadow-lg"
          whileHover={{ 
            y: -4,
            boxShadow: "0 20px 25px -5px rgb(6 78 59 / 0.1), 0 10px 10px -5px rgb(6 78 59 / 0.04)"
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
            >
              <motion.h2 
                className="font-black text-2xl text-black mb-2"
                layoutId="package-title"
              >
                {pkg.title}
              </motion.h2>
              <motion.div 
                className="text-emerald-900 text-base mb-4"
                layoutId="package-subtitle"
              >
                {pkg.subtitle}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Tabs */}
          <motion.div 
            className="flex gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {["overview", "itinerary", "vehicles"].map((tab) => (
              <motion.button 
                key={tab}
                className={tabButtonClass(tab)} 
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 min-h-[120px]"
            layout
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div 
                  key="overview"
                  className="text-black text-base"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {pkg.overview}
                </motion.div>
              )}
              {activeTab === "itinerary" && (
                <motion.ul 
                  key="itinerary"
                  className="list-disc pl-5 mt-2 text-black text-sm"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {pkg.route.map((r, i) => (
                    <motion.li 
                      key={i}
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: i * 0.1 }}
                    >
                      {r}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
              {activeTab === "vehicles" && (
                <motion.div 
                  key="vehicles"
                  className="flex flex-row flex-wrap gap-4 mt-2"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {pkg.vehicles.map((v, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-white border border-emerald-200 rounded-lg px-4 py-2 text-black text-sm font-semibold shadow"
                      variants={vehicleCardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        boxShadow: "0 10px 25px -3px rgb(6 78 59 / 0.1), 0 4px 6px -2px rgb(6 78 59 / 0.05)"
                      }}
                    >
                      {v.type} <span className="text-gray-500">({v.capacity} pax)</span>
                      <div className="text-emerald-700 font-bold">
                        {v.price} <span className="text-xs text-gray-600">per day</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col space-y-3 sm:space-y-4 w-full mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <motion.a
              href={`https://wa.me/94717244821?text=${encodeURIComponent(
                `Hello, I am interested in the "${pkg.title}" package.\nItinerary:\n${pkg.route.join('\n')}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[140px] w-full sm:w-auto bg-black hover:bg-emerald-700 active:bg-emerald-700 text-white font-bold rounded-lg px-7 py-2 text-base transition shadow shadow-emerald-300 border-2 border-emerald-600 flex items-center justify-center"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#059669",
                boxShadow: "0 10px 25px -3px rgb(6 78 59 / 0.3), 0 4px 6px -2px rgb(6 78 59 / 0.05)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Book This Package
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Service;