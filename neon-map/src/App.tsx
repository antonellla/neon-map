import * as React from 'react';
import { useState, useMemo } from 'react';
import { Container, createRoot } from 'react-dom/client';
import { 
  Map, 
  Marker,
  Popup
} from 'react-map-gl/maplibre';

import { LocationData } from './LocationData';
import Pin from './point';

// import 'maplibre-gl/dist/maplibre-gl.css';

import LOCATIONS from './.data/locations.json'


export default function App() {
  const [popupInfo, setPopupInfo] = useState<LocationData | null>(null);

  const pins = useMemo(
    () =>
      LOCATIONS.map((location, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={location.longitude}
          latitude={location.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
  <>
    <Map
      initialViewState={{
        longitude: -118.1,
        latitude: 34.0,
        zoom: 8,
        bearing: 0,
        pitch: 0
      }}
      style={{width: 1000, height: 800}}
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
    >

      {pins}

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            {popupInfo.location} |{' '}
          </div>
        </Popup>
      )}

    </Map>
  </>
  );
}

export function renderToDom(container: Container) {
  createRoot(container).render(<App />);
}
