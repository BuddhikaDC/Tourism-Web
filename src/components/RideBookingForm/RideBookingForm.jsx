import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
    'Jeep',
    'KDH',
    'KDH High Roof'
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
    <div className="w-full max-w-6xl mx-auto px-0 sm:px-0 lg:px-0 flex flex-col md:flex-row gap-8 items-stretch">
      {/* Left Side Content */}
      <div className="md:w-7/12 w-full flex flex-col justify-center py-2 md:py-0 pl-0">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-7 leading-tight max-w-[800px]">
          Book a <span className="text-emerald-500 italic font-extrabold">Ride</span><br />
          to your destination<br />
          in Sri Lanka
        </h1>
        <p className="text-white text-lg sm:text-2xl font-medium mb-8 drop-shadow max-w-[650px]">
          Experience seamless, comfortable, and reliable transportation across the beautiful island of Sri Lanka with our professional drivers and premium fleet.
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-base sm:text-lg font-semibold max-w-[650px]">
          <span className="flex items-center gap-2 text-white">
            <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span>
            24/7 Service
          </span>
          <span className="flex items-center gap-2 text-white">
            <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span>
            Professional Drivers
          </span>
          <span className="flex items-center gap-2 text-white">
            <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span>
            Safe & Comfortable
          </span>
        </div>
      </div>
      {/* Right Side Form */}
      <div className="md:w-5/12 flex items-center">
        <div className="w-full">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm border border-gray-700 relative z-10">
            {/* Navigation Tabs */}
            <div className="flex mb-4 sm:mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-2 sm:px-3 text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white rounded-lg'
                      : 'text-gray-300 hover:text-gray-100'
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
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                      Pickup Destination
                    </label>
                    <div className="relative">
                      <select
                        value={formData.pickupDestination}
                        onChange={(e) => handleInputChange('pickupDestination', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#1f2937] text-gray-400">
                          Select Destination
                        </option>
                        {pickupDestinations.map((destination) => (
                          <option key={destination} value={destination} className="bg-[#1f2937] text-white">
                            {destination}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Drop Destination */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                      Drop Destination
                    </label>
                    <div className="relative">
                      <select
                        value={formData.dropDestination}
                        onChange={(e) => handleInputChange('dropDestination', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-gray-400">
                          Select Destination
                        </option>
                        {dropDestinations.map((destination) => (
                          <option key={destination} value={destination} className="bg-[#1f2937] text-white">
                            {destination}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Pick-Up Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                      Pick-Up Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {/* Pick-Up Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
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
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  {/* Vehicle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                      Vehicle
                    </label>
                    <div className="relative">
                      <select
                        value={formData.vehicle}
                        onChange={(e) => handleInputChange('vehicle', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-gray-400">
                          Select Vehicle
                        </option>
                        {vehicleTypes.map((vehicle) => (
                          <option key={vehicle} value={vehicle} className="bg-[#1f2937] text-white">
                            {vehicle}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Total Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                      Total Price
                    </label>
                    <div className="bg-gray-600 border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white">
                      {formData.totalPrice}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'trip' && (
                <>
                  {/* Custom Request Form */}
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-4">
                      Explain your Need, we will help you
                    </h3>
                    <div className="relative">
                      <textarea
                        value={formData.customRequest}
                        onChange={(e) => handleInputChange('customRequest', e.target.value)}
                        placeholder="Write your trip request here..."
                        rows={6}
                        className="w-full bg-gray-600 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'custom' && (
                <>
                  {/* Custom Request Form */}
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-4">
                      Custom Message
                    </h3>
                    <div className="relative">
                      <textarea
                        value={formData.customRequest}
                        onChange={(e) => handleInputChange('customRequest', e.target.value)}
                        placeholder="Write your custom request here..."
                        rows={6}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-y"
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
  )
}

export default RideBookingForm
