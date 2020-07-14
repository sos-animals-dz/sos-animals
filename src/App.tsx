import React, { Component } from 'react'
import { ViewportProps, MarkerProps } from 'react-map-gl'

import Map from './components/Map'
import Navbar from './components/Navbar'

interface IState {
  viewport: ViewportProps
  markers: MarkerProps[]
  isAddAnimal: boolean
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
      markers: [],
      isAddAnimal: false
    }
  }

  setViewport = (viewport: ViewportProps) => this.setState({ viewport })

  addMarker = (marker: MarkerProps) => {
    const { isAddAnimal } = this.state
    if (isAddAnimal) {
      this.setState((state) => ({ markers: [...state.markers, marker] }))
    }
  }
  removeMarker = (index: number) => this.setState((state) => ({ markers: [...state.markers.filter((m, idx) => index !== idx)] }))
  
  addAnimal = () => this.setState((state) => ({ isAddAnimal: !state.isAddAnimal }))

  render() {
    const { viewport, markers, isAddAnimal } = this.state
    return (
      <div className="app-container">
        <Navbar
          setViewport={this.setViewport} 
          addAnimal={this.addAnimal}
          isAddAnimal={isAddAnimal}
          />
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
