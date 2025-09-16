import { useState, useEffect, useRef } from 'react';
import { locations } from './data';
import './Map.css';
import Heading from '../Heading/header';


// Dynamic import for React Leaflet components
let MapContainer, TileLayer, Marker, Popup, L;

function Map() {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const hoverCardRef = useRef(null);
  const markersRef = useRef({});
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Dynamically import React Leaflet components
    const loadMapComponents = async () => {
      try {
        const leafletModule = await import('leaflet');
        const reactLeafletModule = await import('react-leaflet');
        
        L = leafletModule.default;
        MapContainer = reactLeafletModule.MapContainer;
        TileLayer = reactLeafletModule.TileLayer;
        Marker = reactLeafletModule.Marker;
        Popup = reactLeafletModule.Popup;

        // Import CSS
        await import('leaflet/dist/leaflet.css');
        
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Failed to load map components:', error);
        setMapError('Failed to load map. Please refresh the page.');
      }
    };

    loadMapComponents();
  }, []);

  // Create custom marker icons with tourism icons
  const createCustomIcon = (color = '#3B82F6', icon = '🏛️') => {
    if (!L) return null;
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background: ${color};
          width: 35px;
          height: 35px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-weight: bold;
            font-size: 16px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          ">${icon}</div>
        </div>
      `,
      iconSize: [35, 35],
      iconAnchor: [17, 35],
      popupAnchor: [0, -35]
    });
  };

  if (mapError) {
    return (
      <div className="map-wrapper">
        <div className="map-container" style={{ 
          height: '500px', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#fef2f2',
          borderRadius: '16px',
          border: '2px solid #fecaca'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ color: '#dc2626', marginBottom: '8px' }}>Map Error</h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>{mapError}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isMapLoaded) {
    return (
      <div className="map-wrapper">
        <div className="map-container" style={{ 
          height: '500px', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#f8fafc',
          borderRadius: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid #e5e7eb', 
              borderTop: '4px solid #3b82f6', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Heading 
          title="Our Destinations" 
          subtitle="Explore the beauty of Sri Lanka" 
        />
      </div>
      <div className="map-wrapper rounded-2xl overflow-hidden shadow-lg">
        <MapContainer 
          ref={mapRef}
          center={[7.8731, 80.7718]} 
          zoom={7.5} 
          minZoom={6}
          maxZoom={7.5}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={false}
          touchZoom={true}
          boxZoom={false}
          keyboard={false}
          tap={false}
          className="map-container"
          style={{ height: '600px', width: '100%' }}
        >
        <TileLayer
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=OwifIvOwabeY9if3P8Hf"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => {
          // Color scheme based on location type
          const getColorByType = (type) => {
            switch(type) {
              case 'historical': return '#8B5CF6'; // Purple for historical sites
              case 'religious': return '#F59E0B'; // Orange for religious sites
              case 'nature': return '#10B981'; // Green for nature
              case 'wildlife': return '#EF4444'; // Red for wildlife
              case 'beach': return '#06B6D4'; // Cyan for beaches
              case 'cultural': return '#3B82F6'; // Blue for cultural
              default: return '#6B7280'; // Gray default
            }
          };
          
          const color = getColorByType(location.type);
          const icon = createCustomIcon(color, location.icon);
          
          return (
            <Marker
              key={location.id}
              position={location.position}
              icon={icon}
              eventHandlers={{
                mouseover: (e) => {
                  if (!activePopup) {
                    setHoveredLocation(location);
                    markersRef.current[location.id] = e.target;
                  }
                },
                mouseout: (e) => {
                  if (!activePopup) {
                    setHoveredLocation(null);
                  }
                },
                click: (e) => {
                  setActivePopup(location.id);
                  setHoveredLocation(null);
                },
              }}
            >
            <Popup 
              className="custom-popup"
              onOpen={() => setActivePopup(location.id)}
              onClose={() => {
                setActivePopup(null);
                // Reset hover state to show hover card again
                const marker = markersRef.current[location.id];
                if (marker) {
                  const markerEl = marker.getElement();
                  if (markerEl && markerEl.matches(':hover')) {
                    setHoveredLocation(location);
                  }
                }
              }}
            >
                    <div
                      className="popup-content relative w-80 h-56 rounded-xl shadow-lg overflow-hidden text-white flex flex-col justify-between"
                      style={{ backgroundImage: `url(${location.image})`, backgroundSize: 'cover', backgroundPosition: 'center',padding:0 }}
                    >
                      {/* Overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                      {/* Title */}
                      <h3 className="popup-title relative z-10 px-4 pt-3 text-lg font-semibold drop-shadow-md">
                        {location.name}
                      </h3>

                      {/* Description at bottom full width */}
                      <p className="popup-description relative z-10 bg-black/50 px-4 py-2 text-sm text-center"
                      style={{margin:0}}
                      >
                        {location.description}
                      </p>
                    </div>
            </Popup>

            </Marker>
          );
        })}

        <div 
          ref={hoverCardRef}
          className={`hover-card ${hoveredLocation ? 'visible' : ''}`}
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            transform: 'translate(-50%, -100%)',
            visibility: (hoveredLocation && !activePopup) ? 'visible' : 'hidden',
            ...(hoveredLocation && markersRef.current[hoveredLocation.id] ? (() => {
              const marker = markersRef.current[hoveredLocation.id];
              const markerEl = marker.getElement();
              if (markerEl) {
                const rect = markerEl.getBoundingClientRect();
                const mapRect = mapRef.current.getContainer().getBoundingClientRect();
                return {
                  left: `${rect.left - mapRect.left + rect.width / 2}px`,
                  top: `${rect.top - mapRect.top}px`
                };
              }
              return {};
            })() : {})
          }}
        >
          {hoveredLocation && (
            <div
            className="popup-content relative w-80 h-56 rounded-xl shadow-lg overflow-hidden text-white flex flex-col"
            style={{
              backgroundImage: `url(${hoveredLocation.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding:0 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            {/* Title at top */}
            <h3 className="popup-title relative z-10 px-4 pt-3 text-lg font-semibold drop-shadow-md">
              {hoveredLocation.name}
            </h3>
          
            {/* Spacer to push description to bottom */}
            <div className="flex-grow"></div>
          
            {/* Description at bottom full width */}
            <p className="popup-description relative z-10 bg-black/50 px-4 py-2 text-sm text-center w-full" 
            style={{margin:0}}
            >
              {hoveredLocation.description}
            </p>
          </div>
          )}
        </div>
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;