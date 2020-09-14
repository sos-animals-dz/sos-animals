import React, { Component } from 'react'
import ReactMapGl, { PointerEvent, ViewportProps, MarkerProps } from 'react-map-gl'
import {setRTLTextPlugin} from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import Markers from './Markers'
import IAnimal from '../interfaces/IAnimal'

interface IProps {
  viewport: ViewportProps
  animals: IAnimal[]
  addAnimalMarker: (marker: MarkerProps) => void
  removeMarker: (index: number) =>  void
  setViewport: (viewport: ViewportProps) => void
  isSideOpen: false | IAnimal | 'add-animal'
  displayAnimal: (id: number) => void
}

export default class Map extends Component<IProps> {
  
  componentDidMount () {
    try {
      setRTLTextPlugin( 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', (err) => console.log("[!] Error@Map-setRTLTextPlugin", err), true )      
    } catch (error) {
      console.log("[!] Error@Map-catch: ", error)
    }
  }

  addMarker = (e:PointerEvent) => {
    const { addAnimalMarker } = this.props
    addAnimalMarker({ "longitude": e.lngLat[0], "latitude": e.lngLat[1] })
  }

  render() {
    const { viewport, animals, setViewport, isSideOpen, displayAnimal } = this.props
    return (
      <div className={`map-gl-container ${isSideOpen ? 'side-open': ''}`}>
        <ReactMapGl 
          width="100vw"
          height="100vh"
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle={'mapbox://styles/am-77/ckca59r03371f1ileiqk2x44x'}
          onViewportChange={(viewport: ViewportProps) => setViewport(viewport) }
          onDblClick={(e) => this.addMarker(e)}
          minZoom={12}
          mapOptions={{
            maxBounds: [
              [2.65, 36.45],
              [3.8, 36.95]
            ]
          }}
          >
          <Markers isSideOpen={isSideOpen} animals={animals} displayAnimal={displayAnimal} />
        </ReactMapGl>
      </div>
    )
  }
}
