import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'

import Map from './components/Map'
import Navbar from './components/Navbar'

interface IState {
  viewport: ViewportProps
  markers: MarkerProps[]
}

export default class App extends Component<any, IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      viewport: {
        width: '100vw',
        height: '100vh',
        zoom: 12,
        longitude: 3.04197,
        latitude: 36.7525
      },
      markers: []
    }
  }

  setViewport = (viewport: ViewportProps) => this.setState({ viewport })

  addMarker = (marker: MarkerProps) => this.setState((state) => ({ markers: [...state.markers, marker] }))
  removeMarker = (index: number) => this.setState((state) => ({ markers: [...state.markers.filter((m, idx) => index !== idx)] }))
  
  render() {
    const { viewport, markers } = this.state
    return (
      <div className="app-container">
        <Navbar setViewport={this.setViewport} />
        <Map 
          viewport={viewport} 
          markers={markers} 
          addMarker={this.addMarker} 
          removeMarker={this.removeMarker}
          setViewport={this.setViewport} 
          />
      </div>
    )
  }
}
