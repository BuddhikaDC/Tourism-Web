import { useState } from 'react'
import { ChevronDown, Calendar, Clock, Car, MapPin } from 'lucide-react'

function RideBookingForm() {
  const [activeTab, setActiveTab] = useState('ride')
  const [formData, setFormData] = useState({
    pickupDestination: '',
    dropDestination: '',
    pickupDate: '09/10/2025',
    pickupTimeHours: '18',
    pickupTimeMinutes: '30',
    vehicle: '',
    totalPrice: 'LKR 0.00'
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
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-gray-200 relative z-10">
        {/* Navigation Tabs */}
        <div className="flex mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white rounded-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pickup Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Destination
            </label>
            <div className="relative">
              <select
                value={formData.pickupDestination}
                onChange={(e) => handleInputChange('pickupDestination', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-gray-500">
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

          {/* Drop Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Drop Destination
            </label>
            <div className="relative">
              <select
                value={formData.dropDestination}
                onChange={(e) => handleInputChange('dropDestination', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 appearance-none cursor-pointer"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pick-Up Date
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
          </div>

          {/* Pick-Up Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pick-Up Time (24-hr format)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="18"
                  value={formData.pickupTimeHours}
                  onChange={(e) => handleInputChange('pickupTimeHours', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 text-center"
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="30"
                  value={formData.pickupTimeMinutes}
                  onChange={(e) => handleInputChange('pickupTimeMinutes', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 text-center"
                />
              </div>
            </div>
          </div>

          {/* Vehicle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle
            </label>
            <div className="relative">
              <select
                value={formData.vehicle}
                onChange={(e) => handleInputChange('vehicle', e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 appearance-none cursor-pointer"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Price
            </label>
            <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900">
              {formData.totalPrice}
            </div>
          </div>

          {/* Reserve Now Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/20 shadow-lg"
          >
            Reserve Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default RideBookingForm
