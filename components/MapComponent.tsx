
import React, { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Destination } from '../types';
import MapPinIcon from './icons/MapPinIcon';
import DirectionsIcon from './icons/DirectionsIcon';

declare var L: any; // Use Leaflet from CDN

interface MapComponentProps {
  destinations: Destination[];
  onGetDirections: (destination: Destination) => void;
  getDirectionsText: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ destinations, onGetDirections, getDirectionsText }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any | null>(null);
  const markerLayerRef = useRef<any | null>(null);

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-1.9403, 29.8739], // Center of Rwanda
        zoom: 8,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapRef.current = map;
      markerLayerRef.current = L.featureGroup().addTo(map);
    }
  }, []);

  // Handle destination changes
  useEffect(() => {
    if (mapRef.current && markerLayerRef.current) {
      markerLayerRef.current.clearLayers();

      if (destinations.length === 0) {
        mapRef.current.flyTo([-1.9403, 29.8739], 8);
        return;
      }

      const iconMarkup = renderToStaticMarkup(<MapPinIcon className="h-10 w-10 text-blue-600 drop-shadow-lg" />);
      const customIcon = L.divIcon({
          html: iconMarkup,
          className: '',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
      });

      destinations.forEach(destination => {
        const { lat, lng, name } = destination;
        const marker = L.marker([lat, lng], { icon: customIcon });

        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
            <div class="font-sans">
                <h3 class="font-bold text-md mb-2">${name}</h3>
            </div>
        `;
        const button = document.createElement('button');
        button.className = "flex items-center space-x-2 w-full justify-center px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";
        const iconSpan = document.createElement('span');
        iconSpan.innerHTML = renderToStaticMarkup(<DirectionsIcon className="h-4 w-4" />);
        button.appendChild(iconSpan);
        const textSpan = document.createElement('span');
        textSpan.innerText = getDirectionsText;
        button.appendChild(textSpan);

        button.onclick = () => onGetDirections(destination);
        popupContent.appendChild(button);

        marker.bindPopup(popupContent);
        markerLayerRef.current.addLayer(marker);
      });
      
      if (destinations.length > 0) {
        const bounds = markerLayerRef.current.getBounds();
        mapRef.current.flyToBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    }
  }, [destinations, onGetDirections, getDirectionsText]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full bg-gray-200 dark:bg-gray-800" />
    </div>
  );
};

export default MapComponent;
