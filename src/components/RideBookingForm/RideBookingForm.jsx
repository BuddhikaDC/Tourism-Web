import React, { useState } from 'react';
import { ChevronDown, Check, MessageCircle } from 'lucide-react';
import Heading from '../Heading/header';
import kdh from "../../assets/KDH.png"
import prius from "../../assets/sedan.png"
import wagonr from "../../assets/WagonR.png"


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

  // Vehicle images should live in public/vehicles for reliable loading
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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Heading 
          title="Our Fleet"
          subtitle="Choose the right vehicle for your journey. From compact city rides to spacious vans for group tours, each option is maintained to deliver comfort and safety across Sri Lanka."
        />
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {vehicles.map((vehicle, idx) => (
            <div
              key={vehicle.name}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-300 hover:-translate-y-1"
            >
              {/* Image Container with Gradient Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <img 
                  src={vehicle.img} 
                  alt={vehicle.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4" 
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {vehicle.blurb}
                    </p>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Available</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Section: Left Content + Form */}
      <section id="contact">
      <div className="mt-16 flex flex-col md:flex-row gap-8 items-stretch" >
        {/* Left Side Content */}
        <div className="md:w-7/12 w-full flex flex-col justify-center py-2 md:py-0 pl-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight max-w-[800px]">
            Book a <span className="text-emerald-600 italic font-extrabold">Ride</span><br />
            to your destination<br />
            in Sri Lanka
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl font-normal mb-8 max-w-[650px]">
            Experience seamless, comfortable, and reliable transportation across the beautiful island of Sri Lanka with our professional drivers and premium fleet.
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-base sm:text-lg font-semibold max-w-[650px]">
            <span className="flex items-center gap-2 text-gray-800">
              <span className="w-3 h-3 bg-emerald-600 rounded-full inline-block"></span>
              24/7 Service
            </span>
            <span className="flex items-center gap-2 text-gray-800">
              <span className="w-3 h-3 bg-emerald-600 rounded-full inline-block"></span>
              Professional Drivers
            </span>
            <span className="flex items-center gap-2 text-gray-800">
              <span className="w-3 h-3 bg-emerald-600 rounded-full inline-block"></span>
              Safe & Comfortable
            </span>
          </div>
        </div>
        {/* Right Side Form */}
        <div className="md:w-5/12 flex items-center">
          <div className="w-full">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-200 relative z-10">
              {/* Navigation Tabs */}
              <div className="flex mb-4 sm:mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white rounded-lg'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">
                      {tab.id === 'ride' ? 'Ride' : tab.id === 'trip' ? 'Trip' : 'Custom'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {activeTab === 'ride' && (
                  <>
                    {/* Pickup Destination */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Pickup Destination
                      </label>
                      <div className="relative">
                        <select
                          value={formData.pickupDestination}
                          onChange={(e) => handleInputChange('pickupDestination', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-white text-gray-500">
                            Select Destination
                          </option>
                          {pickupDestinations.map((destination) => (
                            <option key={destination} value={destination} className="bg-white text-gray-900">
                              {destination}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Vehicle helper note */}
                    {formData.vehicle === 'Van' && (
                      <p className="mt-2 text-xs sm:text-sm text-gray-600">
                        Vans are ideal for families and small groups. Comfortable seating,
                        air-conditioning, and extra luggage space for a spacious ride.
                      </p>
                    )}

                    {/* Drop Destination */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Drop Destination
                      </label>
                      <div className="relative">
                        <select
                          value={formData.dropDestination}
                          onChange={(e) => handleInputChange('dropDestination', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="text-gray-500">
                            Select Destination
                          </option>
                          {dropDestinations.map((destination) => (
                            <option key={destination} value={destination} className="bg-white text-gray-900">
                              {destination}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Pick-Up Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Pick-Up Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.pickupDate}
                          onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    {/* Pick-Up Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Pick-Up Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={`${formData.pickupTimeHours.padStart(2, '0')}:${formData.pickupTimeMinutes.padStart(2, '0')}`}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':');
                            handleInputChange('pickupTimeHours', hours);
                            handleInputChange('pickupTimeMinutes', minutes);
                          }}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>

                    {/* Vehicle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Vehicle
                      </label>
                      <div className="relative">
                        <select
                          value={formData.vehicle}
                          onChange={(e) => handleInputChange('vehicle', e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="text-gray-500">
                            Select Vehicle
                          </option>
                          {vehicleTypes.map((vehicle) => (
                            <option key={vehicle} value={vehicle} className="bg-white text-gray-900">
                              {vehicle}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Total Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Total Price
                      </label>
                      <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900">
                        {formData.totalPrice}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'trip' && (
                  <>
                    {/* Custom Request Form */}
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">
                        Explain your Need, we will help you
                      </h3>
                      <div className="relative">
                        <textarea
                          value={formData.customRequest}
                          onChange={(e) => handleInputChange('customRequest', e.target.value)}
                          placeholder="Write your trip request here..."
                          rows={6}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'custom' && (
                  <>
                    {/* Custom Request Form */}
                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">
                        Custom Message
                      </h3>
                      <div className="relative">
                        <textarea
                          value={formData.customRequest}
                          onChange={(e) => handleInputChange('customRequest', e.target.value)}
                          placeholder="Write your custom request here..."
                          rows={6}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Reserve Now Button */}
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-lg text-sm sm:text-base"
                >
                  Reserve Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>

      
    </div>
  )
}

export default RideBookingForm
