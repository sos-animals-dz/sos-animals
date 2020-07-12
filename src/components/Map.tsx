import React, { Component } from 'react'
import ReactMapGl, { PointerEvent, ViewportProps, MarkerProps } from 'react-map-gl'
import {setRTLTextPlugin} from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import Markers from './Markers'

interface IProps {
  viewport: ViewportProps
  markers: MarkerProps[]
  addMarker: (marker: MarkerProps) => void
  removeMarker: (index: number) =>  void
  setViewport: (viewport: ViewportProps) => void
}

export default class Map extends Component<IProps, any> {
  
  componentDidMount () {
    setRTLTextPlugin( 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', (err) => console.log(err), true )
  }

  addMarker = (e:PointerEvent) => {
    const { addMarker } = this.props
    addMarker({ "longitude": e.lngLat[0], "latitude": e.lngLat[1] })
  }

  render() {
    const {viewport, markers, setViewport} = this.props
    return (
      <div>
        <ReactMapGl 
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle={'mapbox://styles/am-77/ckca59r03371f1ileiqk2x44x'}
          onViewportChange={(viewport: ViewportProps) => setViewport(viewport) }
          onDblClick={(e) => this.addMarker(e)}
          // mapOptions={{
          //   maxBounds: [
          //     [2.76765511962885, 37], // [west, south]
          //     [3.5246777037396604, 36.47872329439055]  // [east, north]
          //   ],
          // }} TO ADD LATER
          >
          <Markers markers={markers} />
        </ReactMapGl>
      </div>
    )
  }
}
