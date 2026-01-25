import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import {
  Map,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from 'react-map-gl/maplibre';

import Pin from './components/pin/pin';

import LOCATIONS from '../../.data/locations.json';

export default function App() {
  const [popupInfo, setPopupInfo] = useState(null);

  const [state, setState] = useState({
    isPaneOpen: false,
    locationName: null,
    location: null,
  });

  const pins = useMemo( () =>
    LOCATIONS.map((location, index) => (
      <Marker key={`marker-${index}`}
              longitude={location.longitude}
              latitude={location.latitude}
              anchor="bottom"
              onClick={event => {
                event.originalEvent.stopPropagation();
                setPopupInfo(location);
              }}>
        <Pin />
      </Marker>
    )),
  []
  );

  return (
    <>
      <Map initialViewState={{
             latitude: 34.1,
             longitude: -118.25,
             zoom: 11,
             bearing: 0,
             pitch: 0
           }}
           mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json">

        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup maxWidth="340px"
                 anchor="top"
                 longitude={Number(popupInfo.longitude)}
                 latitude={Number(popupInfo.latitude)}
                 onClose={() => setPopupInfo(null)}>
            <div>
              <span class="popup-title">{popupInfo.name}</span><br />
              <span class="popup-location">{popupInfo.location}</span>
            </div>
            <img width="100%" src={popupInfo.thumb} />

            <a href="#" onClick={() => 
              setState({ 
                isPaneOpen: true,
                locationName: popupInfo.name,
                location: popupInfo.location
              })}>
              see more
            </a>
          </Popup>
        )}

      </Map>
      
      <SlidingPane className="detail-pane"
                   overlayClassName="detail-overlay"
                   isOpen={state.isPaneOpen}
                   title={state.locationName}
                   subtitle={state.location}
                   closeIcon="x"
                   onRequestClose={() => {
                    setState({ isPaneOpen: false });
                   }} 
                   children={undefined}>
        <div></div>

      </SlidingPane>

    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
