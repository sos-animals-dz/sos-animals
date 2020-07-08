import React, { useState } from 'react'
import ReactMapGl, { PointerEvent, Marker } from 'react-map-gl'

import pin from './pin.svg'

function App() {

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    zoom: 12,
    longitude: 3.04197,
    latitude: 36.7525
  })

  const [markers, setMarkers] = useState([
    [3.04197, 36.7525]
  ])

  const selected = (e:PointerEvent) => {
    setMarkers([...markers, e.lngLat])
  }

  console.log(process.env.REACT_APP_MAPBOX_TOKEN)

  return (
    <div className="App">
      <ReactMapGl 
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiYW0tNzciLCJhIjoiY2tjYTNtYTlzMXJtOTJ2bG1jcmJ0M3l0MSJ9.0cR_Hn8TgDIxd_etq3E-OQ'}
        mapStyle={'mapbox://styles/am-77/ckca59r03371f1ileiqk2x44x'}
        onViewportChange={(viewport: any) => setViewport(viewport)}
        onDblClick={(e) => selected(e)}
        >
        {
          markers.map((marker: any, index:number) => (
            <Marker 
              key={index}
              longitude={marker[0]}
              latitude={marker[1]}
              >
              <div className="pin">
                <img src={pin} alt='pin' />
              </div>
            </Marker>
          ))
        }
      </ReactMapGl>
    </div>
  );
}

export default App;
