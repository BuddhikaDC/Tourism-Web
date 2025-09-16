import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, MessageCircle, Search, MapPin, Map } from 'lucide-react';
import LocationPicker from '../Map/Location';
import Heading from '../Heading/header';
import kdh from "../../assets/KDH.png"
import prius from "../../assets/sedan.png"
import wagonr from "../../assets/WagonR.png"

// Animation variants (same as before)
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

// Tab transition variants
const tabContentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.2 }
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
    customRequest: '',
    pickupCoords: null,
    dropCoords: null
  })

  // State for search functionality
  const [pickupSearch, setPickupSearch] = useState('')
  const [dropSearch, setDropSearch] = useState('')
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [dropSuggestions, setDropSuggestions] = useState([])
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDropSuggestions, setShowDropSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState({
    pickup: false,
    drop: false
  });

  const vehicleTypes = [
    'Mini Car',
    'Sedan', 
    'Van'
  ]

  const vehicles = [
    { name: 'Mini Car', img:wagonr, blurb: 'Compact and economical — great for city tours.' },
    { name: 'Sedan', img: prius, blurb: 'Comfortable intercity rides for 3–4 passengers.' },
    { name: 'Van', img: kdh, blurb: 'Spacious van ideal for families and travel groups.' }
  ]

  // Debounced search function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Fetch cities from API
  const fetchCities = async (query, setSuggestions) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`https://slcities.live/api/cities/search?q=${query}`);
      if (response.ok) {
        const data = await response.json();
        // Limit to 10 results
        setSuggestions(data.slice(0, 10));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced versions of the fetch functions
  const debouncedFetchPickupCities = useCallback(
    debounce((query) => fetchCities(query, setPickupSuggestions), 300),
    []
  );

  const debouncedFetchDropCities = useCallback(
    debounce((query) => fetchCities(query, setDropSuggestions), 300),
    []
  );

  // Handle search input changes
  const handlePickupSearchChange = (value) => {
    setPickupSearch(value);
    debouncedFetchPickupCities(value);
  };

  const handleDropSearchChange = (value) => {
    setDropSearch(value);
    debouncedFetchDropCities(value);
  };

  // Refs for location pickers
  const pickupMapRef = useRef();
  const dropMapRef = useRef();

  // Handle location selection from map
  const handleLocationSelect = (type) => async (location) => {
    setIsLocationLoading(prev => ({ ...prev, [type]: true }));
    
    try {
      const { position, address } = location;
      const coords = position ? { lat: position[0], lng: position[1] } : null;
      
      if (type === 'pickup') {
        // Update both form data and search state
        setFormData(prev => ({
          ...prev,
          pickupDestination: address,
          pickupCoords: coords
        }));
        setPickupSearch(address);
      } else {
        setFormData(prev => ({
          ...prev,
          dropDestination: address,
          dropCoords: coords
        }));
        setDropSearch(address);
      }
    } catch (error) {
      console.error('Error selecting location:', error);
    } finally {
      setIsLocationLoading(prev => ({ ...prev, [type]: false }));
    }
    setShowPickupSuggestions(false);
    setShowDropSuggestions(false);
  };

  // Handle map button click
  const handleOpenMap = (type) => {
    const ref = type === 'pickup' ? pickupMapRef : dropMapRef;
    const currentAddress = type === 'pickup' ? pickupSearch : dropSearch;
    ref.current?.open(undefined, currentAddress);
  };

  // Handle destination selection from search
  const handlePickupSelect = (city) => {
    setFormData(prev => ({ ...prev, pickupDestination: city.city_name_en }));
    setPickupSearch(city.city_name_en);
    setShowPickupSuggestions(false);
  };

  const handleDropSelect = (city) => {
    setFormData(prev => ({ ...prev, dropDestination: city.city_name_en }));
    setDropSearch(city.city_name_en);
    setShowDropSuggestions(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check if all required fields are filled
    const requiredFields = ['pickupDestination', 'dropDestination', 'pickupDate', 'vehicle'];
    const isFormValid = requiredFields.every(field => formData[field]);
    
    if (!isFormValid) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Format the message
    const formatCoords = (coords) => coords ? ` (${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)})` : '';
    
    const message = `🚗 *New Ride Booking*\n\n` +
      `*Pickup:**  ${formData.pickupDestination}${formatCoords(formData.pickupCoords)}\n` +
      `*Drop Off:*  ${formData.dropDestination}${formatCoords(formData.dropCoords)}\n` +
      `*Date:*  ${formData.pickupDate}\n` +
      `*Time:*  ${formData.pickupTimeHours}:${formData.pickupTimeMinutes}\n` +
      `*Vehicle Type:*  ${formData.vehicle}\n` +
      (formData.customRequest ? `📝 *Special Request:* ${formData.customRequest}\n` : '') +
      `\n🌍 *Map Links*\n` +
      (formData.pickupCoords ? `- Pickup: https://www.google.com/maps?q=${formData.pickupCoords.lat},${formData.pickupCoords.lng}\n` : '') +
      (formData.dropCoords ? `- Drop: https://www.google.com/maps?q=${formData.dropCoords.lat},${formData.dropCoords.lng}` : '');
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the message (replace with your WhatsApp business number)
    window.open(`https://wa.me/94787177503?text=${encodedMessage}`, '_blank');
    
    // Optional: Reset form after submission
    // setFormData({
    //   pickupDestination: '',
    //   dropDestination: '',
    //   pickupDate: new Date().toISOString().split('T')[0],
    //   pickupTimeHours: '18',
    //   pickupTimeMinutes: '30',
    //   vehicle: '',
    //   customRequest: ''
    // });
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
    <div className="relative">
      {/* Location Pickers */}
      <LocationPicker ref={pickupMapRef} onSelect={handleLocationSelect('pickup')} />
      <LocationPicker ref={dropMapRef} onSelect={handleLocationSelect('drop')} />
      
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
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-3 sm:space-y-4"
                      >
                        {/* Pickup Destination */}
                        <motion.div variants={formFieldVariants}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Pickup Destination
                          </label>
                          <div className="relative">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                              <div className="relative flex items-center">
                                <Search className="absolute left-3 text-gray-500 w-5 h-5" />
                                <motion.input
                                  type="text"
                                  value={pickupSearch}
                                  onChange={(e) => handlePickupSearchChange(e.target.value)}
                                  onFocus={() => setShowPickupSuggestions(true)}
                                  placeholder="Search for pickup location..."
                                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                  whileFocus={{ scale: 1.02 }}
                                  transition={{ duration: 0.2 }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleOpenMap('pickup')}
                                  disabled={isLocationLoading.pickup}
                                  className={`absolute right-2 p-1 rounded-full ${
                                    isLocationLoading.pickup 
                                      ? 'text-gray-300 cursor-not-allowed' 
                                      : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-100'
                                  }`}
                                  title={isLocationLoading.pickup ? 'Loading...' : 'Select from map'}
                                >
                                  {isLocationLoading.pickup ? (
                                    <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <MapPin className="w-5 h-5 text-emerald-500" />
                                  )}
                                </button>
                              </div>
                            </div>
                            
                            {/* Suggestions dropdown */}
                            {showPickupSuggestions && (
                              <motion.div 
                                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                {isLoading ? (
                                  <div className="p-3 text-center text-gray-500">Searching...</div>
                                ) : pickupSuggestions.length > 0 ? (
                                  pickupSuggestions.map((city, index) => (
                                    <div
                                      key={index}
                                      className="p-3 cursor-pointer hover:bg-gray-100"
                                      onClick={() => handlePickupSelect(city)}
                                    >
                                      <div className="font-medium">{city.city_name_en}</div>
                                      <div className="text-xs text-gray-500">{city.district_name_en}</div>
                                    </div>
                                  ))
                                ) : pickupSearch.length > 1 ? (
                                  <div className="p-3 text-center text-gray-500">No results found</div>
                                ) : null}
                              </motion.div>
                            )}
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
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                              <div className="relative flex items-center">
                                <Search className="absolute left-3 text-gray-500 w-5 h-5" />
                                <motion.input
                                  type="text"
                                  value={dropSearch}
                                  onChange={(e) => handleDropSearchChange(e.target.value)}
                                  onFocus={() => setShowDropSuggestions(true)}
                                  placeholder="Search for drop location..."
                                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                  whileFocus={{ scale: 1.02 }}
                                  transition={{ duration: 0.2 }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleOpenMap('drop')}
                                  disabled={isLocationLoading.drop}
                                  className={`absolute right-2 p-1 rounded-full ${
                                    isLocationLoading.drop 
                                      ? 'text-gray-300 cursor-not-allowed' 
                                      : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-100'
                                  }`}
                                  title={isLocationLoading.drop ? 'Loading...' : 'Select from map'}
                                >
                                  {isLocationLoading.drop ? (
                                    <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <MapPin className="w-5 h-5 text-emerald-500" />
                                  )}
                                </button>
                              </div>
                            </div>
                            
                            {/* Suggestions dropdown */}
                            {showDropSuggestions && (
                              <motion.div 
                                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                {isLoading ? (
                                  <div className="p-3 text-center text-gray-500">Searching...</div>
                                ) : dropSuggestions.length > 0 ? (
                                  dropSuggestions.map((city, index) => (
                                    <div
                                      key={index}
                                      className="p-3 cursor-pointer hover:bg-gray-100"
                                      onClick={() => handleDropSelect(city)}
                                    >
                                      <div className="font-medium">{city.city_name_en}</div>
                                      <div className="text-xs text-gray-500">{city.district_name_en}</div>
                                    </div>
                                  ))
                                ) : dropSearch.length > 1 ? (
                                  <div className="p-3 text-center text-gray-500">No results found</div>
                                ) : null}
                              </motion.div>
                            )}
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
                      </motion.div>
                    )}

                    {activeTab === 'trip' && (
                      <motion.div
                        key="trip-form"
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
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
                        variants={tabContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
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
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px -3px rgba(6, 78, 59, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.150-.197.297-.767.963-.94 1.16-.174.196-.347.221-.644.075-.297-.15-1.264-.465-2.4-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.298-.018-.46.13-.608.136-.13.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.508-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.718 2.005-1.413.248-.694.248-1.289.173-1.413-.074-.124-.273-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.510-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.467h.005c6.554 0 11.89-5.335 11.89-11.893 0-3.18-1.26-6.167-3.548-8.413z"/>
                    </svg>
                    Book via WhatsApp
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </div>
  )
}

export default RideBookingForm