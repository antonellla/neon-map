import * as React from 'react';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyleIlluminated = {
  cursor: 'pointer',
  fill: '#822DE3',
  stroke: '1',
  color: '#000000'
};

const pinStyleNotIlluminated = {
  cursor: 'pointer',
  fill: '#3a0e3d',
  stroke: '1',
  color: '#000000'
};

const pinStyleNotPhotographed = {
  cursor: 'pointer',
  fill: '#d9eefc',
  stroke: '1',
  color: '#000000'
};

function Pin({size = 20, illuminated = true, thumb}) {

  let photographed;
  if (thumb === "") {
    photographed = false;
  } else {
    photographed = true;
  }

  if (!photographed) {
    return (
      <svg height={size} viewBox="0 0 24 24" style={pinStyleNotPhotographed}>
        <path d={ICON} />
      </svg>
    );
  } else if (illuminated) {
    return (
      <svg height={size} viewBox="0 0 24 24" style={pinStyleIlluminated}>
        <path d={ICON} />
      </svg>
    );
  } else {
    return (
      <svg height={size} viewBox="0 0 24 24" style={pinStyleNotIlluminated}>
        <path d={ICON} />
      </svg>
    );
  }
}

export default React.memo(Pin);
