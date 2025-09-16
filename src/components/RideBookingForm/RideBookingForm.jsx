import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, MessageCircle } from 'lucide-react';
import Heading from '../Heading/header';
import kdh from "../../assets/KDH.png"
import prius from "../../assets/sedan.png"
import wagonr from "../../assets/WagonR.png"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

const headerVariants = {
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

const vehicleCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const formSectionVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

const leftContentVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const tabVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

function RideBookingForm() {
  const [activeTab, setActiveTab] = useState('ride')
  const [formData, setFormData] = useState({
    pickupDestination: '',
    dropDestination: '',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTimeHours: '18',
    pickupTimeMinutes: '30',
    vehicle: '',
    totalPrice: 'LKR 0.00',
    customRequest: ''
  })

  const vehicleTypes = [
    'Mini Car',
    'Sedan', 
    'Van'
  ]

  const pickupDestinations = [
    'Katunayaka',
    'Mattala',
    'Thissamaharama',
    'Yala'
  ]

  const dropDestinations = [
    'Adams Peak',
    'Ahangama',
    'Ahungalla',
    'Ambalangoda',
    'Anuradapura',
    'Arugambe',
    'Awissawella',
    'Badulla',
    'Balapitiya',
    'Banarawela',
    'Baticola',
    'Batticaloa',
    'Beliatta',
    'Benthota',
    'Beruwala',
    'Colombo',
    'Dabulla',
    'Dikwalla',
    'Ella',
    'Galle',
    'Hambanthota',
    'Haputale',
    'Hatton',
    'Hikkaduwa',
    'Hireketiya',
    'Hirikatiya',
    'Hiriketiya',
    'Kabalana',
    'Kalamatiya',
    'Kandy',
    'Katharagama',
    'Katunayaka',
    'Koggala',
    'Kosgoda',
    'Kurunegala',
    'Madolduwa',
    'Mathale',
    'Midigama',
    'Mirissa',
    'Negambo',
    'Neuwara Eliya',
    'Nuwara Eliya',
    'Polhena',
    'Polonaruwa',
    'Pothuwil',
    'Puttalam',
    'Rakawa',
    'Rathnapura',
    'Rekawa',
    'Sigiriya',
    'Sinharajaya',
    'Talalla',
    'Talpe',
    'Tangalle',
    'Thangalla',
    'Thissamaharama',
    'Trincomalee',
    'Udawalawa',
    'Udawalawa 1',
    'Udawalawa 2 high way',
    'Unawatuna',
    'Vilpaththuwa',
    'Waligama',
    'Yaala'
  ]

  const vehicles = [
    { name: 'Mini Car', img:wagonr, blurb: 'Compact and economical — great for city tours.' },
    { name: 'Sedan', img: prius, blurb: 'Comfortable intercity rides for 3–4 passengers.' },
    { name: 'Van', img: kdh, blurb: 'Spacious van ideal for families and travel groups.' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const tabs = [
    { id: 'ride', label: 'Book a Ride' },
    { id: 'trip', label: 'Book a Trip' },
    { id: 'custom', label: 'Custom Request' }
  ]

  const features = [
    '24/7 Service',
    'Professional Drivers',
    'Safe & Comfortable'
  ];

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div className="text-center mb-12" variants={headerVariants}>
        <Heading 
          title="Our Fleet"
          subtitle="Choose the right vehicle for your journey. From compact city rides to spacious vans for group tours, each option is maintained to deliver comfort and safety across Sri Lanka."
        />
      </motion.div>

      {/* Vehicle Cards */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {vehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.name}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-300"
              variants={vehicleCardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image Container with Gradient Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <motion.img 
                  src={vehicle.img} 
                  alt={vehicle.name} 
                  className="w-full h-full object-contain p-4" 
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors"
                      layoutId={`vehicle-title-${idx}`}
                    >
                      {vehicle.name}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-500 text-sm leading-relaxed"
                      variants={textVariants}
                    >
                      {vehicle.blurb}
                    </motion.p>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      className="w-2 h-2 bg-emerald-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Main Section: Left Content + Form */}
      <section id="contact">
        <div className="mt-16 flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left Side Content */}
          <motion.div 
            className="md:w-7/12 w-full flex flex-col justify-center py-2 md:py-0 pl-0"
            variants={leftContentVariants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight max-w-[800px]"
              variants={textVariants}
            >
              Book a <motion.span 
                className="text-emerald-600 italic font-extrabold"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                Ride
              </motion.span><br />
              to your destination<br />
              in Sri Lanka
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 text-lg sm:text-xl font-normal mb-8 max-w-[650px]"
              variants={textVariants}
            >
              Experience seamless, comfortable, and reliable transportation across the beautiful island of Sri Lanka with our professional drivers and premium fleet.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-x-10 gap-y-4 text-base sm:text-lg font-semibold max-w-[650px]"
              variants={containerVariants}
            >
              {features.map((feature, idx) => (
                <motion.span 
                  key={feature}
                  className="flex items-center gap-2 text-gray-800"
                  variants={featureVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span 
                    className="w-3 h-3 bg-emerald-600 rounded-full inline-block"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                  {feature}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side Form */}
          <motion.div 
            className="md:w-5/12 flex items-center"
            variants={formSectionVariants}
          >
            <div className="w-full">
              <motion.div 
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-200 relative z-10"
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Navigation Tabs */}
                <motion.div 
                  className="flex mb-4 sm:mb-6"
                  variants={containerVariants}
                >
                  {tabs.map((tab, idx) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-emerald-600 text-white rounded-lg'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      variants={tabVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">
                        {tab.id === 'ride' ? 'Ride' : tab.id === 'trip' ? 'Trip' : 'Custom'}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <AnimatePresence mode="wait">
                    {activeTab === 'ride' && (
                      <motion.div
                        key="ride-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        {/* Pickup Destination */}
                        <motion.div variants={formFieldVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Pickup Destination
                          </label>
                          <div className="relative">
                            <motion.select
                              value={formData.pickupDestination}
                              onChange={(e) => handleInputChange('pickupDestination', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <option value="" disabled className="bg-white text-gray-500">
                                Select Destination
                              </option>
                              {pickupDestinations.map((destination) => (
                                <option key={destination} value={destination} className="bg-white text-gray-900">
                                  {destination}
                                </option>
                              ))}
                            </motion.select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                          </div>
                        </motion.div>

                        {/* Vehicle helper note */}
                        <AnimatePresence>
                          {formData.vehicle === 'Van' && (
                            <motion.p 
                              className="mt-2 text-xs sm:text-sm text-gray-600"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              Vans are ideal for families and small groups. Comfortable seating,
                              air-conditioning, and extra luggage space for a spacious ride.
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Drop Destination */}
                        <motion.div variants={formFieldVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Drop Destination
                          </label>
                          <div className="relative">
                            <motion.select
                              value={formData.dropDestination}
                              onChange={(e) => handleInputChange('dropDestination', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <option value="" disabled className="text-gray-500">
                                Select Destination
                              </option>
                              {dropDestinations.map((destination) => (
                                <option key={destination} value={destination} className="bg-white text-gray-900">
                                  {destination}
                                </option>
                              ))}
                            </motion.select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                          </div>
                        </motion.div>

                        {/* Pick-Up Date */}
                        <motion.div variants={formFieldVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Pick-Up Date
                          </label>
                          <div className="relative">
                            <motion.input
                              type="date"
                              value={formData.pickupDate}
                              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                              min={new Date().toISOString().split('T')[0]}
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        </motion.div>

                        {/* Pick-Up Time */}
                        <motion.div variants={formFieldVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Pick-Up Time
                          </label>
                          <div className="relative">
                            <motion.input
                              type="time"
                              value={`${formData.pickupTimeHours.padStart(2, '0')}:${formData.pickupTimeMinutes.padStart(2, '0')}`}
                              onChange={(e) => {
                                const [hours, minutes] = e.target.value.split(':');
                                handleInputChange('pickupTimeHours', hours);
                                handleInputChange('pickupTimeMinutes', minutes);
                              }}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        </motion.div>

                        {/* Vehicle */}
                        <motion.div variants={formFieldVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Vehicle
                          </label>
                          <div className="relative">
                            <motion.select
                              value={formData.vehicle}
                              onChange={(e) => handleInputChange('vehicle', e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <option value="" disabled className="text-gray-500">
                                Select Vehicle
                              </option>
                              {vehicleTypes.map((vehicle) => (
                                <option key={vehicle} value={vehicle} className="bg-white text-gray-900">
                                  {vehicle}
                                </option>
                              ))}
                            </motion.select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                          </div>
                        </motion.div>

                        {/* Total Price */}
                        <motion.div variants={formFieldVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Total Price
                          </label>
                          <motion.div 
                            className="bg-gray-100 border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900"
                            animate={{ 
                              scale: formData.totalPrice !== 'LKR 0.00' ? [1, 1.02, 1] : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {formData.totalPrice}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}

                    {activeTab === 'trip' && (
                      <motion.div
                        key="trip-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center mb-6">
                          <motion.h3 
                            className="text-lg sm:text-xl font-medium text-gray-900 mb-4"
                            variants={textVariants}
                          >
                            Explain your Need, we will help you
                          </motion.h3>
                          <div className="relative">
                            <motion.textarea
                              value={formData.customRequest}
                              onChange={(e) => handleInputChange('customRequest', e.target.value)}
                              placeholder="Write your trip request here..."
                              rows={6}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y"
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'custom' && (
                      <motion.div
                        key="custom-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center mb-6">
                          <motion.h3 
                            className="text-lg sm:text-xl font-medium text-gray-900 mb-4"
                            variants={textVariants}
                          >
                            Custom Message
                          </motion.h3>
                          <div className="relative">
                            <motion.textarea
                              value={formData.customRequest}
                              onChange={(e) => handleInputChange('customRequest', e.target.value)}
                              placeholder="Write your custom request here..."
                              rows={6}
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y"
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Reserve Now Button */}
                  <motion.button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-lg text-sm sm:text-base"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px -3px rgba(6, 78, 59, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                  >
                    Reserve Now
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default RideBookingForm