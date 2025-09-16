import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from '../Common/Modal';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom GPS icon
const gpsIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map click events
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
}

// Component to handle map centering
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Component to get current location
function LocationMarker({ onLocationFound }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    map.locate(options).on({
      locationfound: function(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        onLocationFound(e.latlng.lat, e.latlng.lng);
      },
      locationerror: function(e) {
        console.error('Geolocation error:', e.message);
        alert('Unable to retrieve your location. Please check your browser permissions or try again.');
        if (onLocationFound) {
          onLocationFound(null, null, true);
        }
      }
    });
  }, [map, onLocationFound]);

  React.useEffect(() => {
    locateUser();
  }, [locateUser]);

  return position === null ? null : (
    <Marker position={position} icon={gpsIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const LocationPicker = forwardRef(({ onSelect, initialPosition = [7.8731, 80.7718], initialAddress = '' }, ref) => {
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);
  const [address, setAddress] = useState(initialAddress);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [zoom, setZoom] = useState(7);
  const [isOpen, setIsOpen] = useState(false);
  const mapRef = useRef();
  const searchInputRef = useRef();

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    open: (position, address) => {
      if (position) setSelectedPosition(position);
      if (address) setAddress(address);
      setIsOpen(true);
    },
    close: () => setIsOpen(false)
  }));

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect({
        position: selectedPosition,
        address
      });
    }
    setIsOpen(false);
  };

  const handleLocationSelect = async (lat, lng) => {
    setSelectedPosition([lat, lng]);
    try {
      // Reverse geocoding to get address from coordinates
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      setAddress(data.display_name || 'Address not found');
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Could not retrieve address');
    }
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    setIsLocating(true);
    // The LocationMarker component will handle the actual GPS location
  };

  const handleLocationFound = async (lat, lng, error = false) => {
    if (error) {
      setIsLocating(false);
      return;
    }
    setSelectedPosition([lat, lng]);
    try {
      // Fetch address for the current location
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const locationAddress = data.display_name || 'Address not found';
      setAddress(locationAddress);
      
      // Call onSelect with the complete location data
      if (onSelect) {
        onSelect({
          position: [lat, lng],
          address: locationAddress
        });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Address not available');
    }
    setIsLocating(false);
  };

  const handleSearchAddress = async () => {
    if (!searchQuery) return;
    
    try {
      // Forward geocoding to get coordinates from address
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const position = [parseFloat(lat), parseFloat(lon)];
        const selectedAddress = display_name || searchQuery;
        
        setSelectedPosition(position);
        setAddress(selectedAddress); // Update the address state with the selected location
        setSearchQuery(''); // Clear the search query
        setZoom(15); // Zoom in on the found location
        
        // Call onSelect with the found location data
        if (onSelect) {
          onSelect({
            position,
            address: selectedAddress
          });
        }
      } else {
        alert('Address not found');
      }
    } catch (error) {
      console.error('Error searching address:', error);
      alert('Error searching address');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Select Location">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchAddress()}
              placeholder="Search or click on the map"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button 
              onClick={handleSearchAddress}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <button 
            onClick={handleUseGPS}
            disabled={isLocating}
            className="p-2 sm:px-4 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-1 sm:gap-2 whitespace-nowrap transition-all duration-200"
            title={isLocating ? 'Locating...' : 'Use current location'}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">
              {isLocating ? 'Locating...' : 'My Location'}
            </span>
          </button>
        </div>
        
        <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
          <MapContainer
            center={selectedPosition}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
            
          >
            <ChangeView center={selectedPosition} zoom={zoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition}>
              <Popup>Selected Location</Popup>
            </Marker>
            <MapClickHandler onLocationSelect={handleLocationSelect} />
            {isLocating && <LocationMarker onLocationFound={handleLocationFound} />}
          </MapContainer>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Selected Location</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium font-bold">Coordinates:</span> {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium font-bold">Address:</span> {address || 'Click on the map to select a location'}
          </p>
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
          >
            Select Location
          </button>
        </div>
      </div>
    </Modal>
  );
});

export default LocationPicker;