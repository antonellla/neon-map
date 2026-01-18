import * as React from 'react';
import {useState, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import {
  Map,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl/maplibre';

import Pin from './pin';

import LOCATIONS from '../../.data/locations.json';

export default function App() {
  const [popupInfo, setPopupInfo] = useState(null);

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
          latitude: 34.1,
          longitude: -118.1,
          zoom: 11,
          bearing: 0,
          pitch: 0
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

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
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>

    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
