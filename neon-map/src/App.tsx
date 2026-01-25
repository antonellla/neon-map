import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Drawer, Box, Button, Typography } from "@mui/material";
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

interface LocationDetail {
  name: string;
  location: string;
  address_1: string;
  address_2: string;
  images: string[];
}

const App: React.FC = () => {
  
  // Popup state 
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo( () =>
    LOCATIONS.map((location, index) => (
      <Marker key={`marker-${index}`}
              longitude={location.longitude}
              latitude={location.latitude}
              anchor="bottom"
              onClick={(event: { originalEvent: { stopPropagation: () => void; }; }) => {
                event.originalEvent.stopPropagation();
                setPopupInfo(location);
              }}>
        <Pin />
      </Marker>
    )),
    []
  );

  // Drawer state 
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationDetail | null>(null);

  const openDrawer = (location: LocationDetail) => {
    setSelectedLocation(location);
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setSelectedLocation(null);
  };

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
              <span className="popup-title">{popupInfo.name}</span><br />
              <span className="popup-location">{popupInfo.location}</span>
            </div>
            <img width="100%" src={popupInfo.thumb} />

            <Button onClick={() =>
              openDrawer({ 
                name: popupInfo.name, 
                location: popupInfo.location, 
                address_1: popupInfo.address_1,
                address_2: popupInfo.address_2,
                images: popupInfo.images
                })}>
              see more
            </Button>
          </Popup>
        )}

      </Map>

      <Drawer anchor="right" open={open} onClose={closeDrawer}>
        <Box sx={{ width: 600, p: 2 }}>
          {selectedLocation ? (
            <>
              <Typography variant="h5">{ selectedLocation.name }</Typography>
              <Typography variant="h6">{ selectedLocation.location }</Typography>

              {selectedLocation.images.map((_, index) => (
                <img width="100%" src={ selectedLocation.images[index] } />
              ))}
              
              <Typography variant="body1">{ selectedLocation.address_1 }</Typography>
              <Typography variant="body1">{ selectedLocation.address_2 }</Typography>
            </>
          ) : (
            <Typography>No location selected.</Typography>
          )}
        </Box>
      </Drawer>

    </>
  );
}

export default App;

export function renderToDom(container: any) {
  createRoot(container).render(<App />);
}
