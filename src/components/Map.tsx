import React, { Component } from 'react';
import ReactMapGl, {
  PointerEvent,
  ViewportProps,
  MarkerProps,
} from 'react-map-gl';
import { setRTLTextPlugin } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import IAnimal from '../interfaces/IAnimal';

interface IProps {
  viewport: ViewportProps;
  animals: IAnimal[];
  addAnimalMarker: (marker: MarkerProps) => void;
  setViewport: (viewport: ViewportProps) => void;
  isSideOpen: false | IAnimal | 'add-animal';
  displayAnimal: (id: number) => void;
}

setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  (err) => {
    if (err) console.log('[!] Error@Map.setRTLTextPlugin', err);
  },
  true
);

export default class Map extends Component<IProps> {
  addMarker = (e: PointerEvent) => {
    const { addAnimalMarker } = this.props;
    addAnimalMarker({ longitude: e.lngLat[0], latitude: e.lngLat[1] });
  };

  render() {
    const {
      viewport,
      animals,
      setViewport,
      isSideOpen,
      displayAnimal,
    } = this.props;

    const {
      latitude,
      longitude,
      zoom,
      bearing,
      pitch,
      altitude,
      maxZoom,
      maxPitch,
      minPitch,
      transitionDuration,
      transitionInterpolator,
      transitionInterruption,
    } = viewport;

    return (
      <div className={`map-gl-container ${isSideOpen ? 'side-open' : ''}`}>
        <ReactMapGl
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          bearing={bearing}
          pitch={pitch}
          altitude={altitude}
          maxZoom={maxZoom}
          maxPitch={maxPitch}
          minPitch={minPitch}
          transitionDuration={transitionDuration}
          transitionInterpolator={transitionInterpolator}
          transitionInterruption={transitionInterruption}
          width="100vw"
          height="100vh"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/amine77/ckgkbj8w51q0x19jxhs9q0n53"
          onViewportChange={(vport: ViewportProps) => setViewport(vport)}
          onDblClick={(e) => this.addMarker(e)}
          minZoom={12}
          mapOptions={{
            maxBounds: [
              [2.65, 36.45],
              [3.8, 36.95],
            ],
          }}
        >
          <Markers
            isSideOpen={isSideOpen}
            animals={animals}
            displayAnimal={displayAnimal}
          />
        </ReactMapGl>
      </div>
    );
  }
}
